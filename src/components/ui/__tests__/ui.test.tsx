import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../Button';
import { DataTable, type DataTableColumn } from '../DataTable';
import { Modal } from '../Modal';

describe('Button', () => {
  it('renderiza rótulo e dispara onClick', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Salvar</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('fica desabilitado durante isLoading', () => {
    render(<Button isLoading>Enviando</Button>);
    const btn = screen.getByRole('button', { name: 'Enviando' });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');
  });
});

describe('Modal', () => {
  it('fecha ao pressionar Escape', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} ariaLabel="Teste">
        <p>Conteúdo</p>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('DataTable', () => {
  interface Row {
    id: string;
    name: string;
  }

  const columns: DataTableColumn<Row>[] = [
    {
      key: 'name',
      header: 'Nome',
      render: (r) => r.name,
      sortable: true,
      sortValue: (r) => r.name,
    },
  ];

  it('exibe EmptyState quando lista vazia', () => {
    render(
      <DataTable data={[]} columns={columns} getRowKey={(r) => r.id} emptyTitle="Sem itens" />
    );
    expect(screen.getByText('Sem itens')).toBeInTheDocument();
  });

  it('renderiza linhas quando há dados', () => {
    render(
      <DataTable
        data={[{ id: '1', name: 'Item Alpha' }]}
        columns={columns}
        getRowKey={(r) => r.id}
      />
    );
    expect(screen.getAllByText('Item Alpha').length).toBeGreaterThan(0);
  });
});
