"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { isRegistered, saveCliente } from "@/lib/clientes";
import Confetti from "./confetti";

// Proyecto académico (demo local): la ventana funciona como un control de registro obligatorio.
// Primera aparición al entrar y el tiempo para que vuelva a salir si la persona elige "Ahora no":
// corto a propósito, para que insista hasta que la persona se registre.
const FIRST_SHOW_MS = 800;
const REMIND_AFTER_MS = 500;

type Field = "nombre" | "telefono" | "correo" | "direccion" | "tarjeta";
type FormValues = Record<Field, string>;
type FormErrors = Partial<Record<Field, string>>;

const fields: { name: Field; label: string; type: string; placeholder?: string; autoComplete?: string }[] = [
  { name: "nombre", label: "Nombre completo", type: "text", placeholder: "Ej. María Rodríguez Mora", autoComplete: "name" },
  { name: "telefono", label: "Número de teléfono", type: "tel", placeholder: "Ej. 8888 8888", autoComplete: "tel" },
  { name: "correo", label: "Correo electrónico", type: "email", placeholder: "Ej. maria@correo.com", autoComplete: "email" },
  { name: "direccion", label: "Dirección", type: "text", placeholder: "Provincia, cantón y otras señas", autoComplete: "street-address" },
  { name: "tarjeta", label: "Tarjeta para acumular puntos", type: "select" },
];

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const telefono = values.telefono.replace(/[\s-]/g, "");

  if (values.nombre.trim().split(/\s+/).length < 2) errors.nombre = "Ingresá tu nombre y al menos un apellido.";
  if (!/^[245678]\d{7}$/.test(telefono)) errors.telefono = "Ingresá un número de Costa Rica de 8 dígitos.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.correo.trim())) errors.correo = "Ingresá un correo válido, como nombre@correo.com.";
  if (values.direccion.trim().length < 10) errors.direccion = "Ingresá tu dirección con provincia, cantón y señas.";
  if (!values.tarjeta) errors.tarjeta = "Elegí débito o crédito para acumular puntos.";

  return errors;
}

const emptyValues: FormValues = { nombre: "", telefono: "", correo: "", direccion: "", tarjeta: "" };

// --- Paso de pago SIMULADO -------------------------------------------------
// Los datos de la tarjeta viven solo en este estado de React: no se guardan en
// localStorage, no se envían a /api/registro y no viajan en el correo.
type Pago = { numero: string; vencimiento: string; cvv: string };
type ErroresPago = Partial<Record<keyof Pago, string>>;

const pagoVacio: Pago = { numero: "", vencimiento: "", cvv: "" };

function soloDigitos(valor: string, max: number) {
  return valor.replace(/\D/g, "").slice(0, max);
}

function formatearNumero(valor: string) {
  return soloDigitos(valor, 16).replace(/(.{4})/g, "$1 ").trim();
}

function formatearVencimiento(valor: string) {
  const digitos = soloDigitos(valor, 4);
  return digitos.length > 2 ? `${digitos.slice(0, 2)}/${digitos.slice(2)}` : digitos;
}

// Algoritmo de Luhn: verifica el dígito control de la tarjeta.
function luhnValido(numero: string) {
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

function validarPago(pago: Pago): ErroresPago {
  const errores: ErroresPago = {};
  const numero = pago.numero.replace(/\s/g, "");

  if (numero.length !== 16 || !luhnValido(numero)) {
    errores.numero = "Ingresá los 16 dígitos (probá 4111 1111 1111 1111).";
  }

  const partes = /^(\d{2})\/(\d{2})$/.exec(pago.vencimiento);
  if (!partes) {
    errores.vencimiento = "Usá el formato MM/AA.";
  } else {
    const mes = Number(partes[1]);
    const anio = 2000 + Number(partes[2]);
    const hoy = new Date();
    const vencida =
      mes < 1 ||
      mes > 12 ||
      anio < hoy.getFullYear() ||
      (anio === hoy.getFullYear() && mes < hoy.getMonth() + 1);
    if (vencida) errores.vencimiento = "Esa fecha ya venció.";
  }

  if (!/^\d{3,4}$/.test(pago.cvv)) errores.cvv = "Son 3 o 4 dígitos.";

  return errores;
}

export default function RegistrationModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [registeredName, setRegisteredName] = useState<string | null>(null);
  const [avisoCorreo, setAvisoCorreo] = useState<string | null>(null);
  const [pago, setPago] = useState<Pago>(pagoVacio);
  const [erroresPago, setErroresPago] = useState<ErroresPago>({});
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstInput = useRef<HTMLInputElement>(null);

  // La página de registros es para el profesor: ahí no se pide registro.
  const skip = pathname === "/registros";

  useEffect(() => {
    if (skip || isRegistered()) return;
    timer.current = setTimeout(() => setOpen(true), FIRST_SHOW_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [skip]);

  // Bloquea el scroll de la página de fondo mientras la ventana está abierta.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    firstInput.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleLater() {
    setOpen(false);
    timer.current = setTimeout(() => setOpen(true), REMIND_AFTER_MS);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    const erroresTarjeta = validarPago(pago);
    setErrors(found);
    setErroresPago(erroresTarjeta);

    if (Object.keys(found).length > 0 || Object.keys(erroresTarjeta).length > 0) {
      const primerCampo = fields.find((f) => found[f.name]);
      if (primerCampo) {
        document.getElementById(`registro-${primerCampo.name}`)?.focus();
      } else if (erroresTarjeta.numero) {
        document.getElementById("pago-numero")?.focus();
      } else if (erroresTarjeta.vencimiento) {
        document.getElementById("pago-vencimiento")?.focus();
      } else {
        document.getElementById("pago-cvv")?.focus();
      }
      return;
    }
    const registro = {
      nombre: values.nombre.trim(),
      telefono: values.telefono.replace(/[\s-]/g, ""),
      correo: values.correo.trim(),
      direccion: values.direccion.trim(),
      tarjeta: values.tarjeta,
    };

    saveCliente(registro);
    setRegisteredName(registro.nombre.split(/\s+/)[0]);
    setAvisoCorreo(null);

    // Avisa al servidor para que envíe el correo. Si falla, el registro local
    // ya quedó guardado, así que la persona igual puede seguir navegando.
    void fetch("/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registro),
    })
      .then((respuesta) => respuesta.json())
      .then((data: { enviado?: boolean; motivo?: string }) => {
        if (data?.enviado === false) {
          setAvisoCorreo(data.motivo ?? "El correo no se pudo enviar.");
          console.warn("[registro] Correo no enviado:", data.motivo);
        }
      })
      .catch(() => setAvisoCorreo("No se pudo contactar al servidor."));
  }

  if (skip || !open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 bg-black/60 backdrop-blur-sm">
      {!registeredName && <Confetti />}

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="registro-titulo"
        className="relative z-10 w-full max-w-lg max-h-[calc(100vh-1rem)] overflow-y-auto bg-white rounded-2xl shadow-2xl"
      >
        {/* Encabezado azul con el logo */}
        <div className="bg-gollo-blue px-6 pt-3 pb-2 text-center rounded-t-2xl">
          <Image src="/images/gollo-logo.png" alt="Gollo" width={104} height={52} className="mx-auto object-contain" />
          <h2 id="registro-titulo" className="mt-2 text-xl sm:text-2xl font-bold text-white">
            {registeredName ? (
              `¡Bienvenido, ${registeredName}!`
            ) : (
              <>
                ¡Felicidades!
                <span className="block text-lg sm:text-2xl font-extrabold leading-tight text-gollo-yellow mt-1.5">
                  Ganaste la pantalla de 60 pulgadas
                </span>
              </>
            )}
          </h2>
          {!registeredName && (
            <p className="mt-1.5 text-sm text-white/85">Completá tus datos para reclamar tu premio.</p>
          )}
        </div>

        {registeredName ? (
          <div className="px-6 py-8 text-center">
            <CheckCircle2 className="w-14 h-14 mx-auto text-gollo-green mb-3" />
            <p className="text-gollo-dark">Tu registro quedó guardado. Ya podés ver todos nuestros productos.</p>
            {avisoCorreo && (
              <p className="mt-3 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                El aviso por correo no se pudo enviar: {avisoCorreo}
              </p>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 w-full py-3 bg-gollo-yellow hover:bg-gollo-yellow-hover text-gollo-dark font-bold uppercase rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gollo-blue focus-visible:ring-offset-2"
            >
              Empezar a comprar
            </button>
          </div>
        ) : (
          <div className="relative bg-white">
            {/* Pantalla de fondo, detrás del formulario translúcido */}
            <Image
              src="/products/tv-samsung.webp"
              alt="Pantalla plana de 60 pulgadas"
              fill
              sizes="(max-width: 640px) 90vw, 512px"
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-white/75 backdrop-blur-sm" />
            <form onSubmit={handleSubmit} noValidate className="relative px-6 py-2 space-y-1.5">
            {fields.map((field, i) => (
              <div key={field.name}>
                <label htmlFor={`registro-${field.name}`} className="block text-sm font-semibold text-gollo-dark mb-1">
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <select
                    id={`registro-${field.name}`}
                    name={field.name}
                    value={values[field.name]}
                    onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                    aria-invalid={errors[field.name] ? true : undefined}
                    aria-describedby={errors[field.name] ? `registro-${field.name}-error` : undefined}
                    className={`w-full px-3 py-2 rounded-lg border-2 text-sm text-gollo-dark focus:outline-none transition-colors ${
                      errors[field.name] ? "border-gollo-red focus:border-gollo-red" : "border-gray-200 focus:border-gollo-blue"
                    }`}
                  >
                    <option value="">Seleccioná una opción</option>
                    <option value="Débito">Débito</option>
                    <option value="Crédito">Crédito</option>
                  </select>
                ) : (
                  <input
                    ref={i === 0 ? firstInput : undefined}
                    id={`registro-${field.name}`}
                    name={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
                    value={values[field.name]}
                    onChange={(e) => setValues((v) => ({ ...v, [field.name]: e.target.value }))}
                    aria-invalid={errors[field.name] ? true : undefined}
                    aria-describedby={errors[field.name] ? `registro-${field.name}-error` : undefined}
                    className={`w-full px-3 py-2 rounded-lg border-2 text-sm text-gollo-dark focus:outline-none transition-colors ${
                      errors[field.name] ? "border-gollo-red focus:border-gollo-red" : "border-gray-200 focus:border-gollo-blue"
                    }`}
                  />
                )}
                {errors[field.name] && (
                  <p id={`registro-${field.name}-error`} className="mt-1 text-xs text-gollo-red">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            <div className="space-y-2">

              <div>
                <label htmlFor="pago-numero" className="mb-1 block text-sm font-semibold text-gollo-dark">
                  Número de tarjeta
                </label>
                <input
                  id="pago-numero"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="4111 1111 1111 1111"
                  value={pago.numero}
                  onChange={(e) => setPago((p) => ({ ...p, numero: formatearNumero(e.target.value) }))}
                  aria-invalid={erroresPago.numero ? true : undefined}
                  aria-describedby={erroresPago.numero ? "pago-numero-error" : undefined}
                  className={`w-full px-3 py-2 rounded-lg border-2 text-sm text-gollo-dark focus:outline-none transition-colors ${
                    erroresPago.numero ? "border-gollo-red focus:border-gollo-red" : "border-gray-200 focus:border-gollo-blue"
                  }`}
                />
                {erroresPago.numero && (
                  <p id="pago-numero-error" className="mt-1 text-xs text-gollo-red">
                    {erroresPago.numero}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="pago-vencimiento" className="mb-1 block text-sm font-semibold text-gollo-dark">
                    Vencimiento
                  </label>
                  <input
                    id="pago-vencimiento"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="MM/AA"
                    value={pago.vencimiento}
                    onChange={(e) => setPago((p) => ({ ...p, vencimiento: formatearVencimiento(e.target.value) }))}
                    aria-invalid={erroresPago.vencimiento ? true : undefined}
                    className={`w-full px-3 py-2 rounded-lg border-2 text-sm text-gollo-dark focus:outline-none transition-colors ${
                      erroresPago.vencimiento ? "border-gollo-red focus:border-gollo-red" : "border-gray-200 focus:border-gollo-blue"
                    }`}
                  />
                  {erroresPago.vencimiento && <p className="mt-1 text-xs text-gollo-red">{erroresPago.vencimiento}</p>}
                </div>
                <div>
                  <label htmlFor="pago-cvv" className="mb-1 block text-sm font-semibold text-gollo-dark">
                    Código de seguridad
                  </label>
                  <input
                    id="pago-cvv"
                    type="password"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="123"
                    value={pago.cvv}
                    onChange={(e) => setPago((p) => ({ ...p, cvv: soloDigitos(e.target.value, 4) }))}
                    aria-invalid={erroresPago.cvv ? true : undefined}
                    className={`w-full px-3 py-2 rounded-lg border-2 text-sm text-gollo-dark focus:outline-none transition-colors ${
                      erroresPago.cvv ? "border-gollo-red focus:border-gollo-red" : "border-gray-200 focus:border-gollo-blue"
                    }`}
                  />
                  {erroresPago.cvv && <p className="mt-1 text-xs text-gollo-red">{erroresPago.cvv}</p>}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gollo-yellow hover:bg-gollo-yellow-hover text-gollo-dark font-bold uppercase rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gollo-blue focus-visible:ring-offset-2"
            >
              Registrarme
            </button>
            <button
              type="button"
              onClick={handleLater}
              className="w-full py-2 text-sm text-gollo-gray-text hover:text-gollo-blue hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gollo-blue"
            >
              Ahora no
            </button>
          </form>
          </div>
        )}
      </div>
    </div>
  );
}
