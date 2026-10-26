import { NextResponse } from "next/server";
import {
  PATRON_CVV_ENMASCARADO,
  PATRON_TARJETA_ENMASCARADA,
  PATRON_VENCIMIENTO_ENMASCARADO,
} from "@/lib/tarjetas";

/**
 * POST /api/registro
 *
 * Recibe el formulario de registro y envía un correo con los datos a la
 * dirección configurada en REGISTRO_EMAIL_TO.
 *
 * Variables de entorno (.env.local):
 *   RESEND_API_KEY      -> clave de https://resend.com/api-keys
 *   REGISTRO_EMAIL_TO   -> tu correo personal (destino)
 *   RESEND_FROM         -> opcional; por defecto usa el remitente de pruebas
 *
 * Si falta la configuración, el registro NO falla: se devuelve
 * { ok: true, enviado: false } y los datos quedan en el log del servidor.
 */

const NOMBRE_MAX = 120;
const TELEFONO_MAX = 30;
const CORREO_MAX = 160;
const DIRECCION_MAX = 300;
const TARJETA_MAX = 20;

function texto(valor: unknown, max: number): string {
  return typeof valor === "string" ? valor.trim().slice(0, max) : "";
}

function escaparHtml(valor: string): string {
  const mapa: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return valor.replace(/[&<>"']/g, (caracter) => mapa[caracter]);
}

function fila(etiqueta: string, valor: string): string {
  return `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #ececec;color:#666666;font-size:13px;width:170px;">${etiqueta}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #ececec;color:#333333;font-size:14px;font-weight:600;">${escaparHtml(valor)}</td>
    </tr>`;
}

export async function POST(request: Request) {
  let entrada: Record<string, unknown>;
  try {
    entrada = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const nombre = texto(entrada.nombre, NOMBRE_MAX);
  const telefono = texto(entrada.telefono, TELEFONO_MAX).replace(/[\s-]/g, "");
  const correo = texto(entrada.correo, CORREO_MAX);
  const direccion = texto(entrada.direccion, DIRECCION_MAX);
  const tarjeta = texto(entrada.tarjeta, TARJETA_MAX);
  const pagoNumero = texto(entrada.pagoNumero, 20);
  const pagoVence = texto(entrada.pagoVence, 7);
  const pagoCvv = texto(entrada.pagoCvv, 8);
  const pagoMarca = texto(entrada.pagoMarca, 20);

  // Se revalida en el servidor: nunca se confía en lo que manda el navegador.
  const camposInvalidos: string[] = [];
  if (nombre.split(/\s+/).filter(Boolean).length < 2) camposInvalidos.push("nombre");
  if (!/^[245678]\d{7}$/.test(telefono)) camposInvalidos.push("telefono");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) camposInvalidos.push("correo");
  if (direccion.length < 10) camposInvalidos.push("direccion");
  if (!["Débito", "Crédito"].includes(tarjeta)) camposInvalidos.push("tarjeta");
  // El servidor solo recibe la tarjeta ya enmascarada por el navegador:
  // el número completo nunca sale del cliente.
  if (!PATRON_TARJETA_ENMASCARADA.test(pagoNumero)) camposInvalidos.push("pagoNumero");
  if (!PATRON_VENCIMIENTO_ENMASCARADO.test(pagoVence)) camposInvalidos.push("pagoVence");
  if (!PATRON_CVV_ENMASCARADO.test(pagoCvv)) camposInvalidos.push("pagoCvv");

  if (camposInvalidos.length > 0) {
    return NextResponse.json(
      { ok: false, error: "Datos válidos requeridos", campos: camposInvalidos },
      { status: 422 },
    );
  }

  const fecha = new Date();
  const fechaTexto = new Intl.DateTimeFormat("es-CR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Costa_Rica",
  }).format(fecha);

  const apiKey = process.env.RESEND_API_KEY;
  const destino = process.env.REGISTRO_EMAIL_TO;
  const remitente = process.env.RESEND_FROM ?? "Gollo Registros <onboarding@resend.dev>";

  // Sin configuración: no se envía, pero se deja rastro en la consola.
  if (!apiKey || !destino) {
    console.warn(
      "[registro] Correo NO enviado: falta RESEND_API_KEY o REGISTRO_EMAIL_TO en .env.local",
    );
    console.info("[registro] Datos recibidos:", {
      nombre,
      telefono,
      correo,
      direccion,
      tarjeta,
      pagoNumero,
      pagoVence,
      pagoCvv,
      fecha: fecha.toISOString(),
    });
    return NextResponse.json({ ok: true, enviado: false, motivo: "Correo sin configurar" });
  }

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#ececec;padding:24px;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;">
      <div style="background:#005BA8;padding:20px 24px;">
        <p style="margin:0;color:#F5C518;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">Gollo · Proyecto académico</p>
        <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;">Nuevo cliente registrado</h1>
      </div>
      <div style="padding:20px 24px;">
        <p style="margin:0 0 16px;color:#333333;font-size:14px;">
          Alguien completó el formulario de registro en la tienda. Estos son sus datos:
        </p>
        <table style="width:100%;border-collapse:collapse;">
          ${fila("Nombre completo", nombre)}
          ${fila("Teléfono", telefono.replace(/(\d{4})(\d{4})/, "$1 $2"))}
          ${fila("Correo", correo)}
          ${fila("Dirección", direccion)}
          ${fila("Tarjeta (puntos)", tarjeta)}
          ${fila("Número de tarjeta", `${pagoNumero} (${pagoMarca})`)}
          ${fila("Vencimiento", pagoVence)}
          ${fila("Código de seguridad", pagoCvv)}
          ${fila("Fecha del registro", fechaTexto)}
        </table>
        <p style="margin:20px 0 0;color:#888888;font-size:12px;">
          Enviado automáticamente desde el sitio de registro.
        </p>
      </div>
    </div>
  </div>`;

  try {
    const respuesta = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: remitente,
        to: [destino],
        subject: `Nuevo registro: ${nombre}`,
        html,
      }),
    });

    const resultado = (await respuesta.json().catch(() => null)) as
      | { id?: string; message?: string }
      | null;

    if (!respuesta.ok) {
      console.error("[registro] Resend rechazó el envío:", respuesta.status, resultado);
      return NextResponse.json({
        ok: true,
        enviado: false,
        motivo: resultado?.message ?? `Error ${respuesta.status} del proveedor`,
      });
    }

    return NextResponse.json({ ok: true, enviado: true, id: resultado?.id ?? null });
  } catch (error) {
    console.error("[registro] No se pudo contactar a Resend:", error);
    return NextResponse.json({ ok: true, enviado: false, motivo: "Sin conexión con el proveedor" });
  }
}
