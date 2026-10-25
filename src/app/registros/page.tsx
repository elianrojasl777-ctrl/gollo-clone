import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/top-bar";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ClientesTable from "@/components/clientes-table";

export const metadata: Metadata = {
  title: "Registro de clientes | Gollo",
};

export default function RegistrosPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gollo-bg">
      <TopBar />
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <nav aria-label="Ruta de navegación" className="text-xs text-gollo-gray-text mb-4">
            <Link href="/" className="hover:text-gollo-blue hover:underline">
              Inicio
            </Link>
            <span className="mx-1.5">/</span>
            <span>Registro de clientes</span>
          </nav>

          <h1 className="text-xl sm:text-2xl font-bold text-gollo-dark">Registro de clientes</h1>
          <p className="text-sm text-gollo-gray-text mt-1 mb-6">
            Clientes que completaron el formulario de registro. Proyecto académico: los datos se guardan solo en este
            navegador.
          </p>

          <ClientesTable />
        </div>
      </main>

      <Footer />
    </div>
  );
}
