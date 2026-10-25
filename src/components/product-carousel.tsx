"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/lib/data";
import ProductCard from "./product-card";
import Link from "next/link";

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
}

export default function ProductCarousel({
  title,
  subtitle,
  products,
  viewAllLink = "#",
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gollo-dark">{title}</h2>
            {subtitle && (
              <p className="text-gollo-gray-text mt-1">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={viewAllLink}
              className="hidden sm:inline-flex text-sm font-semibold text-gollo-blue hover:underline"
            >
              Ver Todo →
            </Link>
            <button
              onClick={() => scroll("left")}
              className="p-2 border border-gray-200 rounded-full hover:border-gollo-blue hover:text-gollo-blue transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 border border-gray-200 rounded-full hover:border-gollo-blue hover:text-gollo-blue transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Products scroll */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[230px] max-w-[250px] snap-start flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
