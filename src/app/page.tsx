import TopBar from "@/components/top-bar";
import Header from "@/components/header";
import HeroCarousel from "@/components/hero-carousel";
import PromoStrip from "@/components/promo-strip";
import CategoryGrid from "@/components/category-grid";
import ProductCarousel from "@/components/product-carousel";
import PromoBanner from "@/components/promo-banner";
import BrandCarousel from "@/components/brand-carousel";
import Footer from "@/components/footer";
import { featuredProducts, offerProducts } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gollo-bg">
      {/* Top promotional bar — Yellow */}
      <TopBar />

      {/* Main header — Blue with logo and nav */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero — 3 column layout with side banners + center carousel */}
        <HeroCarousel />

        {/* Franja "Hasta 40% en microondas" */}
        <PromoStrip />

        {/* "Nuestras categorías" */}
        <CategoryGrid />

        {/* Productos Destacados */}
        <ProductCarousel
          title="Productos Destacados"
          subtitle="Los más buscados por nuestros clientes"
          products={featuredProducts}
          viewAllLink="#destacados"
        />

        {/* Crédito Gollo + Trust badges */}
        <PromoBanner />

        {/* Ofertas Especiales */}
        <ProductCarousel
          title="🔥 Ofertas Especiales"
          subtitle="¡Aprovechá antes de que se acaben!"
          products={offerProducts}
          viewAllLink="#ofertas"
        />

        {/* Marcas */}
        <BrandCarousel />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
