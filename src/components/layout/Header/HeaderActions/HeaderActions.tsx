import { headerActions } from '@/data/headerActions';
import { cx } from '@/utils/cx';
import styles from './HeaderActions.module.scss';

export interface HeaderActionsProps {
  className?: string;
}

export function HeaderActions({ className }: HeaderActionsProps) {
  return (
    <ul className={cx(styles.actions, className)}>
      {headerActions.map((action) => (
        <li key={action.id}>
          <a href={action.href} className={styles.link} aria-label={action.label}>
            <img
              src={action.icon}
              width={action.size}
              height={action.size}
              alt=""
              className={cx(styles.icon, action.id === 'orders' && styles.mirrored)}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
