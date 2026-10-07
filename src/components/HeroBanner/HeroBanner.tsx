import type { ImgHTMLAttributes } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './HeroBanner.module.scss';

// Imagens em /public para terem URL estável (preload no index.html).
const HERO_SRC = '/images/hero.webp';
const HERO_SRCSET = '/images/hero.webp 1440w, /images/hero@2x.webp 2880w';

// React 18 ainda não conhece `fetchPriority`; o atributo vai em minúsculas para o DOM.
const highPriority = { fetchpriority: 'high' } as ImgHTMLAttributes<HTMLImageElement>;

export function HeroBanner() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <img
        className={styles.image}
        src={HERO_SRC}
        srcSet={HERO_SRCSET}
        sizes="100vw"
        width={1440}
        height={390}
        alt=""
        decoding="async"
        {...highPriority}
      />
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <h1 id="hero-title" className={styles.title}>
          Venha conhecer nossas promoções
        </h1>
        <p className={styles.subtitle}>
          <strong className={styles.discount}>50% Off</strong> nos produtos
        </p>
        <Button href="#ofertas" variant="secondary" className={styles.cta}>
          Ver produto
        </Button>
      </div>
    </section>
  );
}
