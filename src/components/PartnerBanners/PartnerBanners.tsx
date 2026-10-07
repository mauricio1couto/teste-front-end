import { useId } from 'react';
import { VisuallyHidden } from '@/components/ui/VisuallyHidden';
import type { Partner } from '@/data/partners';
import { PartnerCard } from './PartnerCard';
import styles from './PartnerBanners.module.scss';

export interface PartnerBannersProps {
  partners: Partner[];
  title?: string;
}

export function PartnerBanners({ partners, title = 'Nossos parceiros' }: PartnerBannersProps) {
  const titleId = useId();

  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <VisuallyHidden as="h2" id={titleId}>
        {title}
      </VisuallyHidden>
      <ul className={styles.list}>
        {partners.map((partner) => (
          <li key={partner.id}>
            <PartnerCard partner={partner} />
          </li>
        ))}
      </ul>
    </section>
  );
}
