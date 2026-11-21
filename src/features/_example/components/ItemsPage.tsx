import {
  Button,
  ConfirmModal,
  DataTable,
  type DataTableColumn,
  MobileActionFab,
  PageHeader,
  StandardFilterPanel,
  StatusBadge,
} from '@/components/ui';
import { useDebounce } from '@/hooks/useDebounce';
import { usePermissions } from '@/hooks/usePermissions';
import { formatDateBR } from '@/utils/dateUtils';
import { normalizeText } from '@/utils/stringUtils';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useExampleItems } from '../hooks/useExampleItems';
import type { ExampleItem, ExampleItemInput } from '../types/item.types';
import { ItemFormModal } from './ItemFormModal';

/** Tela CRUD completa de exemplo (DataTable + busca com debounce + FormModal + ConfirmModal). */
export function ItemsPage() {
  const { items, isLoading, isMutating, createItem, updateItem, deleteItem } = useExampleItems();
  const { can } = usePermissions();
  const canWrite = can('items.write');

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 250);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ExampleItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<ExampleItem | null>(null);

  const filtered = useMemo(() => {
    const query = normalizeText(debouncedSearch);
    if (!query) return items;
    return items.filter((item) => normalizeText(item.title).includes(query));
  }, [debouncedSearch, items]);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleSubmit = async (input: ExampleItemInput) => {
    if (editingItem) return updateItem(editingItem.id, input);
    return createItem(input);
  };

  const columns: DataTableColumn<ExampleItem>[] = [
    {
      key: 'title',
      header: 'Título',
      sortable: true,
      sortValue: (row) => row.title,
      render: (row) => <span className="font-medium">{row.title}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'created_at',
      header: 'Criado em',
      sortable: true,
      sortValue: (row) => row.created_at,
      render: (row) => <span className="text-content-muted">{formatDateBR(row.created_at)}</span>,
    },
    {
      key: 'actions',
      header: 'Ações',
      className: 'text-right',
      render: (row) =>
        canWrite ? (
          <div className="inline-flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Editar ${row.title}`}
              onClick={() => {
                setEditingItem(row);
                setIsFormOpen(true);
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Remover ${row.title}`}
              onClick={() => setDeletingItem(row)}
            >
              <Trash2 className="h-4 w-4 text-danger" />
            </Button>
          </div>
        ) : (
          <span className="text-xs text-content-muted">Somente leitura</span>
        ),
    },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Itens de Exemplo"
        description="Modelo CRUD reutilizável com RBAC Default Deny e responsividade."
        actions={
          canWrite ? (
            <Button onClick={handleOpenCreate} className="hidden md:inline-flex">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Novo item
            </Button>
          ) : null
        }
      />

      <StandardFilterPanel
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Filtrar por título..."
        onClear={() => setSearch('')}
      />

      <DataTable
        data={filtered}
        columns={columns}
        getRowKey={(row) => row.id}
        isLoading={isLoading}
        emptyTitle="Nenhum item cadastrado"
        emptyDescription="Crie o primeiro registro para testar o fluxo completo."
        emptyAction={
          canWrite ? (
            <Button onClick={handleOpenCreate}>
              <Plus className="h-4 w-4" aria-hidden="true" />
              Criar item
            </Button>
          ) : undefined
        }
      />

      {canWrite && <MobileActionFab label="Novo item" onClick={handleOpenCreate} />}

      <ItemFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingItem={editingItem}
        isSubmitting={isMutating}
        onSubmit={handleSubmit}
      />

      <ConfirmModal
        isOpen={Boolean(deletingItem)}
        onClose={() => setDeletingItem(null)}
        title="Remover item?"
        description={`O registro "${deletingItem?.title ?? ''}" será arquivado via soft delete.`}
        confirmLabel="Remover"
        isLoading={isMutating}
        onConfirm={async () => {
          if (!deletingItem) return;
          const ok = await deleteItem(deletingItem.id);
          if (ok) setDeletingItem(null);
        }}
      />
    </div>
  );
}
