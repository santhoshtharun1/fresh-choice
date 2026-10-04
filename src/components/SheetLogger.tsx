"use client";

import { useEffect } from "react";
import { logToSheet } from "@/lib/analytics";

// Logs one "visit" per browser session, and every tap on a tracked button (the ones marked
// data-umami-event for Umami) to the private Google Sheet.
export function SheetLogger() {
  useEffect(() => {
    try {
      if (!sessionStorage.getItem("fc-visit")) {
        sessionStorage.setItem("fc-visit", "1");
        logToSheet("visit");
      }
    } catch {}

    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-umami-event]");
      if (!(el instanceof HTMLElement)) return;
      const data: Record<string, string> = {};
      for (const [k, v] of Object.entries(el.dataset)) {
        if (k.startsWith("umamiEvent") && k !== "umamiEvent" && v) data[k.slice(10).toLowerCase()] = v;
      }
      logToSheet(el.dataset.umamiEvent!, data);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
