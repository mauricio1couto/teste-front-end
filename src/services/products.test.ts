import { fetchProducts, LIST_PRICE_MARKUP, ProductsError, toProduct } from './products';

const rawProduct = {
  productName: 'IPHONE 13 MINI 1',
  descriptionShort: 'IPHONE 13 MINI 1',
  photo: 'https://example.com/foto.png',
  price: 149990,
};

function mockFetch(body: unknown, init: { ok?: boolean; status?: number } = {}) {
  const response = {
    ok: init.ok ?? true,
    status: init.status ?? 200,
    json: () => Promise.resolve(body),
  } as Response;
  return vi.spyOn(globalThis, 'fetch').mockResolvedValue(response);
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('toProduct (adapter)', () => {
  it('gera id estável a partir do nome + índice', () => {
    expect(toProduct(rawProduct, 3).id).toBe('iphone-13-mini-1-3');
  });

  it('mantém o preço em centavos e deriva parcelas e preço "de"', () => {
    const product = toProduct(rawProduct, 0);
    expect(product.price).toBe(149990);
    expect(product.installment).toEqual({ count: 2, value: 74995 });
    expect(product.listPrice).toBe(Math.round(149990 * LIST_PRICE_MARKUP));
    expect(product.listPrice).toBeGreaterThan(product.price);
  });

  it('arredonda a parcela para cima em preços ímpares', () => {
    expect(toProduct({ ...rawProduct, price: 101 }, 0).installment.value).toBe(51);
  });
});

describe('fetchProducts', () => {
  it('retorna os produtos adaptados quando success = true', async () => {
    mockFetch({ success: true, products: [rawProduct, { ...rawProduct, productName: 'Outro' }] });
    const products = await fetchProducts();
    expect(products).toHaveLength(2);
    expect(products[1]?.name).toBe('Outro');
  });

  it('descarta itens fora do formato esperado', async () => {
    mockFetch({ success: true, products: [rawProduct, { productName: 'sem preço' }] });
    expect(await fetchProducts()).toHaveLength(1);
  });

  it('rejeita quando success = false', async () => {
    mockFetch({ success: false, products: [] });
    await expect(fetchProducts()).rejects.toBeInstanceOf(ProductsError);
  });

  it('rejeita em erro HTTP', async () => {
    mockFetch({}, { ok: false, status: 500 });
    await expect(fetchProducts()).rejects.toThrow('HTTP 500');
  });
});
