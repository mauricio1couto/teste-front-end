import tecnologia from '@/assets/images/categories/tecnologia.webp';
import supermercado from '@/assets/images/categories/supermercado.webp';
import bebidas from '@/assets/images/categories/bebidas.webp';
import ferramentas from '@/assets/images/categories/ferramentas.webp';
import saude from '@/assets/images/categories/saude.webp';
import esportes from '@/assets/images/categories/esportes.webp';
import moda from '@/assets/images/categories/moda.webp';

export interface Category {
  id: string;
  label: string;
  /** Silhueta (alpha) usada como máscara: a cor vem do CSS. */
  icon: string;
}

export const categories: Category[] = [
  { id: 'tecnologia', label: 'Tecnologia', icon: tecnologia },
  { id: 'supermercado', label: 'Supermercado', icon: supermercado },
  { id: 'bebidas', label: 'Bebidas', icon: bebidas },
  { id: 'ferramentas', label: 'Ferramentas', icon: ferramentas },
  { id: 'saude', label: 'Saúde', icon: saude },
  { id: 'esportes-fitness', label: 'Esportes e Fitness', icon: esportes },
  { id: 'moda', label: 'Moda', icon: moda },
];

export const DEFAULT_CATEGORY_ID = 'tecnologia';
