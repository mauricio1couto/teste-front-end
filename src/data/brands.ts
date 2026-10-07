import brandLogo from '@/assets/icons/logo-brand.svg';

export interface Brand {
  id: string;
  name: string;
  href: string;
  logo: string;
}

export const brands: Brand[] = Array.from({ length: 5 }, (_, index) => ({
  id: `econverse-${index + 1}`,
  name: 'Econverse',
  href: `#marca-${index + 1}`,
  logo: brandLogo,
}));
