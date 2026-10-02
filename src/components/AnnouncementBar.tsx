import { site } from "@/config/site";

export function AnnouncementBar() {
  return (
    <p className="bg-[var(--leaf-deep)] px-4 py-2 text-center text-xs font-semibold tracking-wide text-[var(--rice)] sm:text-sm">
      Free delivery within {site.freeDeliveryRadiusKm} km <span aria-hidden className="mx-1.5 text-[var(--oil)]">·</span> Cash on delivery
      <span aria-hidden className="mx-1.5 text-[var(--oil)]">·</span> No minimum order
    </p>
  );
}
