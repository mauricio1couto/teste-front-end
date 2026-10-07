import boxIcon from '@/assets/icons/box.svg';
import heartIcon from '@/assets/icons/heart.svg';
import userIcon from '@/assets/icons/user-circle.svg';
import cartIcon from '@/assets/icons/cart.svg';

export interface HeaderAction {
  id: 'orders' | 'favorites' | 'account' | 'cart';
  label: string;
  href: string;
  icon: string;
  /** Tamanho do ícone no Figma (px). */
  size: number;
}

export const headerActions: HeaderAction[] = [
  { id: 'orders', label: 'Meus pedidos', href: '#pedidos', icon: boxIcon, size: 24 },
  { id: 'favorites', label: 'Favoritos', href: '#favoritos', icon: heartIcon, size: 32 },
  { id: 'account', label: 'Minha conta', href: '#conta', icon: userIcon, size: 32 },
  { id: 'cart', label: 'Carrinho', href: '#carrinho', icon: cartIcon, size: 32 },
];
