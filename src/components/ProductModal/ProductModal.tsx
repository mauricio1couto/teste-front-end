import { useId, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import type { Product } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';
import { QuantitySelector } from './QuantitySelector';
import styles from './ProductModal.module.scss';

export interface ProductModalProps {
  /** Produto aberto; `null` mantém o modal fechado. */
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;

  return (
    <Modal
      open={product !== null}
      onClose={onClose}
      labelledBy={titleId}
      describedBy={descriptionId}
      closeLabel="Fechar detalhes do produto"
      className={styles.dialog}
    >
      {product && (
        <ProductModalContent
          // key: a quantidade volta para 1 a cada produto aberto
          key={product.id}
          product={product}
          titleId={titleId}
          descriptionId={descriptionId}
          onBuy={onClose}
        />
      )}
    </Modal>
  );
}

interface ProductModalContentProps {
  product: Product;
  titleId: string;
  descriptionId: string;
  onBuy: () => void;
}

function ProductModalContent({ product, titleId, descriptionId, onBuy }: ProductModalContentProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={styles.content}>
      <img
        src={product.photo}
        alt={product.name}
        width={247}
        height={228}
        className={styles.image}
      />

      <div className={styles.info}>
        <h2 id={titleId} className={styles.name}>
          {product.name}
        </h2>
        <p className={styles.price}>{formatCurrency(product.price)}</p>

        <p id={descriptionId} className={styles.description}>
          {product.description}
        </p>
        <a href={`#produto-${product.id}`} className={styles.details}>
          Veja mais detalhes do produto &gt;
        </a>

        <div className={styles.actions}>
          <QuantitySelector value={quantity} onChange={setQuantity} />
          <Button variant="secondary" uppercase className={styles.buy} onClick={onBuy}>
            Comprar
          </Button>
        </div>
      </div>
    </div>
  );
}
