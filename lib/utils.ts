import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

// Formatea precios de forma consistente tanto en servidor como en cliente.
// Usamos Intl.NumberFormat con la locale 'es-AR' para que devuelva '8.500' (puntos) o bien
// podemos forzar coma como separador de miles. Aquí usamos 'es-AR' para consistencia regional.
export function formatPrice(value: number): string {
  try {
    return new Intl.NumberFormat('es-AR').format(value);
  } catch (e) {
    // Fallback simple si Intl no está disponible por alguna razón.
    return value.toString();
  }
}