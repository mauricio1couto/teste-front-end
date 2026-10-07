import { useEffect } from 'react';

const LOCK_CLASS = 'is-scroll-locked';

/** Trava o scroll do body enquanto `locked` for true, compensando a largura da barra. */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;

    const { body, documentElement } = document;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    const previousPadding = body.style.paddingRight;

    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    body.classList.add(LOCK_CLASS);

    return () => {
      body.classList.remove(LOCK_CLASS);
      body.style.paddingRight = previousPadding;
    };
  }, [locked]);
}
