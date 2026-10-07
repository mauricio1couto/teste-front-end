import { Button } from '@/components/ui/Button';
import { VisuallyHidden } from '@/components/ui/VisuallyHidden';
import type { Product } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';
import styles from './ProductCard.module.scss';

export interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const { name, photo, price, listPrice, installment, freeShipping } = product;
  const select = () => onSelect(product);

  return (
    <article className={styles.card}>
      {/* Imagem + nome: o botão do nome cobre a área da foto (sem aninhar interativos) */}
      <div className={styles.media}>
        <img
          src={photo}
          alt={name}
          width={247}
          height={228}
          loading="lazy"
          decoding="async"
          className={styles.image}
        />
        <h3 className={styles.name}>
          <button type="button" className={styles.nameButton} onClick={select}>
            {name}
          </button>
        </h3>
      </div>

      <p className={styles.prices}>
        <VisuallyHidden>De </VisuallyHidden>
        <s className={styles.listPrice}>{formatCurrency(listPrice)}</s>
        <VisuallyHidden> por </VisuallyHidden>
        <strong className={styles.price}>{formatCurrency(price)}</strong>
      </p>
      <p className={styles.installment}>
        ou {installment.count}x de {formatCurrency(installment.value)} sem juros
      </p>
      {freeShipping && <p className={styles.shipping}>Frete grátis</p>}

      <Button
        variant="primary"
        uppercase
        fullWidth
        className={styles.buy}
        onClick={select}
        aria-label={`Comprar ${name}`}
      >
        Comprar
      </Button>
    </article>
  );
}
