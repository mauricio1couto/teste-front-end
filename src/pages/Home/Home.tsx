import { useCallback, useState } from 'react';
import { HeroBanner } from '@/components/HeroBanner';
import { CategoryList } from '@/components/CategoryList';
import { ProductShelf } from '@/components/ProductShelf';
import { PartnerBanners } from '@/components/PartnerBanners';
import { BrandList } from '@/components/BrandList';
import { Newsletter } from '@/components/Newsletter';
import { ProductModal } from '@/components/ProductModal';
import { partnerRows } from '@/data/partners';
import { useProducts } from '@/hooks/useProducts';
import type { Product } from '@/types/product';
import { ProductsJsonLd } from './ProductsJsonLd';
import styles from './Home.module.scss';

const SHELF_TITLE = 'Produtos relacionados';

export function Home() {
  // Uma única requisição, compartilhada pelas 3 vitrines.
  const { state, retry } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const closeModal = useCallback(() => setSelectedProduct(null), []);

  const shelfProps = {
    title: SHELF_TITLE,
    state,
    onRetry: retry,
    onSelectProduct: setSelectedProduct,
  };
  const [firstPartners = [], secondPartners = []] = partnerRows;

  return (
    <main id="conteudo" className={styles.home}>
      <HeroBanner />
      <CategoryList />

      <div className={styles.sections}>
        <ProductShelf {...shelfProps} variant="tabs" />
        <PartnerBanners partners={firstPartners} />
        <ProductShelf {...shelfProps} variant="viewAll" />
        <PartnerBanners partners={secondPartners} title="Mais parceiros" />
        <BrandList />
        <ProductShelf {...shelfProps} variant="viewAll" />
        <Newsletter />
      </div>

      {state.status === 'success' && <ProductsJsonLd products={state.products} />}
      <ProductModal product={selectedProduct} onClose={closeModal} />
    </main>
  );
}
