"use client";

import { useMemo, useSyncExternalStore } from "react";
import { Trash2, Users } from "lucide-react";
import { clearClientes, getClientesSnapshot, parseClientes, subscribeClientes } from "@/lib/clientes";
import { enmascarar, marcaDeTarjeta } from "@/lib/tarjetas";

const dateFormat = new Intl.DateTimeFormat("es-CR", { dateStyle: "medium", timeStyle: "short" });

export default function ClientesTable() {
  const raw = useSyncExternalStore(subscribeClientes, getClientesSnapshot, () => null);
  const clientes = useMemo(() => parseClientes(raw), [raw]);

  function handleClear() {
    if (confirm("¿Borrar todos los clientes registrados en este navegador?")) clearClientes();
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-gray-100">
        <p className="flex items-center gap-2 text-sm font-semibold text-gollo-dark">
          <Users className="w-4 h-4 text-gollo-blue" />
          {clientes.length === 1 ? "1 cliente registrado" : `${clientes.length} clientes registrados`}
        </p>
        {clientes.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gollo-red border border-gollo-red rounded hover:bg-gollo-red hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gollo-red focus-visible:ring-offset-2"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Borrar registros
          </button>
        )}
      </div>

      {clientes.length === 0 ? (
        <p className="px-4 py-12 text-center text-sm text-gollo-gray-text">
          Todavía no hay clientes registrados en este navegador.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gollo-blue text-white text-xs uppercase">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Nombre</th>
                <th scope="col" className="px-4 py-3 font-semibold">Teléfono</th>
                <th scope="col" className="px-4 py-3 font-semibold">Correo</th>
                <th scope="col" className="px-4 py-3 font-semibold">Dirección</th>
                <th scope="col" className="px-4 py-3 font-semibold">Tarjeta</th>
                <th scope="col" className="px-4 py-3 font-semibold">N° tarjeta</th>
                <th scope="col" className="px-4 py-3 font-semibold">Vence</th>
                <th scope="col" className="px-4 py-3 font-semibold">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gollo-dark">
              {clientes.map((c, i) => (
                <tr key={`${c.fecha}-${i}`} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{c.nombre}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{c.telefono.replace(/(\d{4})(\d{4})/, "$1 $2")}</td>
                  <td className="px-4 py-3">{c.correo}</td>
                  <td className="px-4 py-3 min-w-48">{c.direccion}</td>
                  <td className="px-4 py-3">{c.tarjeta || "—"}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {c.pagoNumero ? `${enmascarar(c.pagoNumero)} · ${marcaDeTarjeta(c.pagoNumero)}` : "—"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{c.pagoVence || "—"}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gollo-gray-text">{dateFormat.format(new Date(c.fecha))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
