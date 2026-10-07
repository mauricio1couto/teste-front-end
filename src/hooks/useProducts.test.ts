import { act, renderHook, waitFor } from '@testing-library/react';
import * as service from '@/services/products';
import type { Product } from '@/types/product';
import { useProducts } from './useProducts';

const product: Product = {
  id: 'p-0',
  name: 'Produto',
  description: 'Produto',
  photo: 'foto.png',
  price: 1000,
  listPrice: 1100,
  installment: { count: 2, value: 500 },
  freeShipping: true,
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useProducts', () => {
  it('começa em loading e termina em success', async () => {
    const spy = vi.spyOn(service, 'fetchProducts').mockResolvedValue([product]);
    const { result } = renderHook(() => useProducts());

    expect(result.current.state.status).toBe('loading');
    await waitFor(() => expect(result.current.state.status).toBe('success'));
    expect(result.current.state).toEqual({ status: 'success', products: [product] });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('expõe o erro e permite tentar novamente', async () => {
    const spy = vi
      .spyOn(service, 'fetchProducts')
      .mockRejectedValueOnce(new Error('falhou'))
      .mockResolvedValueOnce([product]);
    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.state.status).toBe('error'));
    expect(result.current.state).toMatchObject({ error: 'falhou' });

    act(() => result.current.retry());
    expect(result.current.state.status).toBe('loading');
    await waitFor(() => expect(result.current.state.status).toBe('success'));
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('aborta a requisição no unmount', () => {
    let signal: AbortSignal | undefined;
    vi.spyOn(service, 'fetchProducts').mockImplementation((s) => {
      signal = s;
      return new Promise(() => {});
    });
    const { unmount } = renderHook(() => useProducts());
    unmount();
    expect(signal?.aborted).toBe(true);
  });
});
