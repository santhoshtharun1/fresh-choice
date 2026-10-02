import type { Metadata } from "next";
import { BulkForm } from "@/components/BulkForm";

export const metadata: Metadata = {
  title: "Bulk and wholesale orders",
  description: "Wood-pressed oils in bulk for restaurants, caterers, hotels and grocery stores in Bengaluru.",
};

export default function Bulk() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 pt-10 sm:px-6 md:grid-cols-[1fr_1.2fr]">
      <div>
        <h1 className="font-display text-4xl leading-tight sm:text-5xl">Bulk and wholesale orders</h1>
        <p className="mt-4 text-lg text-[var(--muted)]">
          For restaurants, hotels, caterers, grocery stores and institutions. Tell us what you need and how often, and we&apos;ll reply on WhatsApp with wholesale rates.
        </p>
        <ul className="mt-8 space-y-3">
          {["Regular weekly or monthly supply", "Large packs at wholesale prices", "GST invoice on request"].map((t) => (
            <li key={t} className="flex gap-3">
              <span className="mt-2 size-2.5 shrink-0 rounded-full bg-[var(--oil)]" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
      </div>
      <BulkForm />
    </div>
  );
}
