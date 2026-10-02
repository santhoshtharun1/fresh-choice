"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";
import { useOrder } from "./OrderProvider";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/#delivery", label: "Delivery" },
  { href: "/bulk", label: "Bulk orders" },
];

export function Header() {
  const { count, setOpen, lastAdded } = useOrder();
  const path = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--rice)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label={`${site.name} home`}>
          <LogoMark className="h-10 w-auto" />
          <span className="flex flex-col">
            <span className="font-display text-[1.35rem] leading-none text-[var(--leaf)]">{site.name}</span>
            <span className="mt-1 text-[0.6rem] font-semibold uppercase leading-none tracking-[0.22em] text-[var(--wood)]">Wood-pressed oils</span>
          </span>
        </Link>
        <nav className="ml-4 hidden items-center gap-6 text-[0.95rem] md:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`underline-offset-8 hover:underline ${path.startsWith(n.href) && n.href !== "/#delivery" ? "underline decoration-2 decoration-[var(--oil)]" : ""}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`ml-auto flex h-10 items-center gap-2 rounded-full border border-[var(--leaf)] pl-4 pr-1.5 text-sm font-semibold text-[var(--leaf)]`}
        >
          Order list
          <span
            key={lastAdded}
            className={`${lastAdded ? "bump " : ""}grid h-7 min-w-7 place-items-center rounded-full px-2 tabular-nums ${count ? "bg-[var(--oil)] text-[var(--ink)]" : "bg-[var(--line)] text-[var(--muted)]"}`}
          >
            {count}
          </span>
        </button>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-2 text-sm md:hidden" aria-label="Main mobile">
        {nav.map((n) => (
          <Link key={n.href} href={n.href} className="rounded-full px-3 py-1.5 hover:bg-[var(--card)]">
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

// Golden oil drop with a sprouting leaf. Same artwork as src/app/icon.svg.
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 44" className={className} aria-hidden>
      <path d="M16 6C16 6 4 21 4 29a12 12 0 0 0 24 0C28 21 16 6 16 6z" fill="#E2A12E" />
      <path d="M16 6C16 6 4 21 4 29a12 12 0 0 0 12 12z" fill="#C98A1B" opacity=".35" />
      <path d="M17 9c2-6 9-8 16-7-1 7-7 11-14 10z" fill="#2E7D3E" />
      <path d="M18.5 10.5c3-3 7-5 11-6" stroke="#E9F2DF" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M9.5 29a6.5 6.5 0 0 0 6.5 6.5" stroke="#fff" strokeOpacity=".75" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
