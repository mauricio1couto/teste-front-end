import type { NavLinkItem } from '@/types/ui';
import instagramIcon from '@/assets/icons/instagram.svg';
import facebookIcon from '@/assets/icons/facebook.svg';
import linkedinIcon from '@/assets/icons/linkedin.svg';

export interface FooterColumn {
  title: string;
  links: NavLinkItem[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'Institucional',
    links: [
      { label: 'Sobre Nós', href: '#sobre' },
      { label: 'Movimento', href: '#movimento' },
      { label: 'Trabalhe conosco', href: '#trabalhe-conosco' },
    ],
  },
  {
    title: 'Ajuda',
    links: [
      { label: 'Suporte', href: '#suporte' },
      { label: 'Fale Conosco', href: '#fale-conosco' },
      { label: 'Perguntas Frequentes', href: '#faq' },
    ],
  },
  {
    title: 'Termos',
    links: [
      { label: 'Termos e Condições', href: '#termos' },
      { label: 'Política de Privacidade', href: '#privacidade' },
      { label: 'Troca e Devolução', href: '#troca-devolucao' },
    ],
  },
];

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export const socialLinks: SocialLink[] = [
  {
    label: 'Instagram da Econverse',
    href: 'https://www.instagram.com/econverse.ag',
    icon: instagramIcon,
  },
  {
    label: 'Facebook da Econverse',
    href: 'https://www.facebook.com/share/1C5w5zNiGB/',
    icon: facebookIcon,
  },
  {
    label: 'LinkedIn da Econverse',
    href: 'https://www.linkedin.com/company/econverse/',
    icon: linkedinIcon,
  },
];
