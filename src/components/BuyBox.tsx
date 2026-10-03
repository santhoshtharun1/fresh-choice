"use client";

import { useState } from "react";
import { percentOff, type Product } from "@/data/catalog";
import { quickOrderMessage, rupees, waLink } from "@/lib/whatsapp";
import { useOrder } from "./OrderProvider";
import { WaIcon } from "./OrderDrawer";

export function BuyBox({ product }: { product: Product }) {
  const { add, setOpen } = useOrder();
  const [size, setSize] = useState(product.variants[0].size);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const variant = product.variants.find((v) => v.size === size)!;
  const { price } = variant;
  const off = percentOff(variant);

  return (
    <div className="mt-8 rounded-[28px] border border-[var(--line)] bg-white p-5 sm:p-6">
      <fieldset>
        <legend className="mb-3 text-sm font-semibold">Size</legend>
        <div className="flex flex-wrap gap-2">
          {product.variants.map((v) => (
            <label
              key={v.size}
              className={`cursor-pointer rounded-2xl border px-4 py-2.5 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-[var(--oil)] ${size === v.size ? "border-[var(--leaf)] bg-[var(--leaf)] text-[var(--rice)]" : "border-[var(--line)] hover:border-[var(--leaf)]"}`}
            >
              <input type="radio" name="size" value={v.size} checked={size === v.size} onChange={() => setSize(v.size)} className="sr-only" />
              <span className="block font-semibold">{v.size}</span>
              <span className="block text-sm tabular-nums opacity-80">
                {percentOff(v) > 0 && <s className="mr-1 opacity-70">{rupees(v.mrp!)}</s>}
                {rupees(v.price)}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1" role="group" aria-label="Quantity">
          <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity" className="grid size-10 place-items-center rounded-full border border-[var(--line)] text-xl">−</button>
          <span className="w-10 text-center text-lg tabular-nums" aria-live="polite">{qty}</span>
          <button type="button" onClick={() => setQty(qty + 1)} aria-label="Increase quantity" className="grid size-10 place-items-center rounded-full border border-[var(--line)] text-xl">+</button>
        </div>
        <div className="text-right">
          {off > 0 && (
            <p className="text-sm tabular-nums">
              <s className="text-[var(--muted)]">{rupees(variant.mrp! * qty)}</s>{" "}
              <span className="font-bold text-[#A3361F]">{off}% off</span>
            </p>
          )}
          <p className="font-display text-3xl tabular-nums">{rupees(price * qty)}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => {
            add(product.slug, size, qty);
            setAdded(true);
          }}
          className="h-12 rounded-full bg-[var(--leaf)] font-semibold text-[var(--rice)] hover:bg-[var(--leaf-deep)]"
        >
          Add to order list
        </button>
        <a
          href={waLink(quickOrderMessage(product.name, size, qty))}
          target="_blank"
          rel="noopener"
          className="flex h-12 items-center justify-center gap-2 rounded-full border-2 border-[#1E8E4E] font-semibold text-[#177240] hover:bg-[#1E8E4E]/5"
        >
          <WaIcon className="size-5" /> Order just this
        </a>
      </div>
      {added && (
        <p className="mt-4 text-sm" role="status">
          Added to your order list.{" "}
          <button type="button" onClick={() => setOpen(true)} className="font-semibold text-[var(--leaf)] underline underline-offset-4">
            View list and send
          </button>
        </p>
      )}
    </div>
  );
}
