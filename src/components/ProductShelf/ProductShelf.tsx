import { useId, useState } from 'react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { shelfTabs } from '@/data/shelfTabs';
import type { ProductsState } from '@/hooks/useProducts';
import type { Product } from '@/types/product';
import { Carousel } from './Carousel';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { ShelfTabs } from './ShelfTabs';
import styles from './ProductShelf.module.scss';

const SKELETON_COUNT = 4;
const skeletons = Array.from({ length: SKELETON_COUNT }, (_, index) => index);

export interface ProductShelfProps {
  title: string;
  /** `tabs`: abas abaixo do título · `viewAll`: link "Ver todos". */
  variant?: 'tabs' | 'viewAll';
  state: ProductsState;
  onRetry: () => void;
  onSelectProduct: (product: Product) => void;
  viewAllHref?: string;
}

export function ProductShelf({
  title,
  variant = 'viewAll',
  state,
  onRetry,
  onSelectProduct,
  viewAllHref = '#produtos',
}: ProductShelfProps) {
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const [activeTab, setActiveTab] = useState(shelfTabs[0]?.id ?? '');

  return (
    <section className={styles.shelf} aria-labelledby={titleId}>
      <SectionTitle id={titleId}>{title}</SectionTitle>

      {variant === 'tabs' ? (
        <ShelfTabs
          idPrefix={baseId}
          tabs={shelfTabs}
          activeId={activeTab}
          onChange={setActiveTab}
          className={styles.tabs}
        />
      ) : (
        <a href={viewAllHref} className={styles.viewAll}>
          Ver todos
        </a>
      )}

      <div
        className={styles.body}
        {...(variant === 'tabs'
          ? {
              role: 'tabpanel',
              id: `${baseId}-panel`,
              'aria-labelledby': `${baseId}-tab-${activeTab}`,
            }
          : {})}
      >
        {state.status === 'loading' && (
          <Carousel
            label={`${title}: carregando`}
            items={skeletons}
            getKey={(index) => `skeleton-${index}`}
            renderItem={() => <ProductCardSkeleton />}
            busy
          />
        )}

        {state.status === 'error' && (
          <div className={styles.feedback} role="alert">
            <p>Não foi possível carregar os produtos.</p>
            <Button variant="primary" uppercase onClick={onRetry} className={styles.retry}>
              Tentar novamente
            </Button>
          </div>
        )}

        {state.status === 'success' && state.products.length === 0 && (
          <p className={styles.feedback} role="status">
            Nenhum produto encontrado no momento.
          </p>
        )}

        {state.status === 'success' && state.products.length > 0 && (
          <Carousel
            label={title}
            items={state.products}
            getKey={(product) => product.id}
            renderItem={(product) => <ProductCard product={product} onSelect={onSelectProduct} />}
          />
        )}
      </div>
    </section>
  );
}
