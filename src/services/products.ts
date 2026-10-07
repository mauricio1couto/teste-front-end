import type { ApiProduct, Product, ProductsResponse } from '@/types/product';
import { slugify } from '@/utils/slugify';

/**
 * URL do JSON. Aponta para `/api/products`, reescrito para a Econverse pelo
 * proxy do Vite (dev/preview) e pelo rewrite do host (vercel.json / _redirects),
 * porque o servidor original não envia header CORS.
 */
export const PRODUCTS_URL: string = import.meta.env.VITE_PRODUCTS_URL || '/api/products';

/**
 * MOCK VISUAL: o JSON não traz preço "de". O layout exibe um preço riscado,
 * então ele é derivado como 10% acima do preço atual. Ver README > Decisões.
 */
export const LIST_PRICE_MARKUP = 1.1;

/** Parcelamento exibido no card: 2x sem juros (regra do layout). */
export const INSTALLMENT_COUNT = 2;

export class ProductsError extends Error {
  override name = 'ProductsError';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isApiProduct(value: unknown): value is ApiProduct {
  return (
    isRecord(value) &&
    typeof value.productName === 'string' &&
    typeof value.descriptionShort === 'string' &&
    typeof value.photo === 'string' &&
    typeof value.price === 'number' &&
    Number.isFinite(value.price)
  );
}

function isProductsResponse(value: unknown): value is ProductsResponse {
  return isRecord(value) && typeof value.success === 'boolean' && Array.isArray(value.products);
}

/** Adapter: converte o formato da API para o modelo de domínio. */
export function toProduct(raw: ApiProduct, index: number): Product {
  return {
    // O JSON não tem id: slug do nome + índice garante estabilidade e unicidade.
    id: `${slugify(raw.productName)}-${index}`,
    name: raw.productName,
    description: raw.descriptionShort,
    photo: raw.photo,
    price: raw.price,
    listPrice: Math.round(raw.price * LIST_PRICE_MARKUP),
    installment: {
      count: INSTALLMENT_COUNT,
      value: Math.ceil(raw.price / INSTALLMENT_COUNT),
    },
    // Mock visual: o layout mostra "Frete grátis" em todos os cards.
    freeShipping: true,
  };
}

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL, {
    signal,
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new ProductsError(`Falha ao carregar produtos (HTTP ${response.status}).`);
  }

  const data: unknown = await response.json();

  if (!isProductsResponse(data) || !data.success) {
    throw new ProductsError('A API retornou uma resposta inválida.');
  }

  return data.products.filter(isApiProduct).map(toProduct);
}
