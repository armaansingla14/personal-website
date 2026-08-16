export type EssaySection = {
  id: string;
  heading: string;
  content: string[];
};

export type Essay = {
  slug: string;
  title: string;
  date: string;
  description: string;
  sections: EssaySection[];
};

export const essays: Essay[] = [
  {
    slug: "riemann-hypothesis",
    title:
      "If AI Solves The Riemann Hypothesis, Will Humans Understand the Answer?",
    date: "2026", // placeholder — update with the real publish date
    description:
      "On machine-generated proofs, the limits of human comprehension, and what it means to “know” something we can no longer follow.",
    sections: [
      {
        id: "introduction",
        heading: "Introduction",
        content: [
          "Essay coming soon.",
        ],
      },
    ],
  },
];

export const getEssay = (slug: string): Essay | undefined =>
  essays.find((e) => e.slug === slug);

export const readingTimeMinutes = (essay: Essay): number => {
  const words = essay.sections
    .flatMap((s) => s.content)
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
};
