import { CreditCard, ShieldCheck, Truck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PromoBanner() {
  return (
    <>
      {/* Credit Banner */}
      <section className="bg-gollo-blue py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block px-3 py-1 bg-gollo-yellow text-gollo-dark text-sm font-bold rounded-full mb-4">
                Crédito Gollo
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                ¡Tu crédito listo en minutos!
              </h2>
              <p className="text-blue-100 text-lg mb-6 max-w-lg mx-auto lg:mx-0">
                Solicita tu Crédito Gollo en línea y llévate lo que necesitas con cuotas que se ajustan a tu presupuesto.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gollo-yellow text-gollo-dark font-bold rounded-lg hover:bg-gollo-yellow-hover transition-colors"
              >
                Solicitar Crédito
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <CreditCard className="w-10 h-10 text-gollo-yellow mx-auto mb-3" />
                <p className="text-white font-semibold">Hasta 24 Cuotas</p>
                <p className="text-blue-200 text-sm mt-1">Sin interés</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <ShieldCheck className="w-10 h-10 text-gollo-yellow mx-auto mb-3" />
                <p className="text-white font-semibold">Gollo Plus</p>
                <p className="text-blue-200 text-sm mt-1">Garantía extendida</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <Truck className="w-10 h-10 text-gollo-yellow mx-auto mb-3" />
                <p className="text-white font-semibold">Envío Gratis</p>
                <p className="text-blue-200 text-sm mt-1">En compras +₡50,000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-white py-8 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-gollo-blue flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-gollo-dark">Envío a Todo el País</p>
                <p className="text-xs text-gollo-gray-text">Recibí en tu puerta</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-gollo-blue flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-gollo-dark">Compra Segura</p>
                <p className="text-xs text-gollo-gray-text">Pago 100% protegido</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-gollo-blue flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-gollo-dark">Múltiples Pagos</p>
                <p className="text-xs text-gollo-gray-text">Tarjeta, SINPE, Crédito</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gollo-blue rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                CR
              </div>
              <div>
                <p className="font-semibold text-sm text-gollo-dark">100% Costarricense</p>
                <p className="text-xs text-gollo-gray-text">+100 tiendas</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
