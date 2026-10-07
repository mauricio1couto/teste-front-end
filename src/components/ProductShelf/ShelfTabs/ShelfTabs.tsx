import { useRef, type KeyboardEvent } from 'react';
import type { ShelfTab } from '@/data/shelfTabs';
import { cx } from '@/utils/cx';
import styles from './ShelfTabs.module.scss';

export interface ShelfTabsProps {
  idPrefix: string;
  tabs: ShelfTab[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

/** Abas acessíveis (tablist) com navegação por setas, Home e End. */
export function ShelfTabs({ idPrefix, tabs, activeId, onChange, className }: ShelfTabsProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function focusTab(index: number) {
    const total = tabs.length;
    const nextIndex = (index + total) % total;
    const tab = tabs[nextIndex];
    if (!tab) return;
    onChange(tab.id);
    tabRefs.current[nextIndex]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keyActions: Record<string, () => void> = {
      ArrowRight: () => focusTab(index + 1),
      ArrowLeft: () => focusTab(index - 1),
      Home: () => focusTab(0),
      End: () => focusTab(tabs.length - 1),
    };
    const action = keyActions[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  }

  return (
    <div className={cx(styles.wrapper, className)}>
      <div role="tablist" aria-label="Filtrar vitrine" className={styles.tablist}>
        {tabs.map((tab, index) => {
          const selected = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${idPrefix}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${idPrefix}-panel`}
              tabIndex={selected ? 0 : -1}
              className={cx(styles.tab, selected && styles.active)}
              onClick={() => onChange(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
