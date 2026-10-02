"use client";

import { site } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { WaIcon } from "./OrderDrawer";
import { useOrder } from "./OrderProvider";

// Floating "chat with us" button on every page; hidden while the order list is open.
export function WhatsAppFab() {
  const { open } = useOrder();
  if (open) return null;
  return (
    <a
      href={waLink(`Hi ${site.name}, I have a question.`)}
      target="_blank"
      rel="noopener"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#1E8E4E] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 hover:bg-[#177240]"
    >
      <WaIcon className="size-7" />
    </a>
  );
}
