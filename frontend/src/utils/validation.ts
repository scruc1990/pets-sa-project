/**
 * Validar que una cédula colombiana sea válida
 */
export function isValidCedula(cedula: string): boolean {
  const cedulaRegex = /^\d{1,10}$/
  return cedulaRegex.test(cedula)
}

/**
 * Validar que un teléfono sea válido
 */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^\d{7,15}$/
  return phoneRegex.test(phone)
}

/**
 * Validar que un peso sea válido (positivo)
 */
export function isValidWeight(weight: number): boolean {
  return weight > 0
}

/**
 * Validar que una edad sea válida (positiva y razonable)
 */
export function isValidAge(age: number): boolean {
  return age >= 0 && age <= 100
}
