"use client";

import { site } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { WaIcon } from "./OrderDrawer";
import { useOrder } from "./OrderProvider";

// Floating "chat with us" button on every page; hidden while the order list is open.
export function WhatsAppFab() {
  const { open, count } = useOrder();
  if (open) return null;
  return (
    <a
      href={waLink(`Hi ${site.name}, I'd like to place an order.`)}
      data-umami-event="whatsapp_chat"
      data-umami-event-from="floating button"
      target="_blank"
      rel="noopener"
      className={`group fixed right-5 z-40 ${count ? "bottom-24 md:bottom-5" : "bottom-5"} flex items-center gap-2`}
    >
      {/* Label beside the button */}
      <span className="rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-[var(--ink)] shadow-lg shadow-black/15 ring-1 ring-[var(--line)]">
        Need help? <span className="text-[#177240]">Chat with us</span>
      </span>
      <span className="grid size-14 place-items-center rounded-full bg-[#1E8E4E] text-white shadow-lg shadow-black/20 transition-transform group-hover:scale-105 group-hover:bg-[#177240]">
        <WaIcon className="size-7" />
      </span>
    </a>
  );
}
