import type { ElementType, ReactNode } from 'react';
import styles from './VisuallyHidden.module.scss';

export interface VisuallyHiddenProps {
  children: ReactNode;
  as?: ElementType;
  id?: string;
}

/** Conteúdo lido por leitores de tela, mas invisível na tela. */
export function VisuallyHidden({ children, as: Tag = 'span', id }: VisuallyHiddenProps) {
  return (
    <Tag id={id} className={styles.hidden}>
      {children}
    </Tag>
  );
}
