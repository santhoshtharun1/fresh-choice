import Image from "next/image";
import type { Product } from "@/data/catalog";

// Real photo when we have one (fills its positioned parent), otherwise an illustrated packshot.
export function ProductArt({ product, className = "", sizes = "(min-width: 1024px) 360px, 50vw" }: { product: Product; className?: string; sizes?: string }) {
  if (product.photo) {
    return <Image src={product.photo} alt={product.name} fill sizes={sizes} className="object-cover" />;
  }
  const { kind, fill, tint } = product.art;
  const id = product.slug;

  return (
    <svg viewBox="0 0 200 240" className={className} role="img" aria-label={product.name}>
      <defs>
        <linearGradient id={`g-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor={fill} stopOpacity="0.85" />
          <stop offset="0.45" stopColor={fill} />
          <stop offset="1" stopColor={fill} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="226" rx="58" ry="7" fill="#1A1E19" opacity="0.12" />
      {kind === "bottle" && (
        <g>
          <rect x="86" y="14" width="28" height="16" rx="3" fill="#1F4A2E" />
          <path
            d="M88 30h24v18c0 8 22 16 22 34v130a10 10 0 0 1-10 10H76a10 10 0 0 1-10-10V82c0-18 22-26 22-34z"
            fill="#FFFFFF"
            fillOpacity="0.55"
            stroke="#1A1E19"
            strokeOpacity="0.18"
          />
          <path
            d="M68 96h64v116a8 8 0 0 1-8 8H76a8 8 0 0 1-8-8z"
            fill={`url(#g-${id})`}
          />
          <rect x="74" y="128" width="52" height="56" rx="4" fill="#F5F6F0" />
          <rect x="74" y="128" width="52" height="10" rx="2" fill="#1F4A2E" />
          <circle cx="100" cy="162" r="11" fill={fill} stroke="#1F4A2E" strokeWidth="2" />
          <path d="M78 92v118" stroke="#fff" strokeOpacity="0.55" strokeWidth="5" strokeLinecap="round" />
        </g>
      )}
      {kind === "pouch" && (
        <g>
          <path
            d="M50 30h100l6 186a8 8 0 0 1-8 8H52a8 8 0 0 1-8-8z"
            fill={tint ?? "#1F4A2E"}
          />
          <path d="M50 30h100v12H50z" fill="#000" opacity="0.18" />
          <rect x="66" y="86" width="68" height="78" rx="34" fill="#F5F6F0" />
          <g stroke={fill} strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M76 110c8-6 12 6 20 0s12 6 20 0 10 4 12 2" />
            <path d="M74 122c8-6 12 6 20 0s12 6 20 0 10 4 14 2" />
            <path d="M74 134c8-6 12 6 20 0s12 6 20 0 10 4 14 2" />
            <path d="M78 146c8-6 12 6 20 0s12 6 20 0 8 4 10 2" />
          </g>
          <rect x="62" y="184" width="76" height="8" rx="4" fill="#F5F6F0" opacity="0.8" />
          <rect x="74" y="198" width="52" height="6" rx="3" fill="#F5F6F0" opacity="0.5" />
        </g>
      )}
      {kind === "jar" && (
        <g>
          <rect x="62" y="40" width="76" height="22" rx="5" fill="#6E4B2A" />
          <path
            d="M58 66h84v144a12 12 0 0 1-12 12H70a12 12 0 0 1-12-12z"
            fill="#FFFFFF"
            fillOpacity="0.55"
            stroke="#1A1E19"
            strokeOpacity="0.18"
          />
          <path d="M62 104h76v104a10 10 0 0 1-10 10H72a10 10 0 0 1-10-10z" fill={fill} />
          <rect x="70" y="132" width="60" height="44" rx="4" fill="#F5F6F0" />
          <rect x="70" y="132" width="60" height="9" rx="2" fill="#1F4A2E" />
        </g>
      )}
    </svg>
  );
}
