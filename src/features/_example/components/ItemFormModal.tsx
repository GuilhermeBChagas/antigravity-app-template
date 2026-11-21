import { FormField, FormModal, Input, Select, Textarea } from '@/components/ui';
import { type FormEvent, useEffect, useState } from 'react';
import { type ExampleItem, type ExampleItemInput, exampleItemSchema } from '../types/item.types';

export interface ItemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingItem?: ExampleItem | null;
  isSubmitting?: boolean;
  onSubmit: (input: ExampleItemInput) => Promise<boolean>;
}

/** Formulário modal de criação/edição de item usando Zod e FormModal (tela cheia no mobile). */
export function ItemFormModal({
  isOpen,
  onClose,
  editingItem,
  isSubmitting = false,
  onSubmit,
}: ItemFormModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive' | 'pending'>('active');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isOpen) return;
    setTitle(editingItem?.title ?? '');
    setDescription(editingItem?.description ?? '');
    setStatus(
      editingItem?.status === 'inactive' || editingItem?.status === 'pending'
        ? editingItem.status
        : 'active'
    );
    setErrors({});
  }, [editingItem, isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = exampleItemSchema.safeParse({ title, description, status });
    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? 'form');
        nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    const ok = await onSubmit(parsed.data);
    if (ok) onClose();
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={editingItem ? 'Editar item' : 'Novo item'}
      subtitle="Modelo de formulário validado com Zod."
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      <FormField label="Título" htmlFor="item-title" isRequired error={errors.title}>
        <Input
          id="item-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Registro padrão"
          hasError={Boolean(errors.title)}
        />
      </FormField>

      <FormField label="Status" htmlFor="item-status" error={errors.status}>
        <Select
          id="item-status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'active' | 'inactive' | 'pending')}
        >
          <option value="active">Ativo</option>
          <option value="pending">Pendente</option>
          <option value="inactive">Inativo</option>
        </Select>
      </FormField>

      <FormField label="Descrição" htmlFor="item-description" error={errors.description}>
        <Textarea
          id="item-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detalhes opcionais..."
          hasError={Boolean(errors.description)}
        />
      </FormField>
    </FormModal>
  );
}
