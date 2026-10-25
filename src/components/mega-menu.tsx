"use client";

import { useState } from "react";
import { ChevronRight, X, Menu } from "lucide-react";
import { menuCategories } from "@/lib/data";
import Link from "next/link";

interface MegaMenuProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: "Alerta Roja", href: "#alerta-roja", style: "bg-gollo-red text-white" },
  { label: "Alta Gama", href: "#alta-gama", style: "bg-gollo-black text-white" },
  { label: "Exclusivo Web", href: "#exclusivo-web", style: "text-white hover:text-gollo-yellow" },
  { label: "Outlet", href: "#outlet", style: "text-white hover:text-gollo-yellow" },
  { label: "Celulares", href: "#celulares", style: "text-white hover:text-gollo-yellow" },
  { label: "Pantallas", href: "#pantallas", style: "text-white hover:text-gollo-yellow" },
  { label: "Línea Blanca", href: "#linea-blanca", style: "text-white hover:text-gollo-yellow" },
];

export default function MegaMenu({ mobileOpen, onClose }: MegaMenuProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <>
      {/* Desktop Navigation Bar — Blue */}
      <nav className="hidden lg:block bg-gollo-blue border-t border-gollo-blue-light/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-0">
            {/* CATEGORÍAS button */}
            <div className="relative">
              <button
                onMouseEnter={() => setSidebarOpen(true)}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex items-center gap-2 px-4 py-2.5 text-white font-bold text-sm hover:bg-gollo-blue-dark transition-colors"
              >
                <Menu className="w-5 h-5" />
                CATEGORÍAS
              </button>

              {/* Sidebar dropdown */}
              {sidebarOpen && (
                <div
                  className="absolute left-0 top-full bg-gollo-blue/95 backdrop-blur-sm w-56 shadow-2xl z-50 py-1"
                  onMouseLeave={() => setSidebarOpen(false)}
                >
                  {[
                    "Promociones",
                    "Outlet",
                    "Lo más nuevo",
                    "TV y video",
                    "Colchonería",
                    "Celulares",
                    "Muebles",
                    "Línea Blanca",
                    "Electrodomésticos",
                    "Automotriz",
                    "Deportes y Aire libre",
                    "Ferretería",
                    "Hogar",
                  ].map((cat) => (
                    <Link
                      key={cat}
                      href="/"
                      className="flex items-center justify-between px-5 py-2.5 text-sm text-white hover:bg-gollo-blue-light/40 transition-colors"
                    >
                      {cat}
                      <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Nav links */}
            <div className="flex items-center gap-1 ml-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded transition-colors whitespace-nowrap ${link.style}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-gollo-blue shadow-2xl overflow-y-auto">
            {/* Mobile menu header */}
            <div className="flex items-center justify-between p-4 bg-gollo-blue-dark">
              <span className="text-lg font-bold text-white">CATEGORÍAS</span>
              <button type="button" onClick={onClose} aria-label="Cerrar menú" className="p-1 hover:bg-gollo-blue rounded text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile nav links */}
            <div className="py-1 border-b border-gollo-blue-light/30">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-5 py-3 text-sm font-medium text-white hover:bg-gollo-blue-light/30 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile categories */}
            <div className="py-2">
              {menuCategories.map((cat) => (
                <div key={cat.name} className="border-b border-gollo-blue-light/20">
                  <button
                    onClick={() =>
                      setActiveCategory(activeCategory === cat.name ? null : cat.name)
                    }
                    className="flex items-center justify-between w-full px-5 py-3 text-white hover:bg-gollo-blue-light/30 transition-colors"
                  >
                    <span className="font-medium text-sm">{cat.name}</span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        activeCategory === cat.name ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {activeCategory === cat.name && (
                    <div className="bg-gollo-blue-dark/50 py-1">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub.slug}
                          href="/"
                          className="block px-8 py-2.5 text-sm text-white/80 hover:text-gollo-yellow transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
