export const isValidDate = (date: unknown): date is string =>
  typeof date === 'string' && !isNaN(new Date(date).getTime());

export const formatDateFa = (date?: string | null) => {
  if (!isValidDate(date)) return '-';
  return new Date(date).toLocaleString('fa-IR');
};