import type { Metadata } from "next";
import { ShopView } from "@/components/ShopView";

export const metadata: Metadata = { title: "Shop" };

export default function Shop() {
  return <ShopView />;
}
