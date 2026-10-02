import Link from "next/link";
import { site } from "@/config/site";
import { categories, products, productsIn } from "@/data/catalog";
import { ChekkuPress } from "@/components/ChekkuPress";
import { ProductCard } from "@/components/ProductCard";
import { ProductArt } from "@/components/ProductArt";
import { WaIcon } from "@/components/OrderDrawer";
import { waLink } from "@/lib/whatsapp";

export default function Home() {
  const featured = products.filter((p) => p.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--leaf)] text-[var(--rice)]">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-10 pt-12 sm:px-6 md:grid-cols-[1.15fr_1fr] md:pb-16 md:pt-20">
          <div>
            <p lang="kn" className="font-kannada text-lg text-[var(--oil)]">ಗಾಣದ ಎಣ್ಣೆ · ಶಾವಿಗೆ</p>
            <h1 className="mt-3 font-display text-[2.6rem] leading-[1.05] sm:text-6xl md:text-[4.2rem]">
              Oil pressed slowly in wood, the way it used to be made.
            </h1>
            <p className="mt-6 max-w-md text-lg text-[var(--rice)]/80">
              Groundnut, sesame and coconut oil from a wooden chekku, plus ragi and wheat shavige. Pick what you need and send us the list on WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="rounded-full bg-[var(--oil)] px-6 py-3 font-semibold text-[var(--ink)] hover:bg-[#EDB447]">
                Shop the oils
              </Link>
              <a
                href={waLink(`Hi ${site.name}, I'd like to place an order.`)}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 rounded-full border border-[var(--rice)]/40 px-6 py-3 font-semibold hover:bg-white/10"
              >
                <WaIcon className="size-5" /> Chat on WhatsApp
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[340px] md:max-w-[400px]">
            <div className="absolute inset-x-6 bottom-6 top-16 rounded-full bg-[var(--oil)]/15 blur-3xl" aria-hidden />
            <ChekkuPress className="relative w-full" />
          </div>
        </div>
        <div className="relative border-t border-white/10 bg-[var(--leaf-deep)]">
          <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-x-8 gap-y-2 px-4 py-4 text-[0.95rem] text-[var(--rice)]/85 sm:grid-cols-3 sm:px-6">
            <li>No chemicals, no refining</li>
            <li>FSSAI licensed</li>
            <li>Delivered across Bengaluru</li>
          </ul>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <h2 className="font-display text-3xl sm:text-4xl">What we sell</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {categories.map((c) => {
            const sample = productsIn(c.id).slice(0, 3);
            return (
              <Link
                key={c.id}
                href={`/shop/${c.id}`}
                className="group flex flex-col justify-between rounded-[28px] border border-[var(--line)] bg-white p-6 hover:border-[var(--leaf)]"
              >
                <div>
                  <p lang="kn" className="font-kannada text-[var(--wood)]">{c.kannada}</p>
                  <h3 className="mt-1 font-display text-2xl">{c.name}</h3>
                  <p className="mt-2 text-[var(--muted)]">{c.blurb}</p>
                </div>
                <div className="mt-6 flex items-end justify-between">
                  <div className="flex -space-x-4">
                    {sample.map((p) => (
                      <ProductArt key={p.slug} product={p} className="h-20 w-auto" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-[var(--leaf)] group-hover:underline underline-offset-4">
                    {productsIn(c.id).length} products
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl sm:text-4xl">Most ordered</h2>
          <Link href="/shop" className="font-semibold text-[var(--leaf)] underline underline-offset-4">See all products</Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3">
          {featured.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* How ordering works — a real sequence, so it's numbered */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <h2 className="font-display text-3xl sm:text-4xl">How ordering works</h2>
        <ol className="mt-8 grid gap-8 md:grid-cols-3">
          {[
            ["Add to your order list", "Pick products and sizes. Your list stays saved on this phone."],
            ["Send it on WhatsApp", "One tap sends the full list with your address. No app or account needed."],
            ["We confirm and deliver", "We reply with the final price, then deliver or send it by Rapido."],
          ].map(([t, d], i) => (
            <li key={t} className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--oil)] font-display text-xl">{i + 1}</span>
              <div>
                <h3 className="text-lg font-semibold">{t}</h3>
                <p className="mt-1 text-[var(--muted)]">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Delivery */}
      <section id="delivery" className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="grid items-center gap-10 rounded-[36px] bg-[var(--oil-soft)] p-6 sm:p-10 md:grid-cols-[1fr_1.1fr]">
          <DeliveryRings />
          <div>
            <h2 className="font-display text-3xl sm:text-4xl">Delivery across Bengaluru</h2>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-lg font-semibold">Within {site.freeDeliveryRadiusKm} km of our store</dt>
                <dd className="text-[var(--muted)]">Our own team brings it to your door.</dd>
              </div>
              <div>
                <dt className="text-lg font-semibold">More than {site.freeDeliveryRadiusKm} km away</dt>
                <dd className="text-[var(--muted)]">We pack it and send it by Rapido parcel. You pay the Rapido fare, which we&apos;ll tell you before booking.</dd>
              </div>
            </dl>
            <p className="mt-6 text-sm text-[var(--muted)]">Store: {site.storeArea} · {site.hours}</p>
          </div>
        </div>
      </section>

      {/* Bulk */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 border-y border-[var(--line)] py-10 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl">Buying for a restaurant or shop?</h2>
            <p className="mt-2 text-[var(--muted)]">
              We supply large packs to restaurants, caterers, hotels and grocery stores at wholesale rates.
            </p>
          </div>
          <Link href="/bulk" className="rounded-full bg-[var(--leaf)] px-6 py-3 font-semibold text-[var(--rice)] hover:bg-[var(--leaf-deep)]">
            Ask for a bulk quote
          </Link>
        </div>
      </section>
    </>
  );
}

function DeliveryRings() {
  return (
    <svg viewBox="0 0 320 320" className="mx-auto w-full max-w-[320px]" role="img" aria-label="Delivery zones: our team within 3 km, Rapido parcel beyond">
      <circle cx="160" cy="160" r="150" fill="#fff" fillOpacity="0.55" stroke="#1f4a2e" strokeOpacity="0.35" strokeDasharray="6 8" strokeWidth="2" />
      <circle cx="160" cy="160" r="78" fill="#1f4a2e" />
      <circle cx="160" cy="124" r="6" fill="#e2a12e" />
      <text x="160" y="156" textAnchor="middle" fill="#f5f6f0" fontSize="15" fontWeight="600">Our team</text>
      <text x="160" y="176" textAnchor="middle" fill="#f5f6f0" fontSize="13" opacity=".8">0 – 3 km</text>
            <text x="160" y="40" textAnchor="middle" fill="#1f4a2e" fontSize="14" fontWeight="600">Rapido parcel</text>
      <text x="160" y="58" textAnchor="middle" fill="#5d6658" fontSize="12">beyond 3 km</text>
      <g fill="none" stroke="#e2a12e" strokeWidth="3" strokeLinecap="round">
        <path d="M232 214l40 40" />
        <path d="M262 254h10v-10" />
      </g>
    </svg>
  );
}
