import Script from "next/script";
import { site } from "@/config/site";

// Loads Umami only when a website ID is configured, and only counts visits on the live address
// (not localhost or preview links).
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!id) return null;
  return (
    <Script
      src="https://cloud.umami.is/script.js"
      data-website-id={id}
      data-domains={new URL(site.url).host}
      strategy="afterInteractive"
    />
  );
}
