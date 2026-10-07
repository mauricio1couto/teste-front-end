import type { Product } from '@/types/product';

export interface ProductsJsonLdProps {
  products: Product[];
}

/** Dados estruturados (schema.org ItemList de Product) para as vitrines. */
export function ProductsJsonLd({ products }: ProductsJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Produtos relacionados',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.photo,
        sku: product.id,
        brand: { '@type': 'Brand', name: 'Econverse' },
        offers: {
          '@type': 'Offer',
          price: (product.price / 100).toFixed(2),
          priceCurrency: 'BRL',
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify escapa aspas; "<" é escapado para não fechar a tag <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
