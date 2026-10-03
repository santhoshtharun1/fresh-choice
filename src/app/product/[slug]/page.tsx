import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProduct, products } from "@/data/catalog";
import { ProductArt } from "@/components/ProductArt";
import { ProductCard } from "@/components/ProductCard";
import { BuyBox } from "@/components/BuyBox";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return { title: p ? `${p.name} (${p.kannada})` : undefined, description: p?.description };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const cat = getCategory(p.category)!;
  const related = products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-sm text-[var(--muted)]">
        <Link href="/shop" className="hover:underline">Shop</Link>
        <span className="mx-2" aria-hidden>/</span>
        <Link href={`/shop/${cat.id}`} className="hover:underline">{cat.name}</Link>
      </nav>

      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="relative grid aspect-square place-items-center self-start overflow-hidden rounded-[36px] bg-[var(--card)] md:sticky md:top-28">
          <ProductArt product={p} className="h-[82%] w-auto" sizes="(min-width: 768px) 560px, 100vw" />
        </div>
        <div>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">{p.name}</h1>
          <p lang="kn" className="mt-1 font-kannada text-xl text-[var(--wood)]">{p.kannada}</p>
          <p className="mt-5 max-w-prose text-lg">{p.description}</p>

          <BuyBox product={p} />

          <div className="mt-10">
            <h2 className="font-semibold">Good for</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.uses.map((u) => (
                <li key={u} className="rounded-full bg-[var(--oil-soft)] px-3 py-1 text-sm">{u}</li>
              ))}
            </ul>
          </div>

          {/* Lamp oil may be a blend, so the pressing claims are only shown for the pressed oils */}
          {p.slug !== "deepam-oil" && <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ["Slow wooden press", "Pressed in a wooden chekku, so the oil stays cool."],
              ["Nothing added", "No chemicals, no preservatives, no refining."],
              ["Natural aroma", "Keeps the smell, taste and colour of the seed."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-2xl bg-[var(--card)] p-4">
                <p className="flex items-center gap-2 font-semibold">
                  <svg viewBox="0 0 16 16" className="size-4 shrink-0 text-[var(--leaf)]" aria-hidden>
                    <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">{d}</p>
              </li>
            ))}
          </ul>}

          <div className="mt-8 rounded-2xl border border-[var(--line)] p-4 text-sm">
            <p className="font-semibold">Storage</p>
            <p className="mt-1 text-[var(--muted)]">
              Keep the cap closed and store away from sunlight and heat. Use a dry spoon. Natural settling at the bottom is normal. The best-before date is printed on the bottle.
            </p>
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-semibold text-[var(--leaf)]">
              <Link href="/#oil-guide" className="underline-offset-4 hover:underline">Which oil for what?</Link>
              <Link href="/#faq" className="underline-offset-4 hover:underline">Common questions</Link>
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="pt-20">
          <h2 className="font-display text-3xl">More {cat.name.toLowerCase()}</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3">
            {related.map((r) => <ProductCard key={r.slug} product={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}
