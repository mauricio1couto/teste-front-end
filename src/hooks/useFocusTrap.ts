import { useEffect, type RefObject } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
}

/**
 * Prende o foco do teclado dentro de `containerRef` enquanto `active` for true.
 * Ao ativar, foca `initialFocusRef` (ou o primeiro focável); ao desativar,
 * devolve o foco ao elemento que estava focado antes (quem abriu o modal).
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  initialFocusRef?: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    const container = containerRef.current;
    if (!active || !container) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const initial = initialFocusRef?.current ?? getFocusable(container)[0] ?? container;
    initial.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Tab' || !container) return;

      const focusable = getFocusable(container);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) {
        event.preventDefault();
        container.focus();
        return;
      }

      const current = document.activeElement;
      const outside = !container.contains(current);

      if (event.shiftKey && (current === first || outside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || outside)) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [active, containerRef, initialFocusRef]);
}
