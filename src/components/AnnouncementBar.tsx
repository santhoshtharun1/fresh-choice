import { site } from "@/config/site";

// [phone label, wider-screen label] so the bar stays on one line on phones
const points = [
  [`Free delivery in ${site.freeDeliveryRadiusKm} km`, `Free delivery within ${site.freeDeliveryRadiusKm} km`],
  ["COD", "Cash on delivery"],
  ["No minimum order", "No minimum order"],
];

export function AnnouncementBar() {
  return (
    <ul className="flex justify-center gap-x-2 bg-[var(--leaf-deep)] px-3 py-2 text-[0.7rem] font-semibold tracking-wide text-[var(--rice)] sm:gap-x-3 sm:text-sm">
      {points.map(([short, long], i) => (
        <li key={long} className="whitespace-nowrap">
          {i > 0 && <span aria-hidden className="mr-2 text-[var(--oil)] sm:mr-3">·</span>}
          <span className="sm:hidden">{short}</span>
          <span className="hidden sm:inline">{long}</span>
        </li>
      ))}
    </ul>
  );
}
