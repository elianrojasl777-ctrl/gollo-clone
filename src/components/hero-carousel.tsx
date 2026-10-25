"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Oferta = {
  marca: string;
  nombre: string;
  precio: string;
  antes: string;
  descuento: string;
  img: string;
};

type Slide = {
  id: number;
  ofertas: Oferta[];
  nota: string;
};

const slides: Slide[] = [
  {
    id: 1,
    ofertas: [
      {
        marca: "FRIGIDAIRE",
        nombre: "Refrigeradora",
        precio: "₡229.905",
        antes: "₡329.900",
        descuento: "-30%",
        img: "/products/refri-lg.webp",
      },
      {
        marca: "FRIGIDAIRE",
        nombre: "Refrigeradora Side by Side",
        precio: "₡499.890",
        antes: "₡629.900",
        descuento: "-21%",
        img: "/products/refri-lg.webp",
      },
    ],
    nota: "*Válido del 20 al 26 de octubre de 2026.",
  },
  {
    id: 2,
    ofertas: [
      {
        marca: "SAMSUNG",
        nombre: "Lavadora Automática 40 lbs",
        precio: "₡299.990",
        antes: "₡349.990",
        descuento: "-14%",
        img: "/products/lavadora-samsung.webp",
      },
      {
        marca: "LG",
        nombre: "Aire Acondicionado Inverter",
        precio: "₡289.990",
        antes: "₡349.990",
        descuento: "-17%",
        img: "/products/aire-lg.webp",
      },
    ],
    nota: "*Aplican restricciones. Precios con IVA incluido.",
  },
  {
    id: 3,
    ofertas: [
      {
        marca: "SAMSUNG",
        nombre: 'Smart TV 55" Crystal UHD',
        precio: "₡349.990",
        antes: "₡449.990",
        descuento: "-22%",
        img: "/products/tv-samsung.webp",
      },
      {
        marca: "RESTONIC",
        nombre: "Colchón Queen Orthopedic",
        precio: "₡199.990",
        antes: "₡299.990",
        descuento: "-33%",
        img: "/products/colchon.webp",
      },
    ],
    nota: "*Productos seleccionados. Stock limitado.",
  },
];

function TarjetaOferta({ oferta }: { oferta: Oferta }) {
  return (
    <div className="relative flex flex-1 flex-col justify-between border-b border-white/15 px-4 py-3 first:border-l-0 last:border-b-0 sm:border-b-0 sm:border-l sm:px-5">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wide text-white/85">{oferta.marca}</p>
        <p className="text-xs leading-tight text-white/70">{oferta.nombre}</p>

        <p className="mt-2 inline-block bg-gollo-yellow px-1.5 py-0.5 text-[10px] font-bold text-gollo-dark">
          PRECIO DE OFERTA
        </p>
        <p className="mt-1 text-2xl font-black leading-none text-white sm:text-3xl">{oferta.precio}</p>
        <p className="mt-1 text-[10px] text-white/60">PRECIOS ANTES {oferta.antes}</p>
      </div>

      <div className="mt-2 flex items-end justify-between gap-2">
        <Link
          href="/"
          className="bg-white px-3 py-1.5 text-[11px] font-bold text-gollo-dark transition-colors hover:bg-gollo-yellow"
        >
          COMPRÁ AQUÍ
        </Link>
        <div className="relative h-24 w-28 shrink-0 sm:h-28 sm:w-32">
          <Image src={oferta.img} alt={oferta.nombre} fill sizes="128px" className="object-contain drop-shadow-2xl" />
        </div>
      </div>

      <span className="absolute bottom-[86px] right-3 flex h-12 w-12 -rotate-12 items-center justify-center rounded-full bg-gollo-red text-center text-[10px] font-black leading-[1.05] text-white shadow-lg">
        {oferta.descuento}
        <br />
        DTO.
      </span>
    </div>
  );
}

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gollo-bg pb-2 pt-3">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[220px_1fr_220px]">
          {/* Columna izquierda */}
          <div className="hidden flex-col gap-3 lg:flex">
            <Link href="/" className="group relative flex-1 overflow-hidden rounded-lg bg-black">
              <Image
                src="/images/banner-phone.webp"
                alt=""
                fill
                sizes="220px"
                className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
              <div className="relative flex h-full flex-col justify-between p-4">
                <div>
                  <p className="text-xs font-bold text-white/70">REDMI</p>
                  <p className="text-lg font-black uppercase italic leading-none text-white">Note 17</p>
                  <p className="mt-1 text-[10px] text-white/70">Batería Más. Energía Máx.</p>
                  <p className="mt-2 text-3xl font-black leading-none text-gollo-yellow">₡9.210</p>
                  <p className="text-[10px] text-white/60">/mes</p>
                </div>
                <span className="self-start bg-gollo-yellow px-3 py-1 text-[11px] font-bold text-gollo-dark">
                  COMPRAR
                </span>
              </div>
            </Link>

            <Link href="/" className="group relative flex-1 overflow-hidden rounded-lg bg-black">
              <Image
                src="/products/refri-lg.webp"
                alt=""
                fill
                sizes="220px"
                className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
              <div className="relative flex h-full flex-col justify-end p-4">
                <p className="text-[11px] leading-tight text-white/80">Todos tus marcas de</p>
                <p className="text-lg font-black uppercase italic leading-none text-white">Alta Gama</p>
                <p className="mt-1 text-[11px] text-white/80">con más de</p>
                <p className="text-4xl font-black leading-none text-gollo-yellow">
                  40<span className="text-xl">%</span>
                  <span className="ml-1 text-sm font-bold">DTO</span>
                </p>
                <span className="mt-3 self-start bg-gollo-yellow px-3 py-1 text-[11px] font-bold text-gollo-dark">
                  COMPRAR
                </span>
              </div>
            </Link>
          </div>

          {/* Carrusel central */}
          <div className="relative overflow-hidden rounded-lg bg-[#0a2f78]">
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {slides.map((slide) => (
                <div key={slide.id} className="min-w-full bg-gradient-to-br from-[#0a2f78] via-[#0b46a3] to-[#082659]">
                  <div className="flex flex-col sm:flex-row">
                    {slide.ofertas.map((oferta) => (
                      <TarjetaOferta key={`${oferta.marca}-${oferta.precio}`} oferta={oferta} />
                    ))}
                  </div>
                  <p className="px-4 pb-7 text-[10px] text-white/60">{slide.nota}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white transition-colors hover:bg-black/50"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrent((c) => (c + 1) % slides.length)}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-1.5 text-white transition-colors hover:bg-black/50"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Columna derecha */}
          <div className="hidden flex-col gap-3 lg:flex">
            <Link href="/" className="relative flex-1 overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="relative flex h-full flex-col justify-between p-3 pr-12">
                <div>
                  <p className="text-sm font-black text-gollo-dark">Mabe</p>
                  <p className="text-[10px] leading-tight text-gray-600">
                    Lavadora Análoga Digital 19 Kg Blanca
                  </p>
                  <p className="mt-2 text-[9px] font-bold text-gollo-blue">PRECIO DE OFERTA</p>
                  <p className="text-2xl font-black leading-none text-gollo-blue">₡239.895</p>
                  <p className="text-[9px] text-gray-500">PRECIOS ANTES ₡399.990</p>
                </div>
                <span className="mt-2 self-start bg-gollo-yellow px-3 py-1 text-[11px] font-bold text-gollo-dark">
                  COMPRAR
                </span>
              </div>
              <div className="pointer-events-none absolute -right-2 bottom-8 h-24 w-24">
                <Image src="/products/lavadora-samsung.webp" alt="" fill sizes="96px" className="object-contain" />
              </div>
              <span className="absolute right-2 top-3 flex h-10 w-10 -rotate-12 items-center justify-center rounded-full bg-gollo-red text-center text-[9px] font-black leading-[1.05] text-white">
                -41%
                <br />
                DTO.
              </span>
            </Link>

            <Link href="/" className="relative flex-1 overflow-hidden rounded-lg bg-[#0b3f8f]">
              <div className="relative flex h-full flex-col justify-between p-3 pr-12">
                <div>
                  <p className="text-[10px] font-bold text-white/80">FRIGIDAIRE</p>
                  <p className="text-[11px] leading-tight text-white">Refrigeradora</p>
                  <p className="mt-1.5 inline-block bg-gollo-yellow px-1.5 py-0.5 text-[9px] font-bold text-gollo-dark">
                    PRECIO DE OFERTA
                  </p>
                  <p className="mt-1 text-2xl font-black leading-none text-white">₡229.905</p>
                  <p className="text-[9px] text-white/60">PRECIOS ANTES ₡329.900</p>
                </div>
                <span className="mt-2 self-start bg-white px-3 py-1 text-[11px] font-bold text-gollo-dark">
                  COMPRAR
                </span>
              </div>
              <div className="pointer-events-none absolute -right-3 bottom-10 h-24 w-24">
                <Image src="/products/refri-lg.webp" alt="" fill sizes="96px" className="object-contain" />
              </div>
              <span className="absolute right-2 top-3 flex h-10 w-10 -rotate-12 items-center justify-center rounded-full bg-gollo-red text-center text-[9px] font-black leading-[1.05] text-white">
                -30%
                <br />
                DTO.
              </span>
            </Link>
          </div>
        </div>

        {/* Puntos debajo del bloque */}
        <div className="mt-3 flex items-center justify-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => setCurrent(i)}
              aria-label={`Oferta ${i + 1}`}
              aria-current={i === current}
              className={`h-2.5 rounded-full transition-all ${
                i === current ? "w-2.5 bg-gollo-blue" : "w-2.5 bg-gray-400 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
