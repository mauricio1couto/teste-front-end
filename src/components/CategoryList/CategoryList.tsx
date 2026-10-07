import { useState } from 'react';
import { VisuallyHidden } from '@/components/ui/VisuallyHidden';
import { categories, DEFAULT_CATEGORY_ID } from '@/data/categories';
import { CategoryCard } from './CategoryCard';
import styles from './CategoryList.module.scss';

export function CategoryList() {
  const [activeId, setActiveId] = useState(DEFAULT_CATEGORY_ID);

  return (
    <section id="categorias" className={styles.section} aria-labelledby="categories-title">
      <VisuallyHidden as="h2" id="categories-title">
        Compre por categoria
      </VisuallyHidden>
      <ul className={styles.list}>
        {categories.map((category) => (
          <li key={category.id} className={styles.item}>
            <CategoryCard
              category={category}
              active={category.id === activeId}
              onSelect={setActiveId}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
