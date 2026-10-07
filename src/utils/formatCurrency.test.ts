import { formatCurrency } from './formatCurrency';
import { formatQuantity } from './formatQuantity';

describe('formatCurrency', () => {
  it('converte centavos em reais no padrão pt-BR', () => {
    expect(formatCurrency(149990)).toBe('R$ 1.499,90');
    expect(formatCurrency(2890)).toBe('R$ 28,90');
  });

  it('formata valores pequenos e zero', () => {
    expect(formatCurrency(520)).toBe('R$ 5,20');
    expect(formatCurrency(5)).toBe('R$ 0,05');
    expect(formatCurrency(0)).toBe('R$ 0,00');
  });

  it('usa ponto de milhar em valores grandes', () => {
    expect(formatCurrency(123456789)).toBe('R$ 1.234.567,89');
  });

  it('usa espaço comum (não NBSP) depois do símbolo', () => {
    expect(formatCurrency(100)).not.toContain('\u00a0');
  });
});

describe('formatQuantity', () => {
  it('exibe a quantidade com 2 dígitos', () => {
    expect(formatQuantity(1)).toBe('01');
    expect(formatQuantity(12)).toBe('12');
  });
});
