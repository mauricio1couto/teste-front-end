import shieldIcon from '@/assets/icons/shield-check.svg';
import truckIcon from '@/assets/icons/truck.svg';
import cardIcon from '@/assets/icons/credit-card.svg';

export interface TopBarItem {
  icon: string;
  /** Texto antes do destaque. */
  before?: string;
  /** Trecho em violeta e semibold. */
  highlight: string;
  /** Texto depois do destaque. */
  after?: string;
}

export const topBarItems: TopBarItem[] = [
  { icon: shieldIcon, before: 'Compra ', highlight: '100% segura' },
  { icon: truckIcon, highlight: 'Frete grátis', after: ' acima de R$ 200' },
  { icon: cardIcon, highlight: 'Parcele', after: ' suas compras' },
];
