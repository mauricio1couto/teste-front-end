import styles from './ProductCardSkeleton.module.scss';

/** Placeholder com as mesmas dimensões do ProductCard (evita CLS). */
export function ProductCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <span className={styles.image} />
      <span className={styles.line} />
      <span className={`${styles.line} ${styles.short}`} />
      <span className={`${styles.line} ${styles.price}`} />
      <span className={`${styles.line} ${styles.small}`} />
      <span className={styles.button} />
    </div>
  );
}
