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

/** Produto do pop-up de entrada: o de maior preço (no Figma, o de R$ 1.499,90). */
function pickFeaturedProduct(products: Product[]): Product | null {
  return products.reduce<Product | null>(
    (best, product) => (best === null || product.price > best.price ? product : best),
    null,
  );
}

export function Home() {
  // Uma única requisição, compartilhada pelas 3 vitrines.
  const { state, retry } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // O pop-up abre sozinho uma vez, quando os produtos carregam; depois só pelos cards.
  const [autoPopupDone, setAutoPopupDone] = useState(false);

  const featuredProduct =
    state.status === 'success' && !autoPopupDone ? pickFeaturedProduct(state.products) : null;
  const modalProduct = selectedProduct ?? featuredProduct;

  const selectProduct = useCallback((product: Product) => {
    setAutoPopupDone(true);
    setSelectedProduct(product);
  }, []);

  const closeModal = useCallback(() => {
    setAutoPopupDone(true);
    setSelectedProduct(null);
  }, []);

  const shelfProps = {
    title: SHELF_TITLE,
    state,
    onRetry: retry,
    onSelectProduct: selectProduct,
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
      <ProductModal product={modalProduct} onClose={closeModal} />
    </main>
  );
}
