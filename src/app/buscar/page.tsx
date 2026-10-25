import type { Metadata } from "next";
import Link from "next/link";
import { SearchX } from "lucide-react";
import TopBar from "@/components/top-bar";
import Header from "@/components/header";
import ProductCard from "@/components/product-card";
import Footer from "@/components/footer";
import { searchProducts } from "@/lib/data";

type SearchPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const suggestions = ["Samsung", "Celulares", "Línea Blanca", "LG", "Smart TV"];

// La búsqueda depende del parámetro ?q= en cada visita, así que esta ruta se
// renderiza por request. Con `cacheComponents` activo hay que permitirlo
// explícitamente; si no, el build falla con "blocking-prerender-runtime".
export const instant = false;

async function getQuery(searchParams: SearchPageProps["searchParams"]): Promise<string> {
  const { q } = await searchParams;
  return (Array.isArray(q) ? q[0] : q ?? "").trim();
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = await getQuery(searchParams);
  return { title: query ? `Resultados para "${query}" | Gollo` : "Todos los productos | Gollo" };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = await getQuery(searchParams);
  const results = searchProducts(query);

  return (
    <div className="flex flex-col min-h-screen bg-gollo-bg">
      <TopBar />
      <Header query={query} />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav aria-label="Ruta de navegación" className="text-xs text-gollo-gray-text mb-4">
            <Link href="/" className="hover:text-gollo-blue hover:underline">
              Inicio
            </Link>
            <span className="mx-1.5">/</span>
            <span>Búsqueda</span>
          </nav>

          <h1 className="text-xl sm:text-2xl text-gollo-dark">
            {query ? (
              <>
                Resultados para <span className="font-bold">“{query}”</span>
              </>
            ) : (
              <span className="font-bold">Todos los productos</span>
            )}
          </h1>
          <p className="text-sm text-gollo-gray-text mt-1 mb-6" aria-live="polite">
            {results.length === 1 ? "1 producto encontrado" : `${results.length} productos encontrados`}
          </p>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 py-12 px-6 text-center">
              <SearchX className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h2 className="text-lg font-bold text-gollo-dark mb-1">
                No encontramos productos para “{query}”
              </h2>
              <p className="text-sm text-gollo-gray-text mb-6">
                Revisá la ortografía o probá con una de estas búsquedas:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestions.map((term) => (
                  <Link
                    key={term}
                    href={`/buscar?q=${encodeURIComponent(term)}`}
                    className="px-3 py-1.5 rounded-full border border-gollo-blue text-gollo-blue text-sm font-medium hover:bg-gollo-blue hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gollo-blue focus-visible:ring-offset-2"
                  >
                    {term}
                  </Link>
                ))}
              </div>
              <Link
                href="/buscar"
                className="inline-block mt-6 text-sm text-gollo-blue font-semibold hover:underline"
              >
                Ver todos los productos
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
