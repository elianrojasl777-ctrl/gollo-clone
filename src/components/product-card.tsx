"use client";

import { Heart, ArrowLeftRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, formatPrice } from "@/lib/data";
import { useCart } from "@/lib/cart";

interface ProductCardProps {
  product: Product;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gollo-blue focus-visible:ring-offset-2";

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isComparing, setIsComparing] = useState(false);

  return (
    <div className="group bg-white rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Top Promotional Badges */}
      <div className="px-3 pt-3 flex items-center justify-between gap-1 min-h-[30px]">
        <div className="flex items-center gap-1.5 flex-wrap">
          {product.webExclusive && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-gollo-yellow text-gollo-dark border border-gollo-yellow-hover">
              PRODUCTO EXCLUSIVO WEB
            </span>
          )}
          {product.badge && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-gollo-blue-dark text-white">
              {product.badge}
            </span>
          )}
        </div>
      </div>

      {/* Product Image */}
      <div className="relative aspect-square w-full bg-white p-3 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 250px"
          className="object-contain p-5 group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product details */}
      <div className="p-3.5 flex-1 flex flex-col justify-between border-t border-gray-100 bg-white">
        <div>
          <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
            {product.brand}
          </p>
          <h3 className="text-sm font-medium text-gollo-dark leading-snug line-clamp-2 min-h-[2.5rem] mb-2 group-hover:text-gollo-blue transition-colors">
            {product.name}
          </h3>

          {/* Pricing */}
          <div className="mb-3">
            {product.discountPrice ? (
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg sm:text-xl font-extrabold text-gollo-red">
                    {formatPrice(product.discountPrice)}
                  </span>
                  {product.discountPercent ? (
                    <span className="px-1.5 py-0.5 text-[11px] font-bold rounded bg-gollo-yellow text-gollo-dark">
                      -{product.discountPercent}%
                    </span>
                  ) : null}
                </div>
                <div className="text-xs text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </div>
              </div>
            ) : (
              <div className="text-lg sm:text-xl font-extrabold text-gollo-dark">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-2 mt-auto">
          <button
            type="button"
            onClick={addItem}
            className={`block w-full py-2 bg-gollo-yellow hover:bg-gollo-yellow-hover text-gollo-dark text-xs sm:text-sm font-bold uppercase rounded text-center transition-colors shadow-sm ${focusRing}`}
          >
            Agregar al Carrito
          </button>
          <Link
            href="/"
            className={`block w-full py-2 bg-gollo-blue hover:bg-gollo-blue-dark text-white text-xs sm:text-sm font-bold uppercase rounded text-center transition-colors shadow-sm ${focusRing}`}
          >
            Más Detalles
          </Link>

          {/* Quick Actions Footer */}
          <div className="flex items-center justify-around pt-2 border-t border-gray-100 text-xs text-gray-500">
            <button
              type="button"
              onClick={() => setIsComparing((v) => !v)}
              aria-pressed={isComparing}
              className={`inline-flex items-center gap-1 rounded hover:text-gollo-blue transition-colors ${isComparing ? "text-gollo-blue font-semibold" : ""} ${focusRing}`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span>Comparar</span>
            </button>
            <button
              type="button"
              onClick={() => setIsFavorite((v) => !v)}
              aria-pressed={isFavorite}
              className={`inline-flex items-center gap-1 rounded hover:text-gollo-red transition-colors ${isFavorite ? "text-gollo-red font-semibold" : ""} ${focusRing}`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? "fill-current" : ""}`} />
              <span>Favoritos</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
