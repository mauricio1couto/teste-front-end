import { topBarItems } from '@/data/topBar';
import styles from './TopBar.module.scss';

export function TopBar() {
  return (
    <div className={styles.topBar}>
      <ul className={styles.list} aria-label="Vantagens da loja">
        {topBarItems.map((item) => (
          <li key={item.highlight} className={styles.item}>
            <img src={item.icon} width={20} height={20} alt="" className={styles.icon} />
            <p className={styles.text}>
              {item.before}
              <strong className={styles.highlight}>{item.highlight}</strong>
              {item.after}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
