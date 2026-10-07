import crownIcon from '@/assets/icons/crown.svg';
import { menuItems } from '@/data/menu';
import { cx } from '@/utils/cx';
import styles from './MainNav.module.scss';

export function MainNav() {
  return (
    <nav className={styles.nav} aria-label="Categorias principais">
      <ul className={styles.list}>
        {menuItems.map((item) => (
          <li key={item.href} className={cx(styles.item, item.icon && styles.withIcon)}>
            <a href={item.href} className={cx(styles.link, item.highlight && styles.highlight)}>
              {item.icon === 'crown' && (
                <img src={crownIcon} width={20} height={20} alt="" className={styles.icon} />
              )}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
