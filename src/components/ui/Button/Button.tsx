import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '@/utils/cx';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary';

interface BaseProps {
  /** primary: azul com texto branco · secondary: amarelo com texto escuro. */
  variant?: ButtonVariant;
  uppercase?: boolean;
  /** Letter-spacing de 0.08em (CONFIRA). */
  tracking?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

type AsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined };

type AsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

export type ButtonProps = AsButton | AsLink;

export function Button(props: ButtonProps) {
  const {
    variant = 'secondary',
    uppercase = false,
    tracking = false,
    fullWidth = false,
    className,
    children,
    ...rest
  } = props;

  const classes = cx(
    styles.button,
    styles[variant],
    uppercase && styles.uppercase,
    tracking && styles.tracking,
    fullWidth && styles.fullWidth,
    className,
  );

  if (rest.href !== undefined) {
    const anchorProps = rest as Omit<AsLink, keyof BaseProps>;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { type = 'button', ...buttonProps } = rest as Omit<AsButton, keyof BaseProps>;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
