import { Logo } from '@/components/ui/Logo';
import { footerColumns, socialLinks } from '@/data/footerLinks';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.brand}>
            <Logo variant="footer" />
            <p className={styles.about}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <ul className={styles.social} aria-label="Redes sociais">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className={styles.socialLink}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={social.icon} width={24} height={24} alt="" loading="lazy" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <div className={styles.columns}>
            {footerColumns.map((column) => (
              <nav key={column.title} aria-label={column.title} className={styles.column}>
                <h2 className={styles.columnTitle}>{column.title}</h2>
                <ul className={styles.links}>
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className={styles.link}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </footer>
  );
}
