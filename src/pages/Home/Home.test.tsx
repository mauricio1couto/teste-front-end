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

describe('Home: pop-up de entrada', () => {
  it('abre sozinho com o produto mais caro e não reabre depois de fechado', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveAccessibleName('Destaque');
    expect(within(dialog).getByText('R$ 1.499,90')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('continua abrindo pelo COMPRAR dos cards', async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.click(await screen.findByRole('button', { name: 'Fechar detalhes do produto' }));
    // as 3 vitrines mostram os mesmos produtos; usa o card da primeira
    const buy = screen.getAllByRole('button', { name: 'Comprar Barato' })[0];
    if (!buy) throw new Error('Botão COMPRAR não encontrado');
    await user.click(buy);

    expect(screen.getByRole('dialog')).toHaveAccessibleName('Barato');
  });
});
