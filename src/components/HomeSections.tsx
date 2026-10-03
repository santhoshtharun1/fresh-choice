import Link from "next/link";
import { site } from "@/config/site";
import { getProduct } from "@/data/catalog";
import { ChekkuPress } from "./ChekkuPress";

// Story and buying-help sections for the home page.
// Keep claims factual: FSSAI does not allow cure/prevention claims for foods.

const steps = [
  ["Good seeds, cleaned", "Groundnut, sesame, coconut and other seeds are cleaned before they go into the press."],
  ["Pressed slowly in a wooden chekku", "The wooden press turns slowly, so the oil stays cool and keeps its natural smell, taste and colour."],
  ["Settled naturally, never refined", "The oil is left to settle and then filtered. No heat treatment, no chemicals, no bleaching."],
  ["Bottled and brought to you", "Sealed in bottles and delivered to your door in Bengaluru, or ready to collect at our store."],
];

export function HowItsMade() {
  return (
    <section id="how-its-made" className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
      <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <div className="relative mx-auto w-full max-w-[300px]">
          <div className="absolute inset-x-6 bottom-6 top-16 rounded-full bg-[var(--oil)]/20 blur-3xl" aria-hidden />
          <ChekkuPress className="relative w-full" />
        </div>
        <div>
          <p lang="kn" className="font-kannada text-[var(--wood)]">ಗಾಣದ ಎಣ್ಣೆ ಹೇಗೆ ತಯಾರಾಗುತ್ತದೆ</p>
          <h2 className="mt-1 font-display text-3xl sm:text-4xl">How our oil is made</h2>
          <ol className="mt-8 space-y-6">
            {steps.map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--leaf)] font-display text-lg text-[var(--rice)]">{i + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold">{t}</h3>
                  <p className="mt-1 text-[var(--muted)]">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const guide: { need: string; kannada: string; slugs: string[] }[] = [
  { need: "Daily cooking", kannada: "ದಿನನಿತ್ಯದ ಅಡುಗೆ", slugs: ["groundnut-oil", "sunflower-oil", "safflower-oil"] },
  { need: "Frying", kannada: "ಕರಿಯಲು", slugs: ["groundnut-oil", "sunflower-oil"] },
  { need: "Tempering and pickles", kannada: "ಒಗ್ಗರಣೆ ಮತ್ತು ಉಪ್ಪಿನಕಾಯಿ", slugs: ["sesame-oil", "mustard-oil"] },
  { need: "Hair and oil bath", kannada: "ಕೂದಲು ಮತ್ತು ಎಣ್ಣೆ ಸ್ನಾನ", slugs: ["coconut-oil", "sesame-oil", "castor-oil"] },
  { need: "Pooja and deepam", kannada: "ಪೂಜೆ ಮತ್ತು ದೀಪ", slugs: ["deepam-oil"] },
];

export function OilGuide() {
  return (
    <section id="oil-guide" className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
      <h2 className="font-display text-3xl sm:text-4xl">Which oil for what?</h2>
      <p className="mt-2 text-[var(--muted)]">Not sure where to start? Pick by what you&apos;ll use it for.</p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {guide.map((g) => (
          <li key={g.need} className="rounded-[24px] border border-[var(--line)] bg-white p-5">
            <p className="font-semibold">{g.need}</p>
            <p lang="kn" className="font-kannada text-sm text-[var(--wood)]">{g.kannada}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.slugs.map((s) => {
                const p = getProduct(s)!;
                return (
                  <Link key={s} href={`/product/${s}`} className="rounded-full bg-[var(--card)] px-3 py-1.5 text-sm font-semibold text-[var(--leaf)] hover:bg-[var(--oil-soft)]">
                    {p.name}
                  </Link>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

const rows = [
  ["How it's pressed", "Slowly, in a wooden chekku", "High-speed machines and chemical solvents"],
  ["Heat", "Stays cool while pressing", "Heated to high temperatures"],
  ["Chemicals", "None", "Bleached and deodorised"],
  ["Smell and taste", "Natural aroma of the seed", "Little or no smell or taste"],
  ["Colour", "Natural colour, may settle at the bottom", "Clear and pale"],
];

export function Comparison() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
      <h2 className="font-display text-3xl sm:text-4xl">Wood-pressed vs refined oil</h2>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        Wood-pressed oil costs a little more because the press is slow and gets less oil from the same seeds. Here&apos;s what you get for it.
      </p>
      <div className="mt-8 overflow-hidden rounded-[24px] border border-[var(--line)] bg-white">
        <table className="w-full text-left text-sm sm:text-base">
          <thead>
            <tr className="bg-[var(--card)]">
              <th scope="col" className="w-1/4 p-3 sm:p-4"><span className="sr-only">Compare</span></th>
              <th scope="col" className="p-3 font-display text-[var(--leaf)] sm:p-4 sm:text-lg">{site.name} wood-pressed</th>
              <th scope="col" className="p-3 font-display text-[var(--muted)] sm:p-4 sm:text-lg">Refined oil</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([k, ours, refined]) => (
              <tr key={k} className="border-t border-[var(--line)] align-top">
                <th scope="row" className="p-3 font-semibold sm:p-4">{k}</th>
                <td className="p-3 sm:p-4">{ours}</td>
                <td className="p-3 text-[var(--muted)] sm:p-4">{refined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const faqs = [
  [
    "Why does my oil look cloudy or have sediment at the bottom?",
    "That's normal for unrefined oil. Wood-pressed oil is filtered by settling, not with chemicals, so a little natural sediment can remain. It's safe. Let the bottle stand and pour gently.",
  ],
  ["Why has my coconut oil turned solid?", "Pure coconut oil turns solid below about 24°C. Keep the bottle in a warm place or stand it in warm water for a few minutes and it will melt again."],
  ["How long does the oil last?", "The best-before date is printed on every bottle. Keep the cap closed, store away from sunlight and heat, and use a dry spoon."],
  ["Why is it more expensive than refined oil?", "The wooden press runs slowly and gets less oil from the same seeds. Nothing is added to stretch it, and nothing is taken out by refining."],
  ["Can I cook with castor oil or deepam oil?", "No. Castor oil is for hair and skin, and deepam oil is only for lamps. Neither is for cooking or eating."],
  [
    "How do delivery and payment work?",
    `Within ${site.freeDeliveryRadiusKm} km of our store, our team delivers and you can pay cash on delivery or by UPI. Further away, we send it by Rapido parcel after UPI payment, and you pay the Rapido fare. There is no minimum order.`,
  ],
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 pt-24 sm:px-6">
      <h2 className="font-display text-3xl sm:text-4xl">Questions people ask</h2>
      <div className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {faqs.map(([q, a]) => (
          <details key={q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {q}
              <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full border border-[var(--line)] text-xl leading-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-[var(--muted)]">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
