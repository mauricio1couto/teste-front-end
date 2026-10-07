export interface ShelfTab {
  id: string;
  label: string;
}

/**
 * O JSON não tem categoria: trocar de aba só altera o estado ativo.
 */
export const shelfTabs: ShelfTab[] = [
  { id: 'celular', label: 'Celular' },
  { id: 'acessorios', label: 'Acessórios' },
  { id: 'tablets', label: 'Tablets' },
  { id: 'notebooks', label: 'Notebooks' },
  { id: 'tvs', label: 'TVs' },
  { id: 'ver-todos', label: 'Ver todos' },
];
