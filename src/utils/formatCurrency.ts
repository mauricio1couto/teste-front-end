const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

/**
 * Formata um valor em **centavos** como moeda brasileira.
 * @example formatCurrency(149990) // "R$ 1.499,90"
 */
export function formatCurrency(cents: number): string {
  // O Intl usa NBSP entre "R$" e o valor; troca por espaço comum para manter
  // o texto igual ao do layout.
  return brl.format(cents / 100).replace(/\u00a0/g, ' ');
}
