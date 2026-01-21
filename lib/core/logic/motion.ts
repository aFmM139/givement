import { SHAKE_THRESHOLD } from '@/lib/core/constants';

/**
 * Detecta si hay una sacudida basándose en los valores del acelerómetro
 * @param x - Aceleración en el eje X
 * @param y - Aceleración en el eje Y
 * @param z - Aceleración en el eje Z
 * @returns true si se detecta una sacudida
 */
export function detectShake(x: number, y: number, z: number): boolean {
  const totalMovement = Math.abs(x) + Math.abs(y) + Math.abs(z);
  return totalMovement > SHAKE_THRESHOLD;
}

/**
 * Calcula la magnitud total del movimiento
 * @param x - Aceleración en el eje X
 * @param y - Aceleración en el eje Y
 * @param z - Aceleración en el eje Z
 * @returns Magnitud del movimiento
 */
export function calculateMovementMagnitude(
  x: number,
  y: number,
  z: number
): number {
  return Math.sqrt(x * x + y * y + z * z);
}

/**
 * Calcula la intensidad del movimiento (0-1)
 * @param x - Aceleración en el eje X
 * @param y - Aceleración en el eje Y
 * @param z - Aceleración en el eje Z
 * @returns Intensidad normalizada entre 0 y 1
 */
export function getMovementIntensity(
  x: number,
  y: number,
  z: number
): number {
  const totalMovement = Math.abs(x) + Math.abs(y) + Math.abs(z);
  const maxExpected = 5; // Valor máximo esperado
  return Math.min(totalMovement / maxExpected, 1);
}