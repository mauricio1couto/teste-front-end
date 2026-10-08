import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import closeIcon from '@/assets/icons/close.svg';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { cx } from '@/utils/cx';
import styles from './Modal.module.scss';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** id do título que nomeia o diálogo (aria-labelledby). */
  labelledBy: string;
  describedBy?: string;
  closeLabel?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Modal genérico: portal no body, overlay, Esc, clique fora, foco preso
 * e devolvido a quem abriu, scroll do body travado.
 */
export function Modal({
  open,
  onClose,
  labelledBy,
  describedBy,
  closeLabel = 'Fechar',
  className,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(open);
  // Foco inicial na própria caixa: o leitor de tela anuncia o diálogo e o
  // primeiro Tab leva ao X.
  useFocusTrap(dialogRef, open, dialogRef);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  function handleOverlayMouseDown(event: MouseEvent<HTMLDivElement>) {
    // Só fecha quando o clique começa no próprio overlay (não em um arraste de dentro).
    if (event.target === event.currentTarget) onClose();
  }

  return createPortal(
    // O clique no overlay é só um atalho de mouse: no teclado o modal fecha com Esc e com o X.
    <div
      role="presentation"
      className={styles.overlay}
      onMouseDown={handleOverlayMouseDown}
      data-testid="modal-overlay"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
        className={cx(styles.dialog, className)}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label={closeLabel}>
          <img src={closeIcon} width={15} height={13} alt="" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
