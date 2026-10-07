import { Logo } from '@/components/ui/Logo';
import { TopBar } from './TopBar';
import { SearchBar } from './SearchBar';
import { HeaderActions } from './HeaderActions';
import { MainNav } from './MainNav';
import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <TopBar />
      <div className={styles.main}>
        <Logo className={styles.logo} />
        <SearchBar className={styles.search} />
        <HeaderActions className={styles.actions} />
      </div>
      <MainNav />
    </header>
  );
}
