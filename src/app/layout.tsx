import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import RegistrationModal from "@/components/registration-modal";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gollo - ¡Sólo Bueno! | Tienda en Línea Costa Rica",
  description: "Encuentra los mejores electrodomésticos, tecnología, muebles y más en Gollo Costa Rica. ¡Sólo Bueno! Crédito fácil y envío a todo el país.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <CartProvider>
          {children}
          <RegistrationModal />
        </CartProvider>
      </body>
    </html>
  );
}
