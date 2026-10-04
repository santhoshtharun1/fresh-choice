"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getProduct } from "@/data/catalog";
import { site } from "@/config/site";
import { cleanPhone, orderMessage, rupees, waLink, type Customer } from "@/lib/whatsapp";
import { priceOf, useOrder } from "./OrderProvider";
import { ProductArt } from "./ProductArt";

const empty: Customer = { name: "", phone: "", address: "", delivery: "near", payment: "cod" };

export function OrderDrawer() {
  const { lines, open, setOpen, setQty, total, clear } = useOrder();
  const [c, setC] = useState<Customer>(empty);
  const [tried, setTried] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  const badPhone = !cleanPhone(c.phone);
  const missing = !c.name.trim() || badPhone || !c.address.trim();
  const saved = lines.reduce((s, l) => {
    const v = getProduct(l.slug)?.variants.find((x) => x.size === l.size);
    return s + (v?.mrp && v.mrp > v.price ? (v.mrp - v.price) * l.qty : 0);
  }, 0);

  const send = () => {
    setTried(true);
    if (missing || !lines.length) return;
    const msg = orderMessage(
      lines.map((l) => ({
        name: getProduct(l.slug)!.name,
        size: l.size,
        price: priceOf(l),
        qty: l.qty,
      })),
      c,
    );
    window.open(waLink(msg), "_blank", "noopener");
  };

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-[var(--ink)]/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Your order list"
        tabIndex={-1}
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[var(--rice)] shadow-2xl outline-none transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
          <h2 className="font-display text-2xl">Your order list</h2>
          <button
            onClick={() => setOpen(false)}
            className="grid size-10 place-items-center rounded-full hover:bg-[var(--card)]"
            aria-label="Close order list"
          >
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <p className="font-display text-xl">Nothing here yet</p>
            <p className="text-[var(--muted)]">
              Add oils from the shop. When you&apos;re ready, we&apos;ll send the whole list to us on WhatsApp in one message.
            </p>
            <Link href="/shop" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-[var(--leaf)] px-5 py-2.5 font-semibold text-[var(--rice)]">
              Browse the shop
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <ul className="divide-y divide-[var(--line)] px-5">
              {lines.map((l) => {
                const p = getProduct(l.slug)!;
                return (
                  <li key={l.slug + l.size} className="flex gap-3 py-4">
                    <div className="relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-[var(--card)]">
                      <ProductArt product={p} className="h-14 w-auto" sizes="64px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold leading-tight">{p.name}</p>
                      <p className="text-sm text-[var(--muted)]">
                        {l.size} · {rupees(priceOf(l))}
                      </p>
                      <div className="mt-2 flex items-center gap-1">
                        <Step label={`Remove one ${p.name}`} onClick={() => setQty(l.slug, l.size, l.qty - 1)}>−</Step>
                        <span className="w-8 text-center tabular-nums" aria-live="polite">{l.qty}</span>
                        <Step label={`Add one ${p.name}`} onClick={() => setQty(l.slug, l.size, l.qty + 1)}>+</Step>
                      </div>
                    </div>
                    <p className="font-semibold tabular-nums">{rupees(priceOf(l) * l.qty)}</p>
                  </li>
                );
              })}
            </ul>

            <div className="mx-5 flex items-baseline justify-between border-t-2 border-[var(--ink)] py-3">
              <span className="font-semibold">Estimated total</span>
              <span className="font-display text-2xl tabular-nums">{rupees(total)}</span>
            </div>
            {saved > 0 && (
              <p className="mx-5 mb-2 text-sm font-semibold text-[#177240]">You save {rupees(saved)} on MRP</p>
            )}
            <p className="mx-5 text-xs text-[var(--muted)]">
              Oil prices follow the market. We&apos;ll confirm the final price on WhatsApp before delivery.
            </p>

            <form className="mx-5 mb-6 mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); send(); }}>
              <Field label="Your name" value={c.name} onChange={(v) => setC({ ...c, name: v })} error={tried && !c.name.trim()} autoComplete="name" />
              <Field
                label="Phone number"
                value={c.phone}
                onChange={(v) => setC({ ...c, phone: v })}
                error={tried && badPhone}
                hint={tried && badPhone ? (c.phone.trim() ? "Enter a valid 10-digit mobile number." : "We need this to confirm your order.") : undefined}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="10-digit mobile number"
              />
              <Field label="Delivery address" value={c.address} onChange={(v) => setC({ ...c, address: v })} error={tried && !c.address.trim()} multiline autoComplete="street-address" />
              <fieldset>
                <legend className="mb-2 text-sm font-semibold">How far are you from us?</legend>
                <div className="grid gap-2">
                  <Choice
                    name="delivery"
                    checked={c.delivery === "near"}
                    onChange={() => setC({ ...c, delivery: "near" })}
                    title={`Within ${site.freeDeliveryRadiusKm} km`}
                    note="Free doorstep delivery by our delivery partner. Pay cash on delivery or UPI."
                  />
                  <Choice
                    name="delivery"
                    checked={c.delivery === "far"}
                    onChange={() => setC({ ...c, delivery: "far" })}
                    title={`More than ${site.freeDeliveryRadiusKm} km`}
                    note="Delivered by our delivery partner. Delivery charges are extra and we'll share them on WhatsApp. Pay by UPI before dispatch."
                  />
                </div>
              </fieldset>
              {c.delivery === "near" && (
                <fieldset>
                  <legend className="mb-2 text-sm font-semibold">How will you pay?</legend>
                  <div className="grid gap-2">
                    <Choice
                      name="payment"
                      checked={c.payment === "cod"}
                      onChange={() => setC({ ...c, payment: "cod" })}
                      title="Cash on delivery"
                      note="Pay our delivery person when the order arrives."
                    />
                    <Choice
                      name="payment"
                      checked={c.payment === "upi"}
                      onChange={() => setC({ ...c, payment: "upi" })}
                      title="UPI"
                      note="We'll send UPI details on WhatsApp."
                    />
                  </div>
                </fieldset>
              )}
              {tried && missing && (
                <p className="text-sm font-semibold text-[#A3361F]" role="alert">
                  Add your name, phone number and address so we can confirm and deliver.
                </p>
              )}
              <button type="submit" className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1E8E4E] font-semibold text-white hover:bg-[#177240]">
                <WaIcon className="size-5" /> Send order on WhatsApp
              </button>
              <button type="button" onClick={clear} className="w-full text-sm text-[var(--muted)] underline underline-offset-4">
                Clear list
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function Step({ children, onClick, label }: { children: React.ReactNode; onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className="grid size-8 place-items-center rounded-full border border-[var(--line)] text-lg leading-none hover:bg-[var(--card)]">
      {children}
    </button>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
  multiline?: boolean;
  type?: string;
  inputMode?: "tel" | "text";
  autoComplete?: string;
  placeholder?: string;
  hint?: string;
}) {
  const cls = `w-full rounded-2xl border bg-white px-4 py-2.5 ${props.error ? "border-[#A3361F]" : "border-[var(--line)]"}`;
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold">{props.label}</span>
      {props.multiline ? (
        <textarea rows={3} className={cls} value={props.value} onChange={(e) => props.onChange(e.target.value)} autoComplete={props.autoComplete} />
      ) : (
        <input
          type={props.type ?? "text"}
          inputMode={props.inputMode}
          className={cls}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          autoComplete={props.autoComplete}
          placeholder={props.placeholder}
          aria-invalid={props.error || undefined}
        />
      )}
      {props.hint && <span className="mt-1 block text-sm text-[#A3361F]">{props.hint}</span>}
    </label>
  );
}

function Choice({ name, checked, onChange, title, note }: { name: string; checked: boolean; onChange: () => void; title: string; note: string }) {
  return (
    <label className={`flex cursor-pointer gap-3 rounded-2xl border p-3 ${checked ? "border-[var(--leaf)] bg-[var(--leaf)]/5" : "border-[var(--line)]"}`}>
      <input type="radio" name={name} checked={checked} onChange={onChange} className="mt-1 accent-[var(--leaf)]" />
      <span>
        <span className="block font-semibold">{title}</span>
        <span className="block text-sm text-[var(--muted)]">{note}</span>
      </span>
    </label>
  );
}

export function WaIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1.1 2.7 11.5 11.5 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3z" />
    </svg>
  );
}
