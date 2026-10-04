import Link from "next/link";
import { site } from "@/config/site";
import { categories } from "@/data/catalog";
import { policies } from "@/data/policies";
import { waLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-24 bg-[var(--leaf-deep)] text-[var(--rice)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.9fr_1.2fr]">
        <div>
          <p className="font-display text-3xl">{site.name}</p>
          <p className="mt-3 max-w-sm text-[var(--rice)]/75">
            Official sales and distribution partner: {site.partner}. Serving homes, restaurants and shops across Bengaluru.
          </p>
          <p className="mt-4 text-sm text-[var(--rice)]/60">{site.fssai}</p>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
            <span className="text-[var(--rice)]/60">We accept</span>
            {["Cash on delivery", "UPI"].map((m) => (
              <span key={m} className="rounded-full border border-white/20 px-3 py-1 text-[var(--rice)]/85">{m}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-3 font-semibold">Shop</p>
          {/* One link per category, so new ranges (ghee etc.) appear here automatically */}
          <ul className="space-y-2 text-[var(--rice)]/80">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/shop/${c.id}`} className="hover:underline">{c.name}</Link>
              </li>
            ))}
            <li><Link href="/bulk" className="hover:underline">Bulk and wholesale</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-semibold">Help</p>
          <ul className="space-y-2 text-[var(--rice)]/80">
            {[
              ["/#how-its-made", "How it's made"],
              ["/#oil-guide", "Which oil for what?"],
              ["/#faq", "Questions"],
              ["/#delivery", "Delivery and payment"],
              ["/#store", "Visit our store"],
            ].map(([href, label]) => (
              <li key={href}><Link href={href} className="hover:underline">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 font-semibold">Talk to us</p>
          <ul className="space-y-2 text-[var(--rice)]/80">
            <li><a href={waLink(`Hi ${site.name}, I'd like to place an order.`)} data-umami-event="whatsapp_chat" data-umami-event-from="footer" className="hover:underline" target="_blank" rel="noopener">WhatsApp {site.phoneDisplay}</a></li>
            <li><a href={`tel:+${site.whatsapp}`} data-umami-event="call_click" data-umami-event-from="footer" className="hover:underline">Call {site.phoneDisplay}</a></li>
            <li><a href={site.mapsUrl} className="hover:underline" target="_blank" rel="noopener">{site.address}</a></li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-6 text-sm sm:px-6 md:flex-row md:justify-between">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[var(--rice)]/70">
            {policies.map((p) => (
              <li key={p.slug}><Link href={`/policies/${p.slug}`} className="hover:underline">{p.title}</Link></li>
            ))}
          </ul>
          <p className="text-[var(--rice)]/55">© {new Date().getFullYear()} {site.name} · {site.partner}</p>
        </div>
      </div>
      {/* Developer credit: own line, with room below for the floating WhatsApp button on phones */}
      <p className="border-t border-white/10 px-4 pb-24 pt-4 text-center text-xs text-[var(--rice)]/50 sm:pb-4">
        Website by{" "}
        {site.credit.url ? (
          <a href={site.credit.url} target="_blank" rel="noopener" className="font-semibold text-[var(--rice)]/75 underline-offset-4 hover:underline">
            {site.credit.name}
          </a>
        ) : (
          <span className="font-semibold text-[var(--rice)]/75">{site.credit.name}</span>
        )}
      </p>
    </footer>
  );
}
