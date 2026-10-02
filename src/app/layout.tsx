import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/config/site";
import { OrderProvider } from "@/components/OrderProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrderDrawer } from "@/components/OrderDrawer";

export const metadata: Metadata = {
  title: {
    default: `${site.name} – Wood-pressed oils in Bengaluru`,
    template: `%s | ${site.name}`,
  },
  description:
    "Wood-pressed groundnut, sunflower, coconut, safflower, sesame, mustard and castor oil. Order on WhatsApp, delivered across Bengaluru.",
  openGraph: {
    title: `${site.name} – Wood-pressed oils in Bengaluru`,
    description: site.tagline,
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = { themeColor: "#1f4a2e" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <OrderProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
          <OrderDrawer />
        </OrderProvider>
      </body>
    </html>
  );
}
