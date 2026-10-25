"use client";

import { Search, User, ShoppingCart, Menu, CreditCard, Plus } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Form from "next/form";
import MegaMenu from "./mega-menu";
import { useCart } from "@/lib/cart";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gollo-yellow";

const actionLink = `flex flex-col items-center gap-0.5 text-white hover:text-gollo-yellow transition-colors p-2 rounded-lg ${focusRing}`;

function SearchForm({ inputId, query }: { inputId: string; query?: string }) {
  return (
    <Form action="/buscar" role="search" className="relative w-full">
      <label htmlFor={inputId} className="sr-only">
        Buscar productos
      </label>
      <input
        key={query}
        id={inputId}
        type="search"
        name="q"
        defaultValue={query}
        placeholder="Qué es lo que buscas..."
        className="w-full pl-4 pr-12 py-2.5 bg-white border-2 border-white rounded-lg text-sm text-gollo-dark focus:outline-none focus:border-gollo-yellow transition-colors"
      />
      <button
        type="submit"
        aria-label="Buscar"
        className={`absolute right-0 top-0 h-full px-4 bg-gollo-blue-dark text-white rounded-r-lg hover:bg-gollo-blue-light transition-colors ${focusRing}`}
      >
        <Search className="w-5 h-5" />
      </button>
    </Form>
  );
}

export default function Header({ query }: { query?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50">
      {/* Main Header Row — BLUE */}
      <div className="bg-gollo-blue">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4 lg:gap-8">
            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className={`lg:hidden p-2 hover:bg-gollo-blue-dark rounded-lg transition-colors text-white ${focusRing}`}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo — Real Gollo logo */}
            <Link href="/" className={`flex-shrink-0 rounded ${focusRing}`}>
              <Image
                src="/images/gollo-logo.png"
                alt="Gollo - ¡Sólo Bueno!"
                width={110}
                height={55}
                className="object-contain"
                priority
              />
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl">
              <SearchForm inputId="search-desktop" query={query} />
            </div>

            {/* Right Actions — White icons on blue */}
            <div className="flex items-center gap-1 sm:gap-3 ml-auto">
              <Link href="/" className={`hidden sm:flex ${actionLink}`}>
                <CreditCard className="w-5 h-5" />
                <span className="text-xs font-medium">Crédito</span>
              </Link>

              <Link href="/" className={actionLink}>
                <User className="w-5 h-5" />
                <span className="text-xs font-medium">Mi cuenta</span>
              </Link>

              <Link
                href="/"
                className={`relative ${actionLink}`}
                aria-label={`Mi Bolsa, ${count} ${count === 1 ? "producto" : "productos"}`}
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {count > 0 && (
                    <span className="absolute -top-2 -right-2.5 bg-gollo-yellow text-gollo-dark text-[10px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">Mi Bolsa</span>
              </Link>

              <Link href="/" className={`hidden sm:flex ${actionLink}`}>
                <Plus className="w-5 h-5" />
                <span className="text-xs font-medium">Servicios</span>
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-3">
            <SearchForm inputId="search-mobile" query={query} />
          </div>
        </div>
      </div>

      {/* Category Navigation Bar — BLUE */}
      <MegaMenu mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
