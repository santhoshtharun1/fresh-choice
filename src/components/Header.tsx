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
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
          <Drop className="h-7 w-auto" />
          <span className="font-display text-[1.35rem] leading-none text-[var(--leaf)]">{site.name}</span>
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

export function Drop({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" className={className} aria-hidden>
      <path d="M12 1C12 1 2 14 2 21a10 10 0 0 0 20 0C22 14 12 1 12 1z" fill="#E2A12E" />
      <path d="M7 21a5 5 0 0 0 5 5" stroke="#fff" strokeOpacity=".7" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
