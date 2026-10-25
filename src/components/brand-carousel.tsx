import { brands } from "@/lib/data";

export default function BrandCarousel() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gollo-dark mb-8 text-center">
          Marcas que Encontrás en Gollo
        </h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 items-center">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-center p-4 rounded-lg bg-gray-50 hover:shadow-md hover:bg-white transition-all cursor-pointer group border border-gray-100"
            >
              <span className="text-sm font-bold text-gollo-gray-text group-hover:text-gollo-blue transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
