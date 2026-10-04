import { site } from "@/config/site";
import { fromPrice, type Product } from "@/data/catalog";

// schema.org data so Google can show the store's hours, address and product prices in search and Maps.
function Script({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

const pad = (h: number) => `${String(h).padStart(2, "0")}:00`;

const storeLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": `${site.url}/#store`,
  name: site.name,
  description: site.tagline,
  url: site.url,
  image: `${site.url}/opengraph-image.png`,
  logo: `${site.url}/icon.svg`,
  telephone: `+${site.whatsapp}`,
  address: { "@type": "PostalAddress", ...site.postal },
  hasMap: site.mapsUrl,
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: pad(site.openHours.open),
      closes: pad(site.openHours.close),
    },
  ],
  paymentAccepted: "Cash, UPI",
  currenciesAccepted: "INR",
  areaServed: "Bengaluru",
};

export function StoreJsonLd() {
  return <Script data={storeLd} />;
}

export function ProductJsonLd({ product }: { product: Product }) {
  const prices = product.variants.map((v) => v.price);
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: `${site.name} ${product.name}`,
        description: product.description,
        image: product.photo ? `${site.url}${product.photo}` : undefined,
        brand: { "@type": "Brand", name: site.name },
        url: `${site.url}/product/${product.slug}`,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          lowPrice: fromPrice(product),
          highPrice: Math.max(...prices),
          offerCount: product.variants.length,
          availability: "https://schema.org/InStock",
          seller: { "@id": `${site.url}/#store` },
        },
      }}
    />
  );
}
