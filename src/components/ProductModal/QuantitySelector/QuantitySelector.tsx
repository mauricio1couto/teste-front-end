import minusIcon from '@/assets/icons/minus.svg';
import minusActiveIcon from '@/assets/icons/minus-active.svg';
import plusIcon from '@/assets/icons/plus.svg';
import { formatQuantity } from '@/utils/formatQuantity';
import styles from './QuantitySelector.module.scss';

export interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({ value, onChange, min = 1, max = 99 }: QuantitySelectorProps) {
  const canDecrease = value > min;
  const canIncrease = value < max;

  return (
    <div className={styles.selector} role="group" aria-label="Quantidade">
      <button
        type="button"
        className={styles.button}
        onClick={() => onChange(value - 1)}
        disabled={!canDecrease}
        aria-label="Diminuir quantidade"
      >
        <img src={canDecrease ? minusActiveIcon : minusIcon} width={20} height={20} alt="" />
      </button>
      <output className={styles.value} aria-live="polite" aria-label={`Quantidade: ${value}`}>
        {formatQuantity(value)}
      </output>
      <button
        type="button"
        className={styles.button}
        onClick={() => onChange(value + 1)}
        disabled={!canIncrease}
        aria-label="Aumentar quantidade"
      >
        <img src={plusIcon} width={20} height={20} alt="" />
      </button>
    </div>
  );
}
