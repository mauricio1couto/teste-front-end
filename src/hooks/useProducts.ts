import { useCallback, useEffect, useState } from 'react';
import { fetchProducts } from '@/services/products';
import type { Product } from '@/types/product';

export type ProductsState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'success'; products: Product[] };

export interface UseProductsResult {
  state: ProductsState;
  retry: () => void;
}

/**
 * Busca os produtos **uma única vez** (na Home) para repassar às vitrines.
 * Cancela a requisição no unmount com AbortController.
 */
export function useProducts(): UseProductsResult {
  const [state, setState] = useState<ProductsState>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetchProducts(controller.signal)
      .then((products) => setState({ status: 'success', products }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        const message = error instanceof Error ? error.message : 'Erro desconhecido.';
        setState({ status: 'error', error: message });
      });

    return () => controller.abort();
  }, [attempt]);

  const retry = useCallback(() => {
    setState({ status: 'loading' });
    setAttempt((n) => n + 1);
  }, []);

  return { state, retry };
}
