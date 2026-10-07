import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Newsletter } from './Newsletter';
import { validateNewsletter } from './validation';

describe('validateNewsletter', () => {
  it('exige nome, e-mail válido e aceite dos termos', () => {
    expect(validateNewsletter({ name: '', email: 'x', terms: false })).toEqual({
      name: 'Informe seu nome.',
      email: 'Informe um e-mail válido.',
      terms: 'Você precisa aceitar os termos e condições.',
    });
    expect(validateNewsletter({ name: 'Ana', email: 'ana@exemplo.com', terms: true })).toEqual({});
  });
});

describe('Newsletter', () => {
  it('mostra os erros, marca os campos inválidos e foca o primeiro', async () => {
    const user = userEvent.setup();
    render(<Newsletter />);

    await user.click(screen.getByRole('button', { name: 'Inscrever' }));

    const name = screen.getByRole('textbox', { name: 'Nome' });
    expect(name).toHaveAttribute('aria-invalid', 'true');
    expect(name).toHaveAccessibleDescription('Informe seu nome.');
    expect(name).toHaveFocus();
    expect(screen.getByText('Você precisa aceitar os termos e condições.')).toBeInTheDocument();
  });

  it('simula o envio e anuncia o sucesso', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Newsletter />);

    await user.type(screen.getByRole('textbox', { name: 'Nome' }), 'Ana');
    await user.type(screen.getByRole('textbox', { name: 'E-mail' }), 'ana@exemplo.com');
    await user.click(screen.getByRole('checkbox', { name: 'Aceito os termos e condições' }));
    await user.click(screen.getByRole('button', { name: 'Inscrever' }));

    expect(screen.getByRole('button', { name: 'Enviando...' })).toBeInTheDocument();
    await act(() => vi.advanceTimersByTimeAsync(1000));

    expect(screen.getByText(/Inscrição realizada com sucesso/)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Nome' })).toHaveValue('');
    vi.useRealTimers();
  });
});
