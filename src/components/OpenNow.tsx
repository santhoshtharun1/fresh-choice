"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";

const fmt = (h: number) => `${h % 12 || 12} ${h < 12 ? "AM" : "PM"}`;

// Live "Open now · Closes 9 PM" badge, using Bengaluru time whatever the visitor's timezone.
// Rendered after mount so the static HTML never shows a stale state.
export function OpenNow() {
  const [hour, setHour] = useState<number | null>(null);

  useEffect(() => {
    const tick = () =>
      setHour(Number(new Intl.DateTimeFormat("en-IN", { hour: "numeric", hourCycle: "h23", timeZone: "Asia/Kolkata" }).format(new Date())));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (hour === null) return null;
  const { open, close } = site.openHours;
  const isOpen = hour >= open && hour < close;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm ${isOpen ? "bg-[#1E8E4E]/10 text-[#177240]" : "bg-[#A3361F]/10 text-[#A3361F]"}`}>
      <span aria-hidden className={`size-2 rounded-full ${isOpen ? "bg-[#1E8E4E]" : "bg-[#A3361F]"}`} />
      {isOpen ? `Open now · Closes ${fmt(close)}` : `Closed · Opens ${fmt(open)}`}
    </span>
  );
}
