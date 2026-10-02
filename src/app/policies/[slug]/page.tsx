import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPolicy, policies } from "@/data/policies";

export const dynamicParams = false;

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/policies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: getPolicy(slug)?.title };
}

export default async function PolicyPage({ params }: PageProps<"/policies/[slug]">) {
  const { slug } = await params;
  const p = getPolicy(slug);
  if (!p) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
      <h1 className="font-display text-4xl sm:text-5xl">{p.title}</h1>
      <p className="mt-4 text-lg text-[var(--muted)]">{p.intro}</p>
      {p.sections.map((s) => (
        <section key={s.heading} className="mt-10">
          <h2 className="text-xl font-semibold">{s.heading}</h2>
          {s.body.map((t) => <p key={t} className="mt-3">{t}</p>)}
        </section>
      ))}
    </article>
  );
}
