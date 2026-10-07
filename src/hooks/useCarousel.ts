import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

export interface UseCarouselResult<T extends HTMLElement> {
  viewportRef: RefObject<T>;
  canPrev: boolean;
  canNext: boolean;
  prev: () => void;
  next: () => void;
}

/** Tolerância para arredondamentos de subpixel do scrollLeft. */
const EDGE_THRESHOLD = 2;

function prefersReducedMotion(): boolean {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

/**
 * Carrossel feito na mão sobre scroll nativo + scroll-snap (funciona com
 * swipe no touch). As setas rolam uma "página" de cards inteiros; o estado
 * das setas é recalculado no scroll e quando o viewport muda de tamanho.
 */
export function useCarousel<T extends HTMLElement = HTMLDivElement>(
  itemCount: number,
): UseCarouselResult<T> {
  const viewportRef = useRef<T>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > EDGE_THRESHOLD);
    setCanNext(el.scrollLeft < maxScroll - EDGE_THRESHOLD);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    update();
    el.addEventListener('scroll', update, { passive: true });

    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update);
    observer?.observe(el);

    return () => {
      el.removeEventListener('scroll', update);
      observer?.disconnect();
    };
  }, [update, itemCount]);

  const scrollByPage = useCallback((direction: 1 | -1) => {
    const el = viewportRef.current;
    if (!el) return;

    const firstItem = el.firstElementChild;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = firstItem instanceof HTMLElement ? firstItem.offsetWidth + gap : el.clientWidth;
    const perPage = Math.max(1, Math.floor((el.clientWidth + gap) / step));

    el.scrollBy({
      left: direction * perPage * step,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  }, []);

  const prev = useCallback(() => scrollByPage(-1), [scrollByPage]);
  const next = useCallback(() => scrollByPage(1), [scrollByPage]);

  return { viewportRef, canPrev, canNext, prev, next };
}
