/** Formato cru devolvido pelo endpoint da Econverse. */
export interface ApiProduct {
  productName: string;
  descriptionShort: string;
  /** URL absoluta da imagem. */
  photo: string;
  /** Preço em centavos (149990 => R$ 1.499,90). */
  price: number;
}

export interface ProductsResponse {
  success: boolean;
  products: ApiProduct[];
}

/** Modelo de domínio usado pela UI. Todos os valores monetários em centavos. */
export interface Product {
  id: string;
  name: string;
  description: string;
  photo: string;
  price: number;
  /** Preço "de" (riscado). Mock visual: não existe no JSON. */
  listPrice: number;
  installment: {
    count: number;
    value: number;
  };
  freeShipping: boolean;
}
