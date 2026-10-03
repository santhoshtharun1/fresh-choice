import Link from "next/link";
import { site } from "@/config/site";
import { waLink } from "@/lib/whatsapp";
import { WaIcon } from "@/components/OrderDrawer";
import { LogoMark } from "@/components/Header";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center sm:py-28">
      <LogoMark className="h-20 w-auto" />
      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--wood)]">Page not found</p>
      <h1 className="mt-2 font-display text-4xl sm:text-5xl">This bottle seems to be empty</h1>
      <p className="mt-4 text-lg text-[var(--muted)]">The page you&apos;re looking for has moved or doesn&apos;t exist. Our oils are just a tap away.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className="rounded-full bg-[var(--leaf)] px-6 py-3 font-semibold text-[var(--rice)] hover:bg-[var(--leaf-deep)]">
          Browse our oils
        </Link>
        <a
          href={waLink(`Hi ${site.name}, I need some help.`)}
          target="_blank"
          rel="noopener"
          className="flex items-center gap-2 rounded-full border border-[#1E8E4E] px-6 py-3 font-semibold text-[#177240] hover:bg-[#1E8E4E]/5"
        >
          <WaIcon className="size-5" /> Ask us on WhatsApp
        </a>
      </div>
    </div>
  );
}
