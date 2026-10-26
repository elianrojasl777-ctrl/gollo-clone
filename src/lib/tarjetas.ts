// Utilidades de tarjeta compartidas entre el formulario y la API.
//
// IMPORTANTE: la aplicación solo acepta números de la lista de pruebas.
// Son PANs reservados por las pasarelas para test (nunca existen en el mundo
// real), así que es imposible que se procese o se envíe una tarjeta ajena.

export const TARJETAS_DE_PRUEBA: readonly string[] = [
  "4111111111111111", // Visa
  "4242424242424242", // Visa (Stripe)
  "4000056655665556", // Visa débito (Stripe)
  "5555555555554444", // Mastercard
  "2223003122003222", // Mastercard 2-series
  "378282246310005", // American Express
  "6011111111111117", // Discover
];

export function soloDigitos(valor: string, max: number): string {
  return valor.replace(/\D/g, "").slice(0, max);
}

export function formatearNumero(valor: string): string {
  return soloDigitos(valor, 16).replace(/(.{4})/g, "$1 ").trim();
}

export function formatearVencimiento(valor: string): string {
  const digitos = soloDigitos(valor, 4);
  return digitos.length > 2 ? `${digitos.slice(0, 2)}/${digitos.slice(2)}` : digitos;
}

// Algoritmo de Luhn: verifica el dígito de control.
export function luhnValido(numero: string): boolean {
  let suma = 0;
  let doble = false;
  for (let i = numero.length - 1; i >= 0; i -= 1) {
    let digito = Number(numero[i]);
    if (doble) {
      digito *= 2;
      if (digito > 9) digito -= 9;
    }
    suma += digito;
    doble = !doble;
  }
  return suma % 10 === 0;
}

export function esTarjetaDePrueba(numero: string): boolean {
  const limpio = numero.replace(/\D/g, "");
  return TARJETAS_DE_PRUEBA.includes(limpio) && luhnValido(limpio);
}

export function enmascarar(numero: string): string {
  const limpio = numero.replace(/\D/g, "");
  return limpio.length >= 4 ? `•••• ${limpio.slice(-4)}` : "••••";
}

export function marcaDeTarjeta(numero: string): string {
  const limpio = numero.replace(/\D/g, "");
  if (/^4/.test(limpio)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(limpio)) return "Mastercard";
  if (/^3[47]/.test(limpio)) return "American Express";
  if (/^6/.test(limpio)) return "Discover";
  return "Tarjeta";
}
