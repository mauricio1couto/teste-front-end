export interface MenuItem {
  label: string;
  href: string;
  /** Destaque em violeta (OFERTAS DO DIA). */
  highlight?: boolean;
  /** Ícone de coroa à esquerda (ASSINATURA). */
  icon?: 'crown';
}

export const menuItems: MenuItem[] = [
  { label: 'Todas categorias', href: '#categorias' },
  { label: 'Supermercado', href: '#supermercado' },
  { label: 'Livros', href: '#livros' },
  { label: 'Moda', href: '#moda' },
  { label: 'Lançamentos', href: '#lancamentos' },
  { label: 'Ofertas do dia', href: '#ofertas', highlight: true },
  { label: 'Assinatura', href: '#assinatura', icon: 'crown' },
];
