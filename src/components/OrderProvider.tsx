"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "@/data/catalog";

export type Line = { slug: string; size: string; qty: number };

type Ctx = {
  lines: Line[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (slug: string, size: string, qty?: number) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  lastAdded: number;
};

const OrderCtx = createContext<Ctx | null>(null);
const KEY = "fc-order-v1";

export const priceOf = (l: Line) =>
  getProduct(l.slug)?.variants.find((v) => v.size === l.size)?.price ?? 0;

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Line[];
        // drop anything no longer in the catalog; hydrating from browser storage is a legit effect
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLines(saved.filter((l) => priceOf(l) > 0 && l.qty > 0));
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, loaded]);

  const add = useCallback((slug: string, size: string, qty = 1) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.slug === slug && l.size === size);
      if (i === -1) return [...prev, { slug, size, qty }];
      const next = [...prev];
      next[i] = { ...next[i], qty: next[i].qty + qty };
      return next;
    });
    setLastAdded(Date.now());
  }, []);

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => !(l.slug === slug && l.size === size))
        : prev.map((l) => (l.slug === slug && l.size === size ? { ...l, qty } : l)),
    );
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      total: lines.reduce((s, l) => s + priceOf(l) * l.qty, 0),
      open,
      setOpen,
      add,
      setQty,
      clear: () => setLines([]),
      lastAdded,
    }),
    [lines, open, add, setQty, lastAdded],
  );

  return <OrderCtx.Provider value={value}>{children}</OrderCtx.Provider>;
}

export function useOrder() {
  const c = useContext(OrderCtx);
  if (!c) throw new Error("useOrder must be inside OrderProvider");
  return c;
}
