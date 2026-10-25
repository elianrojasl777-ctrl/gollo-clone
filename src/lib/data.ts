export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  originalPrice: number;
  discountPrice?: number;
  discountPercent?: number;
  image: string;
  badge?: string;
  webExclusive?: boolean;
  monthlyPayment?: number;
  rating: number;
  reviews: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  image: string;
  productCount: number;
}

export interface Brand {
  id: number;
  name: string;
  logo: string;
}

export const categories: Category[] = [
  { id: 1, name: "Tecnología", slug: "tecnologia", icon: "Smartphone", image: "/categories/cat-celulares.webp", productCount: 245 },
  { id: 2, name: "Línea Blanca", slug: "linea-blanca", icon: "Refrigerator", image: "/categories/cat-linea-blanca.webp", productCount: 189 },
  { id: 3, name: "Audio y Video", slug: "audio-video", icon: "Tv", image: "/categories/cat-tv.webp", productCount: 156 },
  { id: 4, name: "Electrodomésticos", slug: "electrodomesticos", icon: "CookingPot", image: "/categories/cat-electro.webp", productCount: 312 },
  { id: 5, name: "Muebles", slug: "muebles", icon: "Sofa", image: "/categories/cat-muebles.webp", productCount: 198 },
  { id: 6, name: "Camas y Colchones", slug: "camas-colchones", icon: "BedDouble", image: "/categories/cat-camas.webp", productCount: 87 },
  { id: 7, name: "Motos", slug: "motos", icon: "Bike", image: "/categories/cat-motos.webp", productCount: 45 },
  { id: 8, name: "Ofertas", slug: "ofertas", icon: "Tag", image: "/categories/cat-ofertas.webp", productCount: 523 },
];

export const menuCategories = [
  {
    name: "Tecnología",
    subcategories: [
      { name: "Celulares", slug: "celulares" },
      { name: "Laptops", slug: "laptops" },
      { name: "Tablets", slug: "tablets" },
      { name: "Smartwatches", slug: "smartwatches" },
      { name: "Accesorios", slug: "accesorios-tech" },
    ],
  },
  {
    name: "Línea Blanca",
    subcategories: [
      { name: "Refrigeradoras", slug: "refrigeradoras" },
      { name: "Lavadoras", slug: "lavadoras" },
      { name: "Secadoras", slug: "secadoras" },
      { name: "Cocinas", slug: "cocinas" },
      { name: "Aires Acondicionados", slug: "aires-acondicionados" },
    ],
  },
  {
    name: "Audio y Video",
    subcategories: [
      { name: "Smart TV", slug: "smart-tv" },
      { name: "Barras de Sonido", slug: "barras-sonido" },
      { name: "Parlantes", slug: "parlantes" },
      { name: "Audífonos", slug: "audifonos" },
      { name: "Home Theater", slug: "home-theater" },
    ],
  },
  {
    name: "Electrodomésticos",
    subcategories: [
      { name: "Freidoras de Aire", slug: "freidoras-aire" },
      { name: "Licuadoras", slug: "licuadoras" },
      { name: "Cafeteras", slug: "cafeteras" },
      { name: "Microondas", slug: "microondas" },
      { name: "Aspiradoras", slug: "aspiradoras" },
    ],
  },
  {
    name: "Muebles",
    subcategories: [
      { name: "Salas", slug: "salas" },
      { name: "Comedores", slug: "comedores" },
      { name: "Dormitorios", slug: "dormitorios" },
      { name: "Oficina", slug: "oficina" },
      { name: "Organizadores", slug: "organizadores" },
    ],
  },
  {
    name: "Camas y Colchones",
    subcategories: [
      { name: "Colchones Individual", slug: "colchones-individual" },
      { name: "Colchones Matrimonial", slug: "colchones-matrimonial" },
      { name: "Colchones Queen", slug: "colchones-queen" },
      { name: "Bases", slug: "bases" },
    ],
  },
  {
    name: "Gollo Motors",
    subcategories: [
      { name: "Motocicletas", slug: "motocicletas" },
      { name: "Cascos", slug: "cascos" },
      { name: "Accesorios Moto", slug: "accesorios-moto" },
    ],
  },
];

export const featuredProducts: Product[] = [
  {
    id: 1,
    webExclusive: true,
    name: 'Smart TV Samsung 55" Crystal UHD 4K',
    brand: "Samsung",
    category: "Audio y Video",
    originalPrice: 449990,
    discountPrice: 349990,
    discountPercent: 22,
    image: "/products/tv-samsung.webp",
    badge: "Más Vendido",
    monthlyPayment: 29166,
    rating: 4.7,
    reviews: 234,
  },
  {
    id: 2,
    name: "iPhone 16 128GB",
    brand: "Apple",
    category: "Tecnología",
    originalPrice: 699990,
    discountPrice: 649990,
    discountPercent: 7,
    image: "/products/iphone-16.webp",
    badge: "Nuevo",
    monthlyPayment: 54166,
    rating: 4.9,
    reviews: 189,
  },
  {
    id: 3,
    name: "Refrigeradora LG 14 pies French Door",
    brand: "LG",
    category: "Línea Blanca",
    originalPrice: 599990,
    discountPrice: 499990,
    discountPercent: 17,
    image: "/products/refri-lg.webp",
    monthlyPayment: 41666,
    rating: 4.5,
    reviews: 156,
  },
  {
    id: 4,
    webExclusive: true,
    name: "Lavadora Samsung 40 lbs Automática",
    brand: "Samsung",
    category: "Línea Blanca",
    originalPrice: 349990,
    discountPrice: 299990,
    discountPercent: 14,
    image: "/products/lavadora-samsung.webp",
    badge: "¡Sólo Bueno!",
    monthlyPayment: 24999,
    rating: 4.6,
    reviews: 98,
  },
  {
    id: 5,
    name: "Laptop HP 15.6\" Intel Core i5 8GB RAM",
    brand: "HP",
    category: "Tecnología",
    originalPrice: 499990,
    discountPrice: 449990,
    discountPercent: 10,
    image: "/products/laptop-hp.webp",
    monthlyPayment: 37499,
    rating: 4.3,
    reviews: 67,
  },
  {
    id: 6,
    webExclusive: true,
    name: "Freidora de Aire Ninja 5.5L Digital",
    brand: "Ninja",
    category: "Electrodomésticos",
    originalPrice: 89990,
    discountPrice: 69990,
    discountPercent: 22,
    image: "/products/freidora-ninja.webp",
    badge: "Top Ventas",
    monthlyPayment: 5833,
    rating: 4.8,
    reviews: 312,
  },
  {
    id: 7,
    name: "Sofá Esquinero en L Tela Gris",
    brand: "Casa Linda",
    category: "Muebles",
    originalPrice: 399990,
    discountPrice: 329990,
    discountPercent: 18,
    image: "/products/sofa-esquinero.webp",
    monthlyPayment: 27499,
    rating: 4.4,
    reviews: 45,
  },
  {
    id: 8,
    name: "Aire Acondicionado Inverter 12000 BTU",
    brand: "LG",
    category: "Línea Blanca",
    originalPrice: 349990,
    discountPrice: 289990,
    discountPercent: 17,
    image: "/products/aire-lg.webp",
    monthlyPayment: 24166,
    rating: 4.6,
    reviews: 78,
  },
];

export const offerProducts: Product[] = [
  {
    id: 9,
    webExclusive: true,
    name: "Galaxy A15 128GB",
    brand: "Samsung",
    category: "Tecnología",
    originalPrice: 169990,
    discountPrice: 119990,
    discountPercent: 29,
    image: "/products/galaxy-a15.webp",
    badge: "¡Oferta!",
    monthlyPayment: 9999,
    rating: 4.2,
    reviews: 156,
  },
  {
    id: 10,
    name: "Microondas Whirlpool 1.1 pies",
    brand: "Whirlpool",
    category: "Electrodomésticos",
    originalPrice: 79990,
    discountPrice: 59990,
    discountPercent: 25,
    image: "/products/microondas.webp",
    monthlyPayment: 4999,
    rating: 4.1,
    reviews: 89,
  },
  {
    id: 11,
    webExclusive: true,
    name: "Colchón Restonic Queen Orthopedic",
    brand: "Restonic",
    category: "Camas y Colchones",
    originalPrice: 299990,
    discountPrice: 199990,
    discountPercent: 33,
    image: "/products/colchon.webp",
    badge: "Liquidación",
    monthlyPayment: 16666,
    rating: 4.5,
    reviews: 67,
  },
  {
    id: 12,
    name: "Barra de Sonido JBL Bar 2.1",
    brand: "JBL",
    category: "Audio y Video",
    originalPrice: 189990,
    discountPrice: 139990,
    discountPercent: 26,
    image: "/products/barra-jbl.webp",
    monthlyPayment: 11666,
    rating: 4.7,
    reviews: 134,
  },
];

export const brands: Brand[] = [
  { id: 1, name: "Samsung", logo: "/brands/samsung.svg" },
  { id: 2, name: "LG", logo: "/brands/lg.svg" },
  { id: 3, name: "Apple", logo: "/brands/apple.svg" },
  { id: 4, name: "Whirlpool", logo: "/brands/whirlpool.svg" },
  { id: 5, name: "HP", logo: "/brands/hp.svg" },
  { id: 6, name: "Sony", logo: "/brands/sony.svg" },
  { id: 7, name: "Xiaomi", logo: "/brands/xiaomi.svg" },
  { id: 8, name: "Mabe", logo: "/brands/mabe.svg" },
];

export const heroBanners = [
  {
    id: 1,
    title: "¡Compratón Gollo!",
    subtitle: "Hasta 40% de descuento en tecnología",
    cta: "Ver Ofertas",
    bgColor: "from-gollo-red to-red-800",
    accentColor: "bg-gollo-yellow text-gollo-dark",
  },
  {
    id: 2,
    title: "Renueva tu Hogar",
    subtitle: "Línea blanca con hasta 24 cuotas sin interés",
    cta: "Comprar Ahora",
    bgColor: "from-gollo-dark to-gray-800",
    accentColor: "bg-gollo-red text-white",
  },
  {
    id: 3,
    title: "Gollo Motors",
    subtitle: "Encuentra tu moto ideal con Crédito Gollo",
    cta: "Ver Motos",
    bgColor: "from-yellow-500 to-gollo-yellow",
    accentColor: "bg-gollo-dark text-white",
  },
];

export function formatPrice(price: number): string {
  return "₡" + price.toLocaleString("es-CR");
}

export const allProducts: Product[] = [...featuredProducts, ...offerProducts];

// Lowercase and strip accents so "electrodomesticos" matches "Electrodomésticos"
function normalize(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function searchProducts(query: string): Product[] {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  if (words.length === 0) return allProducts;

  return allProducts.filter((product) => {
    const haystack = normalize(`${product.name} ${product.brand} ${product.category}`);
    return words.every((word) => haystack.includes(word));
  });
}
