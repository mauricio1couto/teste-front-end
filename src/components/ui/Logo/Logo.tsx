import logoHeader from '@/assets/icons/logo.svg';
import logoFooter from '@/assets/icons/logo-footer.svg';
import { cx } from '@/utils/cx';
import styles from './Logo.module.scss';

const VARIANTS = {
  header: { src: logoHeader, width: 139, height: 41 },
  footer: { src: logoFooter, width: 164, height: 48 },
} as const;

export interface LogoProps {
  variant?: keyof typeof VARIANTS;
  className?: string;
}

export function Logo({ variant = 'header', className }: LogoProps) {
  const { src, width, height } = VARIANTS[variant];

  return (
    <a href="/" className={cx(styles.logo, className)} aria-label="Econverse, página inicial">
      <img src={src} width={width} height={height} alt="" />
    </a>
  );
}
