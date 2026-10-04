"use client";

import { useState } from "react";
import { site } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { WaIcon } from "./OrderDrawer";
import { orderRef, track } from "@/lib/analytics";

const types = ["Restaurant", "Hotel", "Caterer", "Retail store", "Grocery store", "Institution", "Other"];

export function BulkForm() {
  const [f, setF] = useState({ name: "", business: "", type: types[0], area: "", needs: "", frequency: "Monthly" });
  const [tried, setTried] = useState(false);
  const missing = !f.name.trim() || !f.needs.trim();
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (missing) return;
    const ref = orderRef("FCB");
    const msg = [
      `Hi ${site.name}, I'd like a bulk quote.`,
      "",
      `Name: ${f.name}`,
      f.business && `Business: ${f.business} (${f.type})`,
      !f.business && `Type: ${f.type}`,
      f.area && `Area: ${f.area}`,
      `How often: ${f.frequency}`,
      "",
      `What we need:`,
      f.needs,
      "",
      `Ref: ${ref} (sent from the website)`,
    ].filter((l) => l !== false && l !== undefined).join("\n");
    track("bulk_quote_sent", { ref, type: f.type, frequency: f.frequency });
    window.open(waLink(msg), "_blank", "noopener");
  };

  const input = "w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-2.5";

  return (
    <form onSubmit={submit} className="space-y-4 rounded-[28px] bg-[var(--card)] p-5 sm:p-8" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Your name</span>
          <input className={`${input} ${tried && !f.name.trim() ? "border-[#A3361F]" : ""}`} value={f.name} onChange={set("name")} autoComplete="name" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Business name</span>
          <input className={input} value={f.business} onChange={set("business")} autoComplete="organization" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Type of business</span>
          <select className={input} value={f.type} onChange={set("type")}>
            {types.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Area in Bengaluru</span>
          <input className={input} value={f.area} onChange={set("area")} placeholder="e.g. Jayanagar" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-sm font-semibold">Products and quantities</span>
        <textarea
          rows={4}
          className={`${input} ${tried && !f.needs.trim() ? "border-[#A3361F]" : ""}`}
          value={f.needs}
          onChange={set("needs")}
          placeholder={"e.g. Groundnut oil 5 L × 10\nSesame oil 1 L × 20"}
        />
      </label>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">How often</legend>
        <div className="flex flex-wrap gap-2">
          {["One time", "Weekly", "Monthly"].map((o) => (
            <label key={o} className={`cursor-pointer rounded-full border px-4 py-2 text-sm has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-[var(--oil)] ${f.frequency === o ? "border-[var(--leaf)] bg-[var(--leaf)] text-[var(--rice)]" : "border-[var(--line)] bg-white"}`}>
              <input type="radio" name="freq" className="sr-only" checked={f.frequency === o} onChange={() => setF({ ...f, frequency: o })} />
              {o}
            </label>
          ))}
        </div>
      </fieldset>
      {tried && missing && (
        <p role="alert" className="text-sm font-semibold text-[#A3361F]">Add your name and what you need so we can quote.</p>
      )}
      <button type="submit" className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#1E8E4E] font-semibold text-white hover:bg-[#177240]">
        <WaIcon className="size-5" /> Send quote request on WhatsApp
      </button>
    </form>
  );
}
