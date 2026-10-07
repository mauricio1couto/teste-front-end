import partnerImage from '@/assets/images/partner.webp';
import partnerImage2x from '@/assets/images/partner@2x.webp';

export interface Partner {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  image: {
    src: string;
    src2x: string;
    alt: string;
  };
}

const appleStore = {
  src: partnerImage,
  src2x: partnerImage2x,
  alt: 'Loja parceira com computadores Apple expostos em mesas',
};

function createPartner(id: string): Partner {
  return {
    id,
    title: 'Parceiros',
    description: 'Lorem ipsum dolor sit amet, consectetur',
    ctaLabel: 'Confira',
    href: `#${id}`,
    image: appleStore,
  };
}

/** O Figma tem duas faixas de parceiros com 2 banners cada. */
export const partnerRows: Partner[][] = [
  [createPartner('parceiro-1'), createPartner('parceiro-2')],
  [createPartner('parceiro-3'), createPartner('parceiro-4')],
];
