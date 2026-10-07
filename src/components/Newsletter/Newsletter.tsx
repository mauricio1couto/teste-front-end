import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { VisuallyHidden } from '@/components/ui/VisuallyHidden';
import { cx } from '@/utils/cx';
import { validateNewsletter, type NewsletterErrors, type NewsletterValues } from './validation';
import styles from './Newsletter.module.scss';

const INITIAL_VALUES: NewsletterValues = { name: '', email: '', terms: false };
const FIELD_ORDER: (keyof NewsletterValues)[] = ['name', 'email', 'terms'];
/** Não há backend: o envio é simulado. */
const SIMULATED_DELAY_MS = 800;

type Status = 'idle' | 'submitting' | 'success';

export function Newsletter() {
  const id = useId();
  const ids = {
    title: `${id}-title`,
    name: `${id}-name`,
    email: `${id}-email`,
    terms: `${id}-terms`,
    error: (field: keyof NewsletterValues) => `${id}-${field}-error`,
  };

  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState<NewsletterErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const timeoutRef = useRef<number>(undefined);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, type, value, checked } = event.target;
    const field = name as keyof NewsletterValues;
    setValues((current) => ({ ...current, [field]: type === 'checkbox' ? checked : value }));
    // Limpa o erro do campo assim que a pessoa corrige.
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    if (status === 'success') setStatus('idle');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;

    const nextErrors = validateNewsletter(values);
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLInputElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus('submitting');
    timeoutRef.current = window.setTimeout(() => {
      setStatus('success');
      setValues(INITIAL_VALUES);
    }, SIMULATED_DELAY_MS);
  }

  const fieldA11y = (field: keyof NewsletterValues) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? ids.error(field) : undefined,
  });

  const errorList = FIELD_ORDER.filter((field) => errors[field]);

  return (
    <section className={styles.newsletter} aria-labelledby={ids.title}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 id={ids.title} className={styles.title}>
            Inscreva-se na nossa newsletter
          </h2>
          <p className={styles.text}>
            Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.
          </p>
        </div>

        <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.row}>
            <label htmlFor={ids.name} className={styles.field}>
              <VisuallyHidden>Nome</VisuallyHidden>
              <input
                id={ids.name}
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Digite seu nome"
                className={cx(styles.input, errors.name && styles.invalid)}
                value={values.name}
                onChange={handleChange}
                required
                {...fieldA11y('name')}
              />
            </label>
            <label htmlFor={ids.email} className={styles.field}>
              <VisuallyHidden>E-mail</VisuallyHidden>
              <input
                id={ids.email}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="Digite seu e-mail"
                className={cx(styles.input, errors.email && styles.invalid)}
                value={values.email}
                onChange={handleChange}
                required
                {...fieldA11y('email')}
              />
            </label>
            <Button
              type="submit"
              variant="secondary"
              uppercase
              className={styles.submit}
              aria-disabled={status === 'submitting' || undefined}
            >
              {status === 'submitting' ? 'Enviando...' : 'Inscrever'}
            </Button>
          </div>

          <div className={styles.terms}>
            <input
              id={ids.terms}
              name="terms"
              type="checkbox"
              className={cx(styles.checkbox, errors.terms && styles.invalid)}
              checked={values.terms}
              onChange={handleChange}
              required
              {...fieldA11y('terms')}
            />
            <label htmlFor={ids.terms} className={styles.termsLabel}>
              Aceito os termos e condições
            </label>
          </div>

          <div className={styles.feedback} aria-live="polite">
            {errorList.length > 0 && (
              <ul className={styles.errors}>
                {errorList.map((field) => (
                  <li key={field} id={ids.error(field)}>
                    {errors[field]}
                  </li>
                ))}
              </ul>
            )}
            {status === 'success' && (
              <p className={styles.success}>Inscrição realizada com sucesso! Obrigado.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
