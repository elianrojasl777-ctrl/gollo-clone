import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gollo-black text-white">
      {/* Newsletter */}
      <div className="bg-gollo-blue py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold">¡Suscribite a nuestras ofertas!</h3>
              <p className="text-blue-100 text-sm mt-1">
                Recibí las mejores promociones directo en tu correo
              </p>
            </div>
            <div className="flex-1 max-w-md w-full">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-1 px-4 py-3 rounded-l-lg text-gollo-dark text-sm focus:outline-none"
                />
                <button className="px-6 py-3 bg-gollo-yellow text-gollo-dark font-bold rounded-r-lg hover:bg-gollo-yellow-hover transition-colors whitespace-nowrap">
                  Suscribirme
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
            <div className="mb-4">
              <Image
                src="/images/gollo-logo.png"
                alt="Gollo"
                width={90}
                height={45}
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Tu tienda de confianza en Costa Rica. ¡Sólo Bueno! desde 1975.
            </p>
            <div className="flex items-center gap-3">
              <Link href="/" className="p-2 bg-white/10 rounded-full hover:bg-gollo-blue transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </Link>
              <Link href="/" className="p-2 bg-white/10 rounded-full hover:bg-gollo-blue transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </Link>
              <Link href="/" className="p-2 bg-white/10 rounded-full hover:bg-gollo-blue transition-colors" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </Link>
              <Link href="/" className="p-2 bg-white/10 rounded-full hover:bg-gollo-blue transition-colors" aria-label="X / Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </Link>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-gollo-yellow">
              Sobre Gollo
            </h4>
            <ul className="space-y-2.5">
              {["Quiénes Somos", "Trabaje con Nosotros", "Noticias", "Responsabilidad Social", "Inversionistas"].map(
                (item) => (
                  <li key={item}>
                    <Link href="/" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-1">
                      <ChevronRight className="w-3 h-3 opacity-50" />
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-gollo-yellow">
              Ayuda
            </h4>
            <ul className="space-y-2.5">
              {["Centro de Ayuda", "Mis Pedidos", "Devoluciones", "Garantías", "Preguntas Frecuentes"].map(
                (item) => (
                  <li key={item}>
                    <Link href="/" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-1">
                      <ChevronRight className="w-3 h-3 opacity-50" />
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-gollo-yellow">
              Servicios
            </h4>
            <ul className="space-y-2.5">
              {["Crédito Gollo", "Gollo Plus", "Gollo Motors", "Click & Collect", "Instalación"].map(
                (item) => (
                  <li key={item}>
                    <Link href="/" className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-1">
                      <ChevronRight className="w-3 h-3 opacity-50" />
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-gollo-yellow">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-gollo-yellow" />
                <div>
                  <p>800-GOLLO (46556)</p>
                  <p className="text-xs text-gray-500">Lun-Sáb 8am-6pm</p>
                </div>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0 text-gollo-yellow" />
                servicio@gollo.com
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gollo-yellow" />
                <span>San José, Costa Rica</span>
              </li>
            </ul>

            <Link
              href="/"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              💬 WhatsApp
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
            <p>© 2026 Gollo – Grupo Unicomer. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4">
              <Link href="/" className="hover:text-white transition-colors">Términos y Condiciones</Link>
              <Link href="/" className="hover:text-white transition-colors">Política de Privacidad</Link>
              <Link href="/" className="hover:text-white transition-colors">Cookies</Link>
              <Link href="/registros" className="hover:text-white transition-colors">Registro de clientes</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
