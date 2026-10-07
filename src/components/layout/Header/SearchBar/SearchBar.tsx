import { useId, type FormEvent } from 'react';
import searchIcon from '@/assets/icons/search.svg';
import { VisuallyHidden } from '@/components/ui/VisuallyHidden';
import { cx } from '@/utils/cx';
import styles from './SearchBar.module.scss';

export interface SearchBarProps {
  className?: string;
  onSearch?: (term: string) => void;
}

export function SearchBar({ className, onSearch }: SearchBarProps) {
  const inputId = useId();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = new FormData(event.currentTarget).get('q');
    if (typeof term === 'string' && term.trim()) onSearch?.(term.trim());
  }

  return (
    <form role="search" className={cx(styles.search, className)} onSubmit={handleSubmit}>
      <label htmlFor={inputId}>
        <VisuallyHidden>Buscar produtos</VisuallyHidden>
      </label>
      <input
        id={inputId}
        name="q"
        type="search"
        className={styles.input}
        placeholder="O que você está buscando?"
        autoComplete="off"
        enterKeyHint="search"
      />
      <button type="submit" className={styles.submit} aria-label="Buscar">
        <img src={searchIcon} width={28} height={28} alt="" />
      </button>
    </form>
  );
}
