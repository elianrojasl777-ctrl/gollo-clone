"use client";

import { X, Truck, Percent } from "lucide-react";
import { useState } from "react";

export default function TopBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-gollo-yellow text-gollo-dark text-xs sm:text-sm relative">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
        <div className="flex items-center gap-2">
          <Percent className="w-4 h-4 text-gollo-red" />
          <span className="font-bold">¡Los MEJORES DESCUENTOS del mes!</span>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 font-medium">
          <Truck className="w-4 h-4" />
          Aprovechá precio de empleado en lavadoras y secadoras
        </span>
        <span className="hidden md:flex items-center gap-1.5">
          <span className="text-xs">Comprá con</span>
          <span className="font-bold text-gollo-blue">TASA CERO</span>
        </span>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-yellow-400 rounded transition-colors"
        aria-label="Cerrar barra promocional"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
