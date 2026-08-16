export type EssayBlock =
  | { type: "p"; text: string }
  | { type: "math"; text: string }
  | { type: "figure"; src: string; alt: string; caption: string }
  | {
      type: "diagram";
      variant: "critical-strip" | "progression" | "discovery-tree";
      caption: string;
    }
  | { type: "sources"; items: { label: string; href: string }[] };

export type EssaySection = {
  id: string;
  heading: string;
  blocks: EssayBlock[];
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
    date: "August 15, 2026, 11:54 AM",
    description:
      "What Anthropic's Riemann result actually says, why a machine-checked proof might outrun human understanding, and what it would mean for AI to start creating knowledge instead of repeating it.",
    sections: [
      {
        id: "introduction",
        heading: "Introduction",
        blocks: [
          {
            type: "p",
            text: "For 167 years, mathematicians have chipped away at one of the most famous problems in their field. The Riemann Hypothesis, proposed by Bernhard Riemann in 1859, is a short statement with enormous consequences. It is about prime numbers, the building blocks of the whole numbers, and a strange function that seems to encode their hidden structure.",
          },
          {
            type: "p",
            text: "In August 2026, Anthropic said that a research version of Claude had taken a serious run at the problem. Claude did not solve the Riemann Hypothesis, but it found a new result that meaningfully improved what mathematicians can rigorously prove about it.",
          },
          {
            type: "p",
            text: "That raises a bigger question. What if solving the Riemann Hypothesis is not the revolutionary part? What if the real story is that an AI learned how to attack a problem this hard at all?",
          },
        ],
      },
      {
        id: "what-is-rh",
        heading: "What Is the Riemann Hypothesis?",
        blocks: [
          {
            type: "p",
            text: "Prime numbers are numbers like 2, 3, 5, 7, 11, 13, and 17. Each one is divisible only by 1 and itself. They behave like the atoms of arithmetic, because every positive whole number can be built, in exactly one way, out of primes.",
          },
          {
            type: "p",
            text: "The mystery is that primes do not arrive on a schedule. Sometimes they cluster close together, and sometimes there are long stretches with none at all.",
          },
          {
            type: "p",
            text: "Riemann studied their distribution through the zeta function:",
          },
          { type: "math", text: "ζ(s) = 1 + 1/2^(s) + 1/3^(s) + 1/4^(s) + ⋯" },
          { type: "p", text: "For example, when s = 2:" },
          { type: "math", text: "ζ(2) = 1 + 1/4 + 1/9 + 1/16 + ⋯" },
          {
            type: "p",
            text: "Leonhard Euler found that the same function can also be written using nothing but prime numbers:",
          },
          {
            type: "math",
            text: "ζ(s) = product over primes p of 1 / (1 − p^(−s))",
          },
          {
            type: "p",
            text: "That identity is why the zeta function matters for primes. Information about every prime is baked into it.",
          },
          {
            type: "figure",
            src: "/essays/riemann-hypothesis/zeta-series.png",
            alt: "The Riemann zeta function written as the infinite series ζ(s) = Σ 1/n^s.",
            caption:
              "Figure 1. The Riemann zeta function in its simplest series form.",
          },
          {
            type: "p",
            text: "Riemann then looked at the inputs where the extended zeta function equals zero. These are its zeros. The interesting ones, the non-trivial zeros, live in a region where the real part of s sits between 0 and 1.",
          },
          {
            type: "p",
            text: "Riemann guessed that all of them lie on a single vertical line, exactly halfway across:",
          },
          { type: "math", text: "Re(s) = 1/2" },
          { type: "p", text: "The first non-trivial zero is roughly:" },
          { type: "math", text: "s = 1/2 + 14.1347 i" },
          {
            type: "p",
            text: "The primes themselves do not sit on the 1/2 line. The zeros of the zeta function do. Because those zeros are tied to the primes, their positions tell mathematicians how far the real distribution of primes can wander from the pattern we expect.",
          },
          {
            type: "p",
            text: "So the Riemann Hypothesis comes down to one line:",
          },
          {
            type: "p",
            text: "Every non-trivial zero of the zeta function has real part exactly 1/2.",
          },
          {
            type: "figure",
            src: "/essays/riemann-hypothesis/critical-line-polar.png",
            alt: "A polar plot of the Riemann zeta function evaluated along the critical line ζ(1/2 + it).",
            caption:
              "Figure 2. A polar plot of the zeta function along the critical line. Each time the curve passes through the origin, the function is zero.",
          },
          {
            type: "diagram",
            variant: "critical-strip",
            caption:
              "Figure 3. The critical strip runs from 0 to 1. Riemann's guess is that every non-trivial zero lands on the line at 1/2.",
          },
        ],
      },
      {
        id: "claudes-breakthrough",
        heading: "Claude's Breakthrough",
        blocks: [
          {
            type: "p",
            text: "On August 10, 2026, Anthropic said an unreleased research version of Claude had been pointed at the Riemann Hypothesis and told to genuinely try.",
          },
          {
            type: "p",
            text: "Before this work, mathematicians could rigorously prove that at least about 41.6% of the relevant zeros were simple and sat on the critical line. Claude built an argument that pushed the guarantee past two-thirds, with an optimized figure near 67.25%.",
          },
          {
            type: "p",
            text: "This does not mean Claude solved 67% of the Riemann Hypothesis. The hypothesis says 100% of the non-trivial zeros lie on the 1/2 line. Claude's result raises the floor, the minimum share that mathematics can currently guarantee, not the odds that the whole thing is true.",
          },
          {
            type: "p",
            text: "By Anthropic's account, Claude worked through roughly 650 dead ends first. It then spent about a day and a half coordinating around 60 subagents and produced tens of millions of tokens of output. Those agents wrote code, tested ideas, hunted for counterexamples, picked apart each other's reasoning, and dug through existing research.",
          },
          {
            type: "p",
            text: "The result came from combining known mathematics in a way nobody had tried. That detail matters. Claude did not conjure a new field out of nothing. It stood on work built by generations of mathematicians and spotted a connection they had walked past.",
          },
          {
            type: "diagram",
            variant: "progression",
            caption:
              "Figure 4. 67.2% is not two-thirds of a proof. It is a lower bound on the share of zeros now proven to lie on the critical line.",
          },
        ],
      },
      {
        id: "why-not-check",
        heading: "Why Not Just Check Every Zero?",
        blocks: [
          { type: "p", text: "Because there are infinitely many of them." },
          {
            type: "p",
            text: "A computer can check billions, trillions, or far more. Every zero it tests might land on 1/2, and there is still another one waiting past the edge of what it checked. If the hypothesis were false, the first counterexample could sit unimaginably far out.",
          },
          {
            type: "p",
            text: "This is the gap between evidence and proof.",
          },
          {
            type: "p",
            text: "We do not accept that 1 + 1 = 2 because calculators have confirmed it a billion times. In formal mathematics, the numbers and the addition are defined by axioms and rules of logic, and 1 + 1 = 2 follows necessarily from them.",
          },
          {
            type: "p",
            text: "Riemann demands the same kind of certainty. A proof has to show that if the zeta function is zero at any non-trivial point, then the real part of that point must be 1/2. Not for the first trillion zeros. For every possible zero, forever.",
          },
        ],
      },
      {
        id: "reaching-100",
        heading: "What If AI Reaches 100%?",
        blocks: [
          {
            type: "p",
            text: "Say an AI eventually produces a valid proof of the full Riemann Hypothesis.",
          },
          {
            type: "p",
            text: "After 167 years, the problem is finally closed. And a second question walks in right behind it: would humans actually understand the proof?",
          },
          {
            type: "p",
            text: "Maybe the AI writes an elegant argument in mathematics we already speak. Mathematicians could read it, simplify it, and eventually get it.",
          },
          {
            type: "p",
            text: "But a future system could also invent new abstractions, new notation, and new ways of reasoning tuned for machines rather than people. Then we reach a strange place where a formal proof checker confirms the argument is correct while no single human quite follows why it works.",
          },
          {
            type: "p",
            text: "For centuries, a proof has meant two things at once: certainty and understanding. AI might pull those two apart.",
          },
        ],
      },
      {
        id: "proof-not-the-point",
        heading: "What If the Proof Isn't the Point?",
        blocks: [
          {
            type: "p",
            text: "This might be the more unsettling possibility.",
          },
          {
            type: "p",
            text: "What if an AI proving the Riemann Hypothesis matters less than the method it had to invent to get there?",
          },
          {
            type: "p",
            text: "The Riemann Hypothesis is a conjecture, something mathematicians strongly believe but cannot prove. Cracking a conjecture this hard can take fresh ideas, connections between distant areas, hundreds of failed attempts, counterexamples aimed at your own reasoning, and new abstractions when the old tools run out.",
          },
          {
            type: "p",
            text: "None of those skills are specific to number theory.",
          },
          {
            type: "p",
            text: "If an AI can do that reliably, Riemann becomes evidence that a much broader scientific ability has shown up. The same kind of system might go looking for better battery materials, new catalysts, sharper climate models, cheaper desalination, new medicines, or progress on fusion.",
          },
          {
            type: "p",
            text: "Solving Riemann would not magically fix global warming or hand us unlimited energy. Real problems drag in physics, engineering, economics, and politics. The point is the transferable problem-solving ability underneath, not the theorem.",
          },
          {
            type: "p",
            text: "Picture a system that can float hundreds of serious hypotheses, read decades of research, link ideas across fields, run its own experiments and simulations, attack its own conclusions, coordinate specialist agents, and formally verify what it finds.",
          },
          {
            type: "p",
            text: "The breakthrough there is not the machine that solved Riemann. It is a machine that learned how to solve problems at the edge of human knowledge.",
          },
          {
            type: "p",
            text: "Riemann might end up mattering less as an answer and more as a signal that AI has crossed from repeating human knowledge into making new knowledge.",
          },
          {
            type: "diagram",
            variant: "discovery-tree",
            caption:
              "Figure 5. The bigger breakthrough may be the transferable discovery process, not the theorem itself.",
          },
        ],
      },
      {
        id: "proving-it-wrong",
        heading: "What If AI Proves Riemann Wrong?",
        blocks: [
          {
            type: "p",
            text: "Nothing guarantees Riemann was right.",
          },
          {
            type: "p",
            text: "A single legitimate non-trivial zero with a real part other than 1/2 would disprove the hypothesis on the spot.",
          },
          {
            type: "p",
            text: "Mathematics would not fall apart, but one of its most famous expectations would. The cultural shock would be larger if an AI found the counterexample. Generations of mathematicians would have studied a problem dating to 1859, only for a machine to surface a truth the greatest human minds had missed.",
          },
          {
            type: "p",
            text: "At that point, computers are no longer just calculating faster than us. They are turning up truths beyond the current reach of human mathematical reasoning.",
          },
        ],
      },
      {
        id: "who-gets-credit",
        heading: "Who Gets the Credit?",
        blocks: [
          {
            type: "p",
            text: "If an AI proves the Riemann Hypothesis, who solved it?",
          },
          {
            type: "p",
            text: "The mathematician who typed the prompt? The researchers who built the system? The company that owns the model? The generations of mathematicians whose work the AI learned from? Or the AI that produced the decisive argument?",
          },
          {
            type: "p",
            text: "Anthropic's work already hands us an early version of this fight. Its technical paper credits Claude while also naming the humans who posed the problem, guided the work, checked it, formalized it, and wrote it up.",
          },
          {
            type: "p",
            text: "Future scientific credit may have to be split the same way.",
          },
          {
            type: "p",
            text: "There is an emotional question too. Would it feel like a win to watch a problem that survived nearly two centuries of human effort fall to an AI in an afternoon?",
          },
          {
            type: "p",
            text: "Maybe we feel triumphant, because humans built the machine. Or maybe we feel sidelined, because the final act of discovery no longer belonged to us.",
          },
        ],
      },
      {
        id: "end-or-new-era",
        heading: "The End, or a New Era?",
        blocks: [
          {
            type: "p",
            text: "Claude has not solved the Riemann Hypothesis, and it has not solved 67% of it. It produced a stronger theorem about the share of zeros that mathematics can prove sit where Riemann predicted.",
          },
          {
            type: "p",
            text: "But the larger meaning may have little to do with that number.",
          },
          {
            type: "p",
            text: "For most of history, the frontier of mathematics was capped by what humans could discover and understand. AI could lift the first cap long before it lifts the second.",
          },
          {
            type: "p",
            text: "If AI does eventually solve Riemann, the real breakthrough may not be the proof. It may be that the system shows a repeatable way to reach answers past the edge of human knowledge.",
          },
          {
            type: "p",
            text: "Before that point, AI mostly learned from knowledge humans had already created. After it, AI may increasingly create knowledge humans do not yet have.",
          },
          {
            type: "p",
            text: "The central question may stop being whether AI can solve the Riemann Hypothesis, and become this: if AI learns to solve problems humanity cannot, what else will it learn to solve?",
          },
          {
            type: "p",
            text: "And if the answers start arriving faster than we can understand them, will we still be leading the scientific revolution, or just watching it happen?",
          },
        ],
      },
      {
        id: "sources",
        heading: "Sources",
        blocks: [
          {
            type: "sources",
            items: [
              {
                label: "Anthropic, \"Claude and the Riemann zeta function\"",
                href: "https://www.anthropic.com/research/riemann-zeta",
              },
              {
                label: "Clay Mathematics Institute, \"Riemann Hypothesis\"",
                href: "https://www.claymath.org/millennium/riemann-hypothesis/",
              },
              {
                label: "Clay Mathematics Institute, \"Millennium Prize Problems\"",
                href: "https://www.claymath.org/millennium-problems/",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const getEssay = (slug: string): Essay | undefined =>
  essays.find((e) => e.slug === slug);

export const readingTimeMinutes = (essay: Essay): number => {
  const text = essay.sections
    .flatMap((s) => s.blocks)
    .flatMap((b) => {
      if (b.type === "p" || b.type === "math") return [b.text];
      if (b.type === "figure") return [b.caption];
      if (b.type === "diagram") return [b.caption];
      if (b.type === "sources") return b.items.map((i) => i.label);
      return [];
    })
    .join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
};
