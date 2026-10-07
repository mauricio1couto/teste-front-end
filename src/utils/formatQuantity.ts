/** Quantidade exibida sempre com 2 dígitos ("01", "02"...). */
export function formatQuantity(quantity: number): string {
  return String(quantity).padStart(2, '0');
}
