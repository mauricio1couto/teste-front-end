import { Button } from '@/components/ui/Button';
import type { Partner } from '@/data/partners';
import styles from './PartnerCard.module.scss';

export interface PartnerCardProps {
  partner: Partner;
}

export function PartnerCard({ partner }: PartnerCardProps) {
  const { title, description, ctaLabel, href, image } = partner;

  return (
    <article className={styles.card}>
      <img
        className={styles.image}
        src={image.src}
        srcSet={`${image.src} 634w, ${image.src2x} 1268w`}
        sizes="(max-width: 767px) 100vw, 634px"
        width={634}
        height={350}
        alt={image.alt}
        loading="lazy"
        decoding="async"
      />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <Button
          href={href}
          variant="secondary"
          uppercase
          tracking
          className={styles.cta}
          aria-label={`${ctaLabel}: ${title}`}
        >
          {ctaLabel}
        </Button>
      </div>
    </article>
  );
}
