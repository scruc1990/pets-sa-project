/**
 * Formatear fecha al formato local
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('es-ES')
}

/**
 * Formatear fecha y hora
 */
export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleString('es-ES')
}

/**
 * Formatear peso con 2 decimales
 */
export function formatWeight(weight: number): string {
  return `${weight.toFixed(2)} kg`
}

/**
 * Truncar texto a N caracteres
 */
export function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
}

/**
 * Capitalizar primera letra
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}
