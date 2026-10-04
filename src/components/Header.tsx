"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";
import { categories, productsIn } from "@/data/catalog";
import { useOrder } from "./OrderProvider";

// Products shown per category in the Shop menu before "View all"
const MENU_LIMIT = 8;

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/#delivery", label: "Delivery" },
  { href: "/#store", label: "Store" },
  { href: "/bulk", label: "Bulk orders" },
];

export function Header() {
  const { count, setOpen, lastAdded } = useOrder();
  const path = usePathname();
  // Shop menu: opens on hover or keyboard focus, closes on click, page change or Esc
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => {
    setMenuOpen(false);
    (document.activeElement as HTMLElement | null)?.blur();
  };
  // eslint-disable-next-line react-hooks/set-state-in-effect -- close the menu after navigating
  useEffect(() => setMenuOpen(false), [path]);

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
          {nav.map((n) => {
            const link = (
              <Link
                key={n.href}
                href={n.href}
                className={`underline-offset-8 hover:underline ${path.startsWith(n.href) && !n.href.startsWith("/#") ? "underline decoration-2 decoration-[var(--oil)]" : ""}`}
              >
                {n.label}
              </Link>
            );
            if (n.href !== "/shop") return link;
            // Shop opens a list of every oil on hover or keyboard focus
            return (
              <div
                key={n.href}
                className="relative flex items-center gap-1"
                onMouseEnter={() => setMenuOpen(true)}
                onMouseLeave={() => setMenuOpen(false)}
                onFocus={() => setMenuOpen(true)}
                onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setMenuOpen(false)}
                onKeyDown={(e) => e.key === "Escape" && closeMenu()}
              >
                {link}
                <svg className={`size-3 transition-transform ${menuOpen ? "rotate-180" : ""}`} viewBox="0 0 12 12" aria-hidden>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" />
                </svg>
                <div className={`absolute left-0 top-full pt-3 transition-opacity ${menuOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
                  {/* One column per category; a new category (e.g. ghee) adds a column automatically */}
                  <div className="rounded-2xl border border-[var(--line)] bg-white p-2 shadow-xl">
                    <div className="flex">
                      {categories.map((c) => {
                        const items = productsIn(c.id);
                        return (
                          <div key={c.id} className="w-64">
                            <Link onClick={closeMenu} href={`/shop/${c.id}`} className="block rounded-xl px-3 py-2 hover:bg-[var(--card)]">
                              <span className="block font-semibold text-[var(--leaf)]">{c.name}</span>
                              <span lang="kn" className="block font-kannada text-xs text-[var(--wood)]">{c.kannada}</span>
                            </Link>
                            <ul className="mt-1 border-t border-[var(--line)] pt-1" aria-label={c.name}>
                              {items.slice(0, MENU_LIMIT).map((p) => (
                                <li key={p.slug}>
                                  <Link onClick={closeMenu} href={`/product/${p.slug}`} className="flex items-baseline justify-between gap-3 rounded-xl px-3 py-1.5 text-[0.95rem] hover:bg-[var(--card)]">
                                    <span>{p.name}</span>
                                    <span lang="kn" className="font-kannada text-xs text-[var(--muted)]">{p.kannada}</span>
                                  </Link>
                                </li>
                              ))}
                              {items.length > MENU_LIMIT && (
                                <li>
                                  <Link onClick={closeMenu} href={`/shop/${c.id}`} className="block rounded-xl px-3 py-1.5 text-sm font-semibold text-[var(--leaf)] hover:bg-[var(--card)]">
                                    View all {items.length} →
                                  </Link>
                                </li>
                              )}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                    {categories.length > 1 && (
                      <Link onClick={closeMenu} href="/shop" className="mt-1 block rounded-xl border-t border-[var(--line)] px-3 py-2 font-semibold text-[var(--leaf)] hover:bg-[var(--card)]">
                        All products
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
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
