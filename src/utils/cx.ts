type ClassValue = string | false | null | undefined;

/** Junta classes ignorando valores falsy. */
export function cx(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
