import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/data/catalog";
import { ShopView } from "@/components/ShopView";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[category]">): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  return { title: c?.name, description: c?.blurb };
}

export default async function CategoryPage({ params }: PageProps<"/shop/[category]">) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  return <ShopView active={c.id} />;
}
