import Link from "next/link";
import { site } from "@/config/site";
import { categories } from "@/data/catalog";
import { waLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-24 bg-[var(--leaf-deep)] text-[var(--rice)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl">{site.name}</p>
          <p className="mt-3 max-w-sm text-[var(--rice)]/75">
            Official sales and distribution partner: {site.partner}. Serving homes, restaurants and shops across Bengaluru.
          </p>
          <p className="mt-4 text-sm text-[var(--rice)]/60">{site.fssai}</p>
        </div>
        <div>
          <p className="mb-3 font-semibold">Shop</p>
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
          <p className="mb-3 font-semibold">Talk to us</p>
          <ul className="space-y-2 text-[var(--rice)]/80">
            <li><a href={waLink(`Hi ${site.name}, I have a question.`)} className="hover:underline" target="_blank" rel="noopener">WhatsApp {site.phoneDisplay}</a></li>
            <li><a href={`tel:+${site.whatsapp}`} className="hover:underline">Call {site.phoneDisplay}</a></li>
            <li><a href={site.mapsUrl} className="hover:underline" target="_blank" rel="noopener">{site.address}</a></li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-[var(--rice)]/55">
        © {new Date().getFullYear()} {site.partner}
      </div>
    </footer>
  );
}
