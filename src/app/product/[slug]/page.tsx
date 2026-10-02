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
        <div className="relative grid aspect-square place-items-center overflow-hidden rounded-[36px] bg-[var(--card)]">
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
