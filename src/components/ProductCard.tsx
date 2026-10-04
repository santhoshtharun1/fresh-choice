import Link from "next/link";
import { bestOff, cheapest, percentOff, type Product } from "@/data/catalog";
import { rupees } from "@/lib/whatsapp";
import { ProductArt } from "./ProductArt";
import { QuickAdd } from "./QuickAdd";

export function ProductCard({ product }: { product: Product }) {
  const multi = product.variants.length > 1;
  const from = cheapest(product);
  const off = bestOff(product);
  const upTo = multi && product.variants.some((v) => percentOff(v) !== off);
  return (
    <article className="group relative flex flex-col">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden rounded-[20px] sm:aspect-[5/6] sm:rounded-[28px] bg-[var(--card)]"
      >
        <ProductArt
          product={product}
          className="absolute inset-0 m-auto h-[86%] w-auto transition-transform duration-300 group-hover:-translate-y-1"
        />
      </Link>
      <div className="mt-3 px-1 sm:mt-4">
        <h3 className="font-display text-lg leading-tight sm:text-xl">
          <Link href={`/product/${product.slug}`} className="hover:underline underline-offset-4">
            {product.name}
          </Link>
        </h3>
        <p lang="kn" className="font-kannada text-sm text-[var(--muted)]">
          {product.kannada}
        </p>
        {/* Price line: final price, struck-out price and the offer tag together, so the deal reads at a glance */}
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 tabular-nums">
          {multi && <span className="text-xs text-[var(--muted)]">from</span>}
          <span className="text-xl font-bold leading-none sm:text-2xl">{rupees(from.price)}</span>
          {from.mrp && percentOff(from) > 0 && (
            <s className="text-sm text-[var(--muted)]">{rupees(from.mrp)}</s>
          )}
          {off > 0 && (
            <span className="rounded-md bg-[#1E8E4E] px-2 py-0.5 text-xs font-extrabold uppercase tracking-wide text-white">
              {upTo ? `Up to ${off}% off` : `${off}% off`}
            </span>
          )}
        </div>
        {from.mrp && percentOff(from) > 0 && (
          <p className="mt-1 text-xs font-semibold text-[#177240]">You save {rupees(from.mrp - from.price)}</p>
        )}
      </div>
      <p className="mt-1 hidden px-1 text-sm text-[var(--muted)] sm:block">{product.short}</p>
      <div className="mt-3 px-1">
        <QuickAdd product={product} />
      </div>
    </article>
  );
}
