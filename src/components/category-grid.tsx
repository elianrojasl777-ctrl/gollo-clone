import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";

export default function CategoryGrid() {
  return (
    <section className="py-8 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl text-gollo-dark mb-6 text-center">
          Nuestras <span className="font-bold">categorías</span>
        </h2>
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href="/"
              className="group flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-blue-50/60 transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gollo-blue"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-100 group-hover:border-gollo-blue group-hover:shadow-md transition-all">
                <Image
                  src={cat.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 64px, 80px"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gollo-dark group-hover:text-gollo-blue transition-colors line-clamp-2">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
