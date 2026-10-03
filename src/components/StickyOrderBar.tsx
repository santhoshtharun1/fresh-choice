"use client";

import { rupees } from "@/lib/whatsapp";
import { useOrder } from "./OrderProvider";

// Phones only: once something is in the list, keep the total and a "View list" button in reach.
export function StickyOrderBar() {
  const { count, total, open, setOpen } = useOrder();
  if (!count || open) return null;
  return (
    <>
      {/* spacer so the bar never covers the end of the page */}
      <div className="h-20 bg-[var(--leaf-deep)] md:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-[var(--rice)]/95 p-3 backdrop-blur md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-12 w-full items-center justify-between rounded-full bg-[var(--leaf)] pl-5 pr-2 font-semibold text-[var(--rice)]"
        >
          <span className="tabular-nums">
            {count} {count === 1 ? "item" : "items"} · {rupees(total)}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-[var(--oil)] px-4 py-2 text-sm text-[var(--ink)]">
            View list
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      </div>
    </>
  );
}
