import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as service from '@/services/products';
import type { Product } from '@/types/product';
import { Home } from './Home';

function makeProduct(name: string, price: number): Product {
  return {
    id: name,
    name,
    description: name,
    photo: 'foto.png',
    price,
    listPrice: price,
    installment: { count: 2, value: price / 2 },
    freeShipping: true,
  };
}

beforeEach(() => {
  vi.spyOn(service, 'fetchProducts').mockResolvedValue([
    makeProduct('Barato', 1000),
    makeProduct('Destaque', 149990),
    makeProduct('Médio', 9000),
  ]);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Home: modal do produto', () => {
  it('não abre nenhum pop-up ao carregar a página', async () => {
    render(<Home />);

    await screen.findAllByRole('button', { name: 'Comprar Barato' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('abre pelo COMPRAR dos cards', async () => {
    const user = userEvent.setup();
    render(<Home />);

    // as 3 vitrines mostram os mesmos produtos; usa o card da primeira
    const [buy] = await screen.findAllByRole('button', { name: 'Comprar Destaque' });
    if (!buy) throw new Error('Botão COMPRAR não encontrado');
    await user.click(buy);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAccessibleName('Destaque');
    expect(within(dialog).getByText('R$ 1.499,90')).toBeInTheDocument();
  });
});
