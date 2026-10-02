"use client";

import { useState } from "react";
import type { Product } from "@/data/catalog";
import { useOrder } from "./OrderProvider";

export function QuickAdd({ product }: { product: Product }) {
  const { add } = useOrder();
  const [size, setSize] = useState(product.variants[0].size);
  const [done, setDone] = useState(false);

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      {product.variants.length > 1 ? (
        <label className="relative">
          <span className="sr-only">Size for {product.name}</span>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="h-10 w-full appearance-none rounded-full border border-[var(--line)] bg-white pl-4 pr-8 text-sm"
          >
            {product.variants.map((v) => (
              <option key={v.size} value={v.size}>
                {v.size} · ₹{v.price}
              </option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 size-3 -translate-y-1/2" viewBox="0 0 12 12" aria-hidden>
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" />
          </svg>
        </label>
      ) : (
        <span className="h-10 rounded-full border border-[var(--line)] px-4 text-center text-sm leading-10">
          {product.variants[0].size}
        </span>
      )}
      <button
        type="button"
        onClick={() => {
          add(product.slug, size);
          setDone(true);
          setTimeout(() => setDone(false), 1400);
        }}
        className="h-10 rounded-full sm:flex-1 bg-[var(--leaf)] px-4 text-sm font-semibold text-[var(--rice)] transition-colors hover:bg-[var(--leaf-deep)]"
      >
        {done ? "Added ✓" : "Add"}
      </button>
    </div>
  );
}
