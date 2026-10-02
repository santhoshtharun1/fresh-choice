import Link from "next/link";
import { fromPrice, type Product } from "@/data/catalog";
import { rupees } from "@/lib/whatsapp";
import { ProductArt } from "./ProductArt";
import { QuickAdd } from "./QuickAdd";

export function ProductCard({ product }: { product: Product }) {
  const multi = product.variants.length > 1;
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
      <div className="mt-3 flex flex-col gap-1 px-1 sm:mt-4 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-lg leading-tight sm:text-xl">
            <Link href={`/product/${product.slug}`} className="hover:underline underline-offset-4">
              {product.name}
            </Link>
          </h3>
          <p lang="kn" className="font-kannada text-sm text-[var(--muted)]">
            {product.kannada}
          </p>
        </div>
        <p className="shrink-0 text-base font-semibold tabular-nums sm:pt-1 sm:text-right">
          {multi && <span className="mr-1 text-xs font-normal text-[var(--muted)] sm:mr-0 sm:block">from</span>}
          {rupees(fromPrice(product))}
        </p>
      </div>
      <p className="mt-1 hidden px-1 text-sm text-[var(--muted)] sm:block">{product.short}</p>
      <div className="mt-3 px-1">
        <QuickAdd product={product} />
      </div>
    </article>
  );
}
