import { SectionTitle } from '@/components/ui/SectionTitle';
import { brands } from '@/data/brands';
import styles from './BrandList.module.scss';

export function BrandList() {
  return (
    <section className={styles.section} aria-labelledby="brands-title">
      <SectionTitle id="brands-title" withLines={false}>
        Navegue por marcas
      </SectionTitle>
      <ul className={styles.list}>
        {brands.map((brand, index) => (
          <li key={brand.id} className={styles.item}>
            <a
              href={brand.href}
              className={styles.link}
              aria-label={`${brand.name} (marca ${index + 1})`}
            >
              <img src={brand.logo} width={117} height={35} alt="" loading="lazy" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
