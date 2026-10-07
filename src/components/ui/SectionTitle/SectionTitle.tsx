import type { ReactNode } from 'react';
import { cx } from '@/utils/cx';
import styles from './SectionTitle.module.scss';

export interface SectionTitleProps {
  id?: string;
  children: ReactNode;
  /** Linhas finas cinza dos dois lados do título. */
  withLines?: boolean;
  as?: 'h2' | 'h3';
  className?: string;
}

export function SectionTitle({
  id,
  children,
  withLines = true,
  as: Heading = 'h2',
  className,
}: SectionTitleProps) {
  return (
    <div className={cx(styles.wrapper, withLines && styles.withLines, className)}>
      <Heading id={id} className={styles.title}>
        {children}
      </Heading>
    </div>
  );
}
