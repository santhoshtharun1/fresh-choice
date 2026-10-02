import Link from "next/link";
import { categories, products, type CategoryId } from "@/data/catalog";
import { ProductCard } from "./ProductCard";

export function ShopView({ active }: { active?: CategoryId }) {
  const cat = categories.find((c) => c.id === active);
  const list = active ? products.filter((p) => p.category === active) : products;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
      <h1 className="font-display text-4xl sm:text-5xl">{cat ? cat.name : "Our oils"}</h1>
      {cat && <p lang="kn" className="mt-1 font-kannada text-lg text-[var(--wood)]">{cat.kannada}</p>}
      <p className="mt-3 max-w-xl text-[var(--muted)]">
        {cat ? cat.blurb : "Every oil is pressed slowly in a wooden chekku."} Prices follow the market and are confirmed on WhatsApp.
      </p>

      {categories.length > 1 && <nav className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2" aria-label="Categories">
        <Tab href="/shop" on={!active}>All</Tab>
        {categories.map((c) => (
          <Tab key={c.id} href={`/shop/${c.id}`} on={active === c.id}>{c.name}</Tab>
        ))}
      </nav>}

      <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3">
        {list.map((p) => <ProductCard key={p.slug} product={p} />)}
      </div>
    </div>
  );
}

function Tab({ href, on, children }: { href: string; on: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={on ? "page" : undefined}
      className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${on ? "border-[var(--leaf)] bg-[var(--leaf)] text-[var(--rice)]" : "border-[var(--line)] bg-white hover:border-[var(--leaf)]"}`}
    >
      {children}
    </Link>
  );
}
