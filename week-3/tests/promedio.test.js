import { expect, test, describe } from 'vitest'
import { calcularPromedio } from '../src/promedio';

describe('pruebas para la función calcularPromedio', () => {

  test('debe calcular el promedio de un array de números', () => {
    expect(calcularPromedio([1, 2, 3, 4, 5])).toBe(3);
  });

  test('debe manejar arrays con números negativos', () => {
    expect(calcularPromedio([-1, 0, 1])).toBe(0);
  });

  test('debe devolver 0 si el array está vacío', () => {
    expect(calcularPromedio([])).toBe(0);
  });

  test('debe devolver 0 si el input no es un array', () => {
    expect(calcularPromedio('no es un array')).toBe(0);
    expect(calcularPromedio(null)).toBe(0);
  });
});