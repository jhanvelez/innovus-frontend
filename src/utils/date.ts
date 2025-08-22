/**
 * Devuelve una fecha en formato YYYY-MM-DD
 * @param date Fecha de entrada (Date | string | number)
 */
export function formatDate(date: Date | string | number): string {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // 0 = enero
  const day = String(d.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Devuelve la fecha y hora en formato YYYY-MM-DD HH:mm:ss
 * @param date Fecha de entrada (Date | string | number)
 */
export function formatDateTime(date: Date | string | number): string {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
