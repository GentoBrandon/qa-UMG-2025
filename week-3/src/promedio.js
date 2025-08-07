export function calcularPromedio(numeros) {
  if (!Array.isArray(numeros) || numeros.length === 0) {
    return 0;
  }
  const suma = numeros.reduce((acumulador, actual) => acumulador + actual, 0);
  return suma / numeros.length;
}