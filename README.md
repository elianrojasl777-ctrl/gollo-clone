This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Correo automático de registros

Cada vez que alguien completa el formulario, el navegador llama a `POST /api/registro`
y esa ruta envía un correo con los datos a la dirección configurada.

### Configuración (una sola vez)

1. Creá una cuenta gratis en [resend.com](https://resend.com).
2. Generá una API key en [resend.com/api-keys](https://resend.com/api-keys).
3. Copiá `env.example` a `.env.local` y completá:

```env
RESEND_API_KEY=re_tu_clave_aca
REGISTRO_EMAIL_TO=tu-correo@ejemplo.com
```

4. Reiniciá el servidor (`npm run dev`).

### Cómo probarlo

Llená el formulario de registro en el sitio y revisá la bandeja de entrada.
Si algo falla, la consola del servidor muestra el motivo exacto.

Sin `RESEND_API_KEY`, la ruta **no rompe nada**: guarda el registro en el
navegador y escribe los datos en la consola del servidor.

### Para que llegue desde cualquier dispositivo

`localhost` solo funciona en tu computadora. Para que un tercero se registre
de verdad, el sitio tiene que estar publicado (por ejemplo en Vercel) y las
mismas dos variables tienen que estar cargadas en el panel del hosting.

> Con el remitente de pruebas (`onboarding@resend.dev`) solo se puede enviar
> a la dirección con la que creaste la cuenta de Resend. Para enviar a otra
> dirección hay que verificar un dominio propio.

---

## Publicar en Vercel

1. Subí el repositorio a GitHub:

```bash
git remote add origin https://github.com/TU-USUARIO/gollo-clone.git
git push -u origin main
```

2. Entrá a [vercel.com](https://vercel.com) con la cuenta de GitHub,
   *Add New → Project* e importá el repositorio. Detecta Next.js solo.

3. En **Environment Variables** cargá, antes del primer deploy:

| Variable | Valor |
|---|---|
| `RESEND_API_KEY` | la clave de Resend |
| `REGISTRO_EMAIL_TO` | el correo que recibe los registros |
| `RESEND_FROM` | opcional, remitente propio |

4. Deploy. Vercel devuelve una URL `*.vercel.app` que ya funciona en cualquier
   dispositivo.

5. **Dominio propio** (opcional): en Vercel → *Settings → Domains* agregás el
   dominio y creás en tu registrador los registros DNS que Vercel indique
   (un `A` y un `CNAME`). El HTTPS lo genera Vercel solo.

> Comprar el dominio no publica el sitio: son dos pasos distintos. El dominio
> es la dirección; el hosting (Vercel) es donde vive la página.

---

## Notas técnicas

- **Pago simulado**: el formulario valida número, vencimiento y CVV (Luhn y
  fecha), pero esos datos no se guardan, no se envían al servidor y no viajan
  en el correo. Para cobros reales correspondería una pasarela (Stripe).
- **Registros**: `/registros` muestra los registros guardados en el navegador
  de quien la abre. El correo electrónico es el registro centralizado.
- **Imágenes**: los archivos de `public/` tienen extensión `.webp` pero el
  contenido es JPEG. Next los reoptimiza al servirlos, así que no afecta al
  usuario, pero conviene normalizarlas si se reutilizan fuera del proyecto.
