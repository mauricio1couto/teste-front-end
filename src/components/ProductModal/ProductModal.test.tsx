import { useState } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Product } from '@/types/product';
import { ProductModal } from './ProductModal';

const product: Product = {
  id: 'iphone-0',
  name: 'Iphone 11 PRO MAX BRANCO 5',
  description: 'Iphone 11 PRO MAX BRANCO 5',
  photo: 'foto.png',
  price: 149990,
  listPrice: 164989,
  installment: { count: 2, value: 74995 },
  freeShipping: true,
};

function Harness() {
  const [selected, setSelected] = useState<Product | null>(null);
  return (
    <>
      <button type="button" onClick={() => setSelected(product)}>
        Abrir
      </button>
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </>
  );
}

async function openModal() {
  const user = userEvent.setup();
  render(<Harness />);
  await user.click(screen.getByRole('button', { name: 'Abrir' }));
  return { user, dialog: screen.getByRole('dialog') };
}

describe('ProductModal', () => {
  it('abre como diálogo acessível com os dados do produto', async () => {
    const { dialog } = await openModal();

    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAccessibleName(product.name);
    expect(within(dialog).getByText('R$ 1.499,90')).toBeInTheDocument();
    expect(within(dialog).getByRole('img', { name: product.name })).toBeInTheDocument();
    // renderizado via portal direto no body
    expect(screen.getByTestId('modal-overlay').parentElement).toBe(document.body);
  });

  it('move o foco para dentro, trava o scroll e devolve o foco ao fechar com Esc', async () => {
    const { user } = await openModal();

    expect(screen.getByRole('dialog')).toHaveFocus();
    expect(document.body).toHaveClass('is-scroll-locked');

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body).not.toHaveClass('is-scroll-locked');
    expect(screen.getByRole('button', { name: 'Abrir' })).toHaveFocus();
  });

  it('fecha pelo X e pelo clique no overlay', async () => {
    const { user } = await openModal();
    await user.click(screen.getByRole('button', { name: 'Fechar detalhes do produto' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Abrir' }));
    await user.click(screen.getByTestId('modal-overlay'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('não fecha ao clicar dentro da caixa', async () => {
    const { user, dialog } = await openModal();
    await user.click(within(dialog).getByText('R$ 1.499,90'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('prende o foco com Tab', async () => {
    const { user } = await openModal();
    const close = screen.getByRole('button', { name: 'Fechar detalhes do produto' });

    await user.tab(); // da caixa do diálogo para o X
    expect(close).toHaveFocus();
    await user.tab(); // link de detalhes
    await user.tab(); // + (o − está desabilitado)
    await user.tab(); // COMPRAR
    await user.tab(); // volta ao X
    expect(close).toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByRole('button', { name: 'Comprar' })).toHaveFocus();
  });

  it('controla a quantidade (mínimo 1, 2 dígitos) e reinicia a cada abertura', async () => {
    const { user } = await openModal();
    const minus = screen.getByRole('button', { name: 'Diminuir quantidade' });
    const plus = screen.getByRole('button', { name: 'Aumentar quantidade' });

    expect(screen.getByText('01')).toBeInTheDocument();
    expect(minus).toBeDisabled();

    await user.click(plus);
    await user.click(plus);
    expect(screen.getByText('03')).toBeInTheDocument();
    expect(minus).toBeEnabled();

    await user.click(minus);
    expect(screen.getByText('02')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    await user.click(screen.getByRole('button', { name: 'Abrir' }));
    expect(screen.getByText('01')).toBeInTheDocument();
  });

  it('o COMPRAR do modal fecha o diálogo', async () => {
    const { user } = await openModal();
    await user.click(screen.getByRole('button', { name: 'Comprar' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
