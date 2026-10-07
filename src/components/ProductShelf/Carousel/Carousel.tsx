import { useId, type ReactNode } from 'react';
import chevronIcon from '@/assets/icons/chevron-left.svg';
import { useCarousel } from '@/hooks/useCarousel';
import { cx } from '@/utils/cx';
import styles from './Carousel.module.scss';

export interface CarouselProps<T> {
  /** Nome acessível do carrossel. */
  label: string;
  items: T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => ReactNode;
  /** Indica conteúdo carregando (aria-busy). */
  busy?: boolean;
}

export function Carousel<T>({ label, items, getKey, renderItem, busy = false }: CarouselProps<T>) {
  const viewportId = useId();
  const { viewportRef, canPrev, canNext, prev, next } = useCarousel<HTMLUListElement>(items.length);

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="carrossel"
      aria-label={label}
      aria-busy={busy || undefined}
    >
      <button
        type="button"
        className={cx(styles.arrow, styles.prev)}
        onClick={prev}
        disabled={!canPrev}
        aria-controls={viewportId}
        aria-label="Produtos anteriores"
      >
        <img src={chevronIcon} width={8} height={13} alt="" />
      </button>

      <ul ref={viewportRef} id={viewportId} className={styles.viewport}>
        {items.map((item, index) => (
          <li key={getKey(item, index)} className={styles.slide}>
            {renderItem(item, index)}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={cx(styles.arrow, styles.next)}
        onClick={next}
        disabled={!canNext}
        aria-controls={viewportId}
        aria-label="Próximos produtos"
      >
        <img src={chevronIcon} width={8} height={13} alt="" className={styles.flipped} />
      </button>
    </div>
  );
}
