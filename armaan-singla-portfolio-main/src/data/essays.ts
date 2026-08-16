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
      "If AI Solves the Riemann Hypothesis, Will Humans Understand the Answer?",
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
            text: "In August 2026, Anthropic announced that a research version of Claude had taken a serious run at the problem. Claude did not solve the Riemann Hypothesis, but it produced a new result that meaningfully improved what mathematicians can rigorously prove about it.",
          },
          {
            type: "p",
            text: "That points to a bigger question. What if solving the Riemann Hypothesis is not the revolutionary part, and the real story is that an AI learned how to attack a problem this hard at all?",
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
          {
            type: "math",
            text: "\\zeta(s) = 1 + \\frac{1}{2^{s}} + \\frac{1}{3^{s}} + \\frac{1}{4^{s}} + \\cdots",
          },
          { type: "p", text: "For example, when s = 2:" },
          {
            type: "math",
            text: "\\zeta(2) = 1 + \\frac14 + \\frac19 + \\frac1{16} + \\cdots",
          },
          {
            type: "p",
            text: "Leonhard Euler found that the same function can be written using nothing but the prime numbers:",
          },
          {
            type: "math",
            text: "\\zeta(s) = \\prod_{p\\ \\text{prime}} \\frac{1}{1 - p^{-s}}",
          },
          {
            type: "p",
            text: "That identity is the bridge between the zeta function and the primes. Information about every prime is baked into it.",
          },
          {
            type: "p",
            text: "Riemann then looked at the inputs where the zeta function, suitably extended, equals zero. These are its zeros. The interesting ones, called the non-trivial zeros, live in the region where the real part of s sits between 0 and 1.",
          },
          {
            type: "p",
            text: "Riemann guessed that all of them lie on a single vertical line, exactly halfway across:",
          },
          { type: "math", text: "\\operatorname{Re}(s) = \\tfrac12" },
          { type: "p", text: "The first non-trivial zero sits at roughly:" },
          { type: "math", text: "s = \\tfrac12 + 14.1347\\,i" },
          {
            type: "p",
            text: "Here is the part people often get backwards. The primes themselves do not sit on the 1/2 line. The zeros of the zeta function do. Because those zeros are tied to the primes through Euler's identity, their positions control how far the real distribution of primes can drift from the pattern mathematicians expect.",
          },
          {
            type: "p",
            text: "So the whole Riemann Hypothesis comes down to one line:",
          },
          {
            type: "p",
            text: "Every non-trivial zero of the zeta function has real part exactly 1/2.",
          },
          {
            type: "diagram",
            variant: "critical-strip",
            caption:
              "Figure 1. Non-trivial zeros lie inside the critical strip 0 < Re(s) < 1. The Riemann Hypothesis says every one of them lies on the critical line Re(s) = 1/2.",
          },
          {
            type: "figure",
            src: "/essays/riemann-hypothesis/complex-plane-trace.png",
            alt: "Complex-plane trace of the output of the Riemann zeta function evaluated along the critical line, ζ(1/2 + it).",
            caption:
              "Figure 2. The path traced by the output ζ(1/2+it) as t changes. The input is already restricted to the critical line Re(s)=1/2. Whenever the curve passes through the origin, the zeta function equals zero.",
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
            text: "Before this work, mathematicians could rigorously prove that at least about 41.6% of the relevant zeros were simple and sat on the critical line. Claude built an argument that pushed the guarantee past two-thirds, with an optimized figure near 67.25%.[^2]",
          },
          {
            type: "p",
            text: "This does not mean Claude solved 67% of the Riemann Hypothesis. The hypothesis says 100% of the non-trivial zeros lie on the 1/2 line. Claude's result raises the floor, the minimum share mathematics can currently guarantee, and says nothing about the odds that the whole statement is true.",
          },
          {
            type: "p",
            text: "By Anthropic's account, Claude worked through roughly 650 dead ends before it found the argument. It then spent about a day and a half coordinating around 60 subagents and produced about 31 million tokens of output.[^1] Those agents wrote code, ran numerical checks, hunted for counterexamples, picked apart each other's reasoning, and dug through existing research.",
          },
          {
            type: "p",
            text: "The result is very recent. Anthropic's mathematicians validated it, Claude produced a formally verifiable proof, and outside experts examined the paper. A claim this fresh will still take time to face the broader scrutiny of the mathematical community, so it is worth holding with the caution any brand new result deserves.[^1]",
          },
          {
            type: "p",
            text: "The argument came from combining existing mathematical ideas in a way that had not previously been known to produce this bound. That detail matters. Claude did not conjure a new field out of nothing. It stood on work built by generations of mathematicians and noticed a connection they had walked past.",
          },
          {
            type: "diagram",
            variant: "progression",
            caption:
              "Figure 3. Claude raised the proven lower bound from about 41.6% to 67.2%. The full Riemann Hypothesis is the separate claim that 100% of non-trivial zeros lie on the critical line.",
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
            text: "Computers have already checked the first 10 trillion relevant zeros and found every one of them exactly where Riemann predicted.[^3] The hypothesis is still open because 10 trillion is a finite number and the zeros continue forever. If Riemann was wrong, the first stray zero could sit unimaginably far past anything a computer has reached.",
          },
          {
            type: "p",
            text: "This is the gap between evidence and proof.",
          },
          {
            type: "p",
            text: "We do not accept that 1 + 1 = 2 because calculators have confirmed it a billion times. The numbers and the addition are defined by axioms and rules of logic, and 1 + 1 = 2 follows necessarily from them. A proof is not repeated observation. It shows why something cannot be otherwise.",
          },
          {
            type: "p",
            text: "Riemann demands that same kind of certainty. A proof has to show that if the zeta function is zero at any non-trivial point, then the real part of that point must be 1/2. Not for the first trillion zeros. For every possible zero, forever.",
          },
        ],
      },
      {
        id: "reaching-100",
        heading: "What If AI Actually Proves It?",
        blocks: [
          {
            type: "p",
            text: "Say an AI eventually produces a valid proof of the full Riemann Hypothesis.",
          },
          {
            type: "p",
            text: "After 167 years the problem is finally closed, and a second question walks in right behind it. Would humans actually understand the proof?",
          },
          {
            type: "p",
            text: "Maybe the AI writes an elegant argument in mathematics we already speak. Mathematicians could read it, simplify it, and eventually absorb it into the textbooks.",
          },
          {
            type: "p",
            text: "A more advanced system could instead invent new abstractions, new notation, and new ways of reasoning built for machines rather than people. A formal proof checker could confirm the argument holds while no single human quite follows why it works.",
          },
          {
            type: "p",
            text: "For centuries, a proof has meant two things at once, certainty and understanding. AI might pull those two apart. We could end up certain that Riemann is true and still unable to explain, in human terms, why.",
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
            text: "A conjecture is something mathematicians strongly believe but cannot yet prove. Cracking one this hard can demand fresh ideas, connections between distant areas, hundreds of failed attempts, counterexamples aimed at your own reasoning, and new abstractions when the old tools run out.",
          },
          {
            type: "p",
            text: "Many of those skills are not specific to number theory.",
          },
          {
            type: "p",
            text: "This is the part I find more interesting than the proof itself. If an AI can do all of that reliably, then Riemann is less a milestone in mathematics and more evidence that a broad scientific ability has arrived. The same kind of system could go looking for better battery materials, new catalysts, sharper climate models, cheaper desalination, new medicines, or progress on fusion.",
          },
          {
            type: "p",
            text: "Solving Riemann would not magically fix global warming or hand us unlimited energy. Real problems drag in physics, engineering, economics, and politics, and no theorem clears those away. What would carry over is the problem-solving ability underneath, not the specific result.",
          },
          {
            type: "p",
            text: "Picture a system that can float hundreds of serious hypotheses, read decades of research, link ideas across fields, run its own experiments and simulations, attack its own conclusions, coordinate specialist agents, and formally verify what it finds.",
          },
          {
            type: "p",
            text: "The breakthrough there is not the machine that solved one famous problem. It is a machine that learned how to work at the edge of human knowledge.",
          },
          {
            type: "diagram",
            variant: "discovery-tree",
            caption:
              "Figure 4. The bigger breakthrough may be the transferable discovery process, not the theorem itself.",
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
            text: "Mathematics would not fall apart, but one of its most famous conjectures would. The shock would be greater if an AI found the counterexample. Generations of mathematicians would have studied a problem dating to 1859, only for a machine to surface a truth the greatest human minds had missed.",
          },
          {
            type: "p",
            text: "A machine like that is no longer just calculating faster than we can. It is turning up truths beyond the current reach of human mathematical reasoning.",
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
            text: "Anthropic's work already hands us an early version of this fight. Its technical paper credits Claude while also naming the humans who posed the problem, guided the work, checked it, formalized it, and wrote it up.[^2]",
          },
          {
            type: "p",
            text: "Future scientific credit may have to be split the same way, and the norms for doing that do not exist yet.",
          },
          {
            type: "p",
            text: "The credit question bothers me for a different reason. Would it feel like a win to watch a problem that survived nearly two centuries of human effort fall to an AI in an afternoon?",
          },
          {
            type: "p",
            text: "I don't know whether that would feel like a human victory. We built the machine, but we would not have made the discovery.",
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
            text: "The larger meaning may have little to do with that number.",
          },
          {
            type: "p",
            text: "For most of history, the frontier of mathematics was capped by two things, what humans could discover and what humans could understand. AI could lift the first cap long before it lifts the second.",
          },
          {
            type: "p",
            text: "If AI does eventually solve Riemann, the real breakthrough may not be the proof. It may be that the system shows a repeatable way to reach answers past the edge of human knowledge.",
          },
          {
            type: "p",
            text: "AI is already beginning to contribute new knowledge, including the result discussed here. A full solution to something like the Riemann Hypothesis would make that shift impossible to dismiss. The question would no longer be whether AI can participate in frontier discovery, but how far beyond the human frontier it can go.",
          },
          {
            type: "p",
            text: "That is the part of this story I find difficult to shake. The day an AI solves Riemann may matter less because one famous conjecture is finally gone, and more because of what the solution says about who is now capable of discovering things humanity cannot. If answers start arriving faster than we can understand them, I am not sure whether we will still be leading the scientific revolution or simply trying to keep up with it.",
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
                label: "Anthropic, Riemann zeta technical paper (PDF)",
                href: "https://www-cdn.anthropic.com/95c246936988e43127bc6b2ceb7077c1dad2d68e.pdf",
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
