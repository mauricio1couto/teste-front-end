export interface NewsletterValues {
  name: string;
  email: string;
  terms: boolean;
}

export type NewsletterErrors = Partial<Record<keyof NewsletterValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateNewsletter(values: NewsletterValues): NewsletterErrors {
  const errors: NewsletterErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Informe seu nome.';
  } else if (values.name.trim().length < 2) {
    errors.name = 'O nome precisa ter pelo menos 2 letras.';
  }

  if (!values.email.trim()) {
    errors.email = 'Informe seu e-mail.';
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Informe um e-mail válido.';
  }

  if (!values.terms) {
    errors.terms = 'Você precisa aceitar os termos e condições.';
  }

  return errors;
}
