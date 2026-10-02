import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { products } from "@/data/catalog";
import { policies } from "@/data/policies";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/shop", "/bulk", ...products.map((p) => `/product/${p.slug}`), ...policies.map((p) => `/policies/${p.slug}`)];
  return paths.map((p) => ({ url: site.url + p }));
}
