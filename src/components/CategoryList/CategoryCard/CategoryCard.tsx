import type { CSSProperties } from 'react';
import type { Category } from '@/data/categories';
import { cx } from '@/utils/cx';
import styles from './CategoryCard.module.scss';

export interface CategoryCardProps {
  category: Category;
  active: boolean;
  onSelect: (id: string) => void;
}

export function CategoryCard({ category, active, onSelect }: CategoryCardProps) {
  // O ícone é uma silhueta usada como máscara; a cor vem do CSS (preto ou violeta).
  const iconStyle = { '--icon': `url("${category.icon}")` } as CSSProperties;

  return (
    <button
      type="button"
      className={cx(styles.card, active && styles.active)}
      aria-pressed={active}
      onClick={() => onSelect(category.id)}
    >
      <span className={styles.box}>
        <span className={styles.icon} style={iconStyle} aria-hidden="true" />
      </span>
      <span className={styles.label}>{category.label}</span>
    </button>
  );
}
