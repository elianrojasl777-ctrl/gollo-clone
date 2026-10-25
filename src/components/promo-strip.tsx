import Image from "next/image";
import Link from "next/link";

export default function PromoStrip() {
  return (
    <section className="bg-gollo-bg pb-4 pt-1">
      <div className="mx-auto max-w-7xl px-4">
        <Link
          href="/buscar?q=microondas"
          className="group relative flex items-center overflow-hidden rounded-[36px] bg-gradient-to-r from-[#062a63] via-[#0b46a3] to-[#062a63] px-6 py-5 sm:px-10 sm:py-6"
        >
          <div className="relative z-10 flex-1">
            <p className="flex flex-wrap items-baseline gap-x-2 text-white">
              <span className="text-2xl font-medium sm:text-4xl">Hasta</span>
              <span className="text-6xl font-black leading-none text-gollo-yellow sm:text-8xl">
                40<span className="text-3xl sm:text-5xl">%</span>
              </span>
              <span className="text-lg font-bold sm:text-2xl">DTO.</span>
              <span className="text-2xl font-medium sm:text-4xl">en</span>
              <span className="text-3xl font-black uppercase italic tracking-tight text-gollo-yellow sm:text-5xl">
                Microondas
              </span>
            </p>
            <p className="mt-1 text-[11px] text-white/60">*Oferta válida hasta agotar existencias.</p>
          </div>

          <div className="relative hidden h-24 w-40 shrink-0 sm:block sm:h-32 sm:w-64">
            <Image
              src="/products/microondas.webp"
              alt="Microondas en oferta"
              fill
              sizes="(max-width: 640px) 0px, 256px"
              className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
