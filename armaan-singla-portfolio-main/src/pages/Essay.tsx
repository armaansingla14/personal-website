import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Clock } from "lucide-react";
import katex from "katex";
import "katex/dist/katex.min.css";
import {
  getEssay,
  readingTimeMinutes,
  type EssayBlock,
} from "@/data/essays";
import Seo from "@/components/Seo";

const SITE_URL = "https://www.armaansingla.me";

// Per-essay social image; falls back to the site default when unmapped.
const ESSAY_OG_IMAGE: Record<string, string> = {
  "riemann-hypothesis": `${SITE_URL}/og/og-riemann.png`,
  "voice-ai-bottleneck": `${SITE_URL}/og/og-voice.png`,
};

// Offset (px from the viewport top) at which a heading counts as "reached".
const SPY_OFFSET = 120;

const useActiveSection = (ids: string[]) => {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");
  // While a click-driven scroll animates, it "locks" the active id to the
  // target so the highlight lands cleanly instead of flickering through every
  // section it passes over.
  const lockRef = useRef<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    if (ids.length === 0) return;

    let ticking = false;

    const compute = () => {
      ticking = false;
      if (lockRef.current) return;

      const doc = document.documentElement;
      const atBottom =
        window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
      if (atBottom) {
        setActiveId(ids[ids.length - 1]);
        return;
      }

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= SPY_OFFSET) {
          current = id;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { activeId, setActiveId, lockRef };
};

// Renders a LaTeX string as display math via KaTeX.
const Math = ({ latex }: { latex: string }) => {
  const html = katex.renderToString(latex, {
    displayMode: true,
    throwOnError: false,
  });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

// Renders paragraph text, turning inline "[^n]" tokens into superscript
// citation links that jump to the matching numbered source.
const ParagraphText = ({ text }: { text: string }) => {
  const parts = text.split(/\[\^(\d+)\]/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <sup key={i} className="text-xs">
            <a href={`#source-${part}`} className="text-primary">
              {part}
            </a>
          </sup>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

const CriticalStripDiagram = () => (
  <svg
    viewBox="0 0 300 244"
    className="mx-auto w-full max-w-sm text-foreground"
    role="img"
    aria-label="The complex plane with horizontal axis Re(s) and vertical axis Im(s). A shaded critical strip runs between Re(s)=0 and Re(s)=1, with a dashed red critical line at Re(s)=1/2 holding several zeros."
  >
    {/* critical strip band between Re=0 and Re=1 */}
    <rect x="100" y="20" width="100" height="200" fill="#B31217" opacity="0.06" />
    {/* strip boundaries: Re=0 (doubles as the Im axis) and Re=1 */}
    <line x1="100" y1="16" x2="100" y2="224" stroke="currentColor" strokeWidth="1.25" />
    <line x1="200" y1="16" x2="200" y2="224" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    {/* real axis, Im = 0, with arrowhead */}
    <line x1="42" y1="120" x2="268" y2="120" stroke="currentColor" strokeWidth="1.25" />
    <path d="M268 120 l-6 -3 v6 z" fill="currentColor" />
    {/* Im axis arrowhead at top */}
    <path d="M100 16 l-3 6 h6 z" fill="currentColor" />
    {/* critical line Re = 1/2 */}
    <line x1="150" y1="16" x2="150" y2="224" stroke="#B31217" strokeWidth="1.5" strokeDasharray="4 4" />
    {/* zeros on the critical line, symmetric about the real axis */}
    {[48, 74, 96, 150, 176, 202].map((cy) => (
      <circle key={cy} cx="150" cy={cy} r="3.5" fill="#B31217" />
    ))}
    {/* axis ticks */}
    {[
      { x: 100, label: "0" },
      { x: 150, label: "1/2" },
      { x: 200, label: "1" },
    ].map((t) => (
      <text key={t.label} x={t.x} y="135" textAnchor="middle" fontSize="10" fill="currentColor">
        {t.label}
      </text>
    ))}
    {/* axis labels */}
    <text x="262" y="112" textAnchor="end" fontSize="11" fontStyle="italic" fill="currentColor">
      Re(s)
    </text>
    <text x="108" y="26" textAnchor="start" fontSize="11" fontStyle="italic" fill="currentColor">
      Im(s)
    </text>
    {/* region and line labels */}
    <text x="150" y="13" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.6">
      critical strip
    </text>
    <text x="150" y="240" textAnchor="middle" fontSize="10" fill="#B31217">
      critical line
    </text>
  </svg>
);

const Pill = ({
  label,
  note,
  accent = false,
}: {
  label: string;
  note: string;
  accent?: boolean;
}) => (
  <div
    className={
      "rounded-md border px-3 py-2 text-center " +
      (accent ? "border-primary text-primary" : "border-border")
    }
  >
    <div className="text-base font-bold leading-none">{label}</div>
    <div className="mt-1 text-xs text-muted-foreground">{note}</div>
  </div>
);

const ProgressionDiagram = () => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-center">
    <div className="rounded-md border border-border/60 bg-muted/30 p-3">
      <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-muted-foreground">
        Proven lower bound
      </p>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <Pill label="41.6%" note="old bound" />
        <span className="text-muted-foreground">→</span>
        <Pill label="67.2%" note="Claude" accent />
      </div>
    </div>
    <div className="rounded-md border border-border/60 bg-muted/30 p-3">
      <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-muted-foreground">
        Full Riemann Hypothesis
      </p>
      <div className="flex h-[calc(100%-1.75rem)] items-center justify-center">
        <Pill label="100%" note="of non-trivial zeros" />
      </div>
    </div>
  </div>
);

const TreeNode = ({
  children,
  accent = false,
}: {
  children: string;
  accent?: boolean;
}) => (
  <div
    className={
      "rounded-md border px-3 py-1.5 text-center text-sm " +
      (accent ? "border-primary text-primary" : "border-border")
    }
  >
    {children}
  </div>
);

const DiscoveryTreeDiagram = () => (
  <div className="flex flex-col items-center gap-2">
    <TreeNode accent>AI solves a hard conjecture</TreeNode>
    <span className="text-muted-foreground">↓</span>
    <TreeNode>What capability enabled it?</TreeNode>
    <span className="text-muted-foreground">↓</span>
    <div className="grid w-full max-w-md grid-cols-2 gap-2">
      <TreeNode>New math</TreeNode>
      <TreeNode>New materials</TreeNode>
      <TreeNode>Energy</TreeNode>
      <TreeNode>Climate science</TreeNode>
    </div>
    <span className="text-muted-foreground">↓</span>
    <TreeNode accent>A general discovery engine?</TreeNode>
  </div>
);

const Bar = ({
  label,
  display,
  widthPct,
  accent = false,
}: {
  label: string;
  display: string;
  widthPct: number;
  accent?: boolean;
}) => (
  <div>
    <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
      <span className="text-foreground/90">{label}</span>
      <span
        className={
          "shrink-0 font-bold " + (accent ? "text-primary" : "text-foreground")
        }
      >
        {display}
      </span>
    </div>
    <div className="h-3 w-full rounded-full bg-muted">
      <div
        className={"h-3 rounded-full " + (accent ? "bg-primary" : "bg-foreground/40")}
        style={{ width: `${widthPct}%` }}
      />
    </div>
  </div>
);

const WpmBarDiagram = () => (
  <div className="mx-auto w-full max-w-sm space-y-4">
    <Bar label="Typing (smartphone)" display="52 wpm" widthPct={34} />
    <Bar label="Speech" display="153 wpm" widthPct={100} accent />
  </div>
);

// Bar widths are on a log scale (log10 of milliseconds, normalized between the
// fastest and slowest value) since the raw range spans 200ms to 5.4s.
const LatencyBarsDiagram = () => (
  <div className="mx-auto w-full max-w-sm space-y-4">
    <Bar label="Human conversational turn-taking" display="~0–200 ms" widthPct={4} />
    <Bar label="GPT-4o (reported minimum)" display="232 ms" widthPct={5} accent />
    <Bar label="GPT-4o (reported average)" display="320 ms" widthPct={14} accent />
    <Bar label="GPT-3.5 Voice Mode" display="2.8 s" widthPct={80} />
    <Bar label="GPT-4 Voice Mode" display="5.4 s" widthPct={100} />
  </div>
);

const DecisionLoopDiagram = () => (
  <div className="flex flex-col items-center gap-2">
    <TreeNode>Observe</TreeNode>
    <span className="text-muted-foreground">↓</span>
    <TreeNode>Understand</TreeNode>
    <span className="text-muted-foreground">↓</span>
    <TreeNode accent>Ask / Communicate</TreeNode>
    <span className="text-primary">↓</span>
    <TreeNode accent>AI reasons</TreeNode>
    <span className="text-primary">↓</span>
    <TreeNode accent>Feedback</TreeNode>
    <span className="text-muted-foreground">↓</span>
    <TreeNode>Act</TreeNode>
    <p className="mt-1 max-w-[16rem] text-center text-xs text-muted-foreground">
      The interface consumes part of the decision window.
    </p>
  </div>
);

const FlowColumn = ({
  title,
  steps,
  accent = false,
}: {
  title: string;
  steps: string[];
  accent?: boolean;
}) => (
  <div className="rounded-md border border-border/60 bg-muted/30 p-3">
    <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-muted-foreground">
      {title}
    </p>
    <div className="flex flex-col items-center gap-1.5">
      {steps.map((step, i) => (
        <div key={step} className="flex flex-col items-center gap-1.5">
          {i > 0 && <span className="text-muted-foreground">↓</span>}
          <TreeNode accent={accent && i === steps.length - 1}>{step}</TreeNode>
        </div>
      ))}
    </div>
  </div>
);

const CommandVsConversationDiagram = () => (
  <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
    <FlowColumn
      title="Traditional voice command"
      steps={["Human thought", "Remember exact keyword", "Speak command", "System function"]}
    />
    <FlowColumn
      title="LLM conversation"
      steps={["Human thought", "Speak naturally", "Model interprets intent", "System function(s)"]}
      accent
    />
  </div>
);

const CascadeVsMultimodalDiagram = () => (
  <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
    <FlowColumn
      title="Legacy cascade"
      steps={["Voice", "Speech-to-text", "Text LLM", "Text response", "Text-to-speech", "Voice"]}
    />
    <FlowColumn
      title="Native multimodal"
      steps={["Voice + vision + sensors + context", "Multimodal model", "Voice + action"]}
      accent
    />
  </div>
);

const StageBox = ({
  title,
  items,
  accent = false,
}: {
  title: string;
  items?: string[];
  accent?: boolean;
}) => (
  <div
    className={
      "rounded-md border px-4 py-2.5 text-center " +
      (accent ? "border-primary" : "border-border")
    }
  >
    <div className={"text-sm font-bold " + (accent ? "text-primary" : "text-foreground")}>
      {title}
    </div>
    {items && items.length > 0 && (
      <div className="mt-1 text-xs text-muted-foreground">{items.join(" · ")}</div>
    )}
  </div>
);

const HumanoidLoopDiagram = () => (
  <div className="flex flex-col items-center gap-2">
    <StageBox title="Human" items={["speech", "gesture", "gaze", "context"]} />
    <span className="text-muted-foreground">↓</span>
    <StageBox
      title="Robot / physical AI"
      items={["perception", "reasoning", "action", "feedback"]}
      accent
    />
    <span className="text-muted-foreground">↓</span>
    <StageBox title="Shared physical task" />
  </div>
);

const EssayDiagram = ({ variant }: { variant: string }) => {
  if (variant === "critical-strip") return <CriticalStripDiagram />;
  if (variant === "progression") return <ProgressionDiagram />;
  if (variant === "discovery-tree") return <DiscoveryTreeDiagram />;
  if (variant === "wpm-bar") return <WpmBarDiagram />;
  if (variant === "latency-bars") return <LatencyBarsDiagram />;
  if (variant === "decision-loop") return <DecisionLoopDiagram />;
  if (variant === "command-vs-conversation") return <CommandVsConversationDiagram />;
  if (variant === "cascade-vs-multimodal") return <CascadeVsMultimodalDiagram />;
  if (variant === "humanoid-loop") return <HumanoidLoopDiagram />;
  return null;
};

const Block = ({ block }: { block: EssayBlock }) => {
  switch (block.type) {
    case "p":
      return (
        <p className="text-lg leading-relaxed text-foreground/90">
          <ParagraphText text={block.text} />
        </p>
      );
    case "math":
      return (
        <div className="overflow-x-auto rounded-md border border-border bg-muted/40 px-4 py-3 text-center">
          <Math latex={block.text} />
        </div>
      );
    case "figure":
      return (
        <figure className="my-2">
          <img
            src={block.src}
            alt={block.alt}
            className="mx-auto h-auto w-full max-w-md rounded-md border border-border"
          />
          <figcaption className="mt-2 text-center text-[15px] sm:text-sm text-muted-foreground">
            {block.caption}
          </figcaption>
        </figure>
      );
    case "diagram":
      return (
        <figure className="my-2">
          <EssayDiagram variant={block.variant} />
          <figcaption className="mt-3 text-center text-[15px] sm:text-sm text-muted-foreground">
            {block.caption}
          </figcaption>
        </figure>
      );
    case "sources":
      return (
        <ol className="list-decimal space-y-2 pl-6 text-base sm:text-lg">
          {block.items.map((item, i) => (
            <li key={item.href} id={`source-${i + 1}`} className="scroll-mt-24">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      );
    default:
      return null;
  }
};

const Essay = () => {
  const { slug } = useParams();
  const essay = slug ? getEssay(slug) : undefined;
  const ids = essay ? essay.sections.map((s) => s.id) : [];
  const { activeId, setActiveId, lockRef } = useActiveSection(ids);
  const unlockRef = useRef<number | null>(null);

  if (!essay) {
    return (
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5 sm:mb-6">
          Not found
        </h1>
        <p className="text-base sm:text-lg mb-4">That essay doesn't exist.</p>
        <Link to="/writing" className="link text-base sm:text-lg">
          Back to Writing
        </Link>
      </div>
    );
  }

  const minutes = readingTimeMinutes(essay);
  const essayPath = `/writing/${essay.slug}`;
  const essayImage = ESSAY_OG_IMAGE[essay.slug] ?? `${SITE_URL}/og/og-default.png`;
  const essayJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: essay.title,
    description: essay.description,
    author: { "@type": "Person", name: "Armaan Singla", url: SITE_URL },
    datePublished: essay.isoDate,
    image: essayImage,
    mainEntityOfPage: `${SITE_URL}${essayPath}`,
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Own the highlight for the duration of the scroll so it moves straight to
    // the clicked item instead of stuttering through the ones in between.
    lockRef.current = id;
    setActiveId(id);
    history.replaceState(null, "", `#${id}`);

    el.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });

    // Release the spy lock once the scroll has settled.
    if (unlockRef.current) window.clearTimeout(unlockRef.current);
    unlockRef.current = window.setTimeout(
      () => {
        lockRef.current = null;
      },
      reduceMotion ? 0 : 800
    );
  };

  return (
    <div className="lg:relative lg:left-1/2 lg:w-[92vw] lg:max-w-5xl lg:-translate-x-1/2">
      <Seo
        title={`${essay.title} | Armaan Singla`}
        description={essay.description}
        path={essayPath}
        type="article"
        image={essayImage}
        jsonLd={essayJsonLd}
      />
      <div className="lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12">
        <aside className="hidden lg:block">
          <nav className="sticky top-24">
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Index
            </p>
            <ul className="space-y-2">
              {essay.sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => handleNavClick(e, s.id)}
                    className={
                      "text-sm transition-colors " +
                      (activeId === s.id
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground")
                    }
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight leading-tight">
            {essay.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-muted-foreground">
            <span>by Armaan Singla</span>
            <span aria-hidden="true">·</span>
            <span>{essay.date}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {minutes} min read
            </span>
          </div>

          <div className="mt-10 space-y-12">
            {essay.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-2xl sm:text-xl font-bold mb-4">{s.heading}</h2>
                <div className="space-y-5">
                  {s.blocks.map((block, i) => (
                    <Block key={i} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16">
            <Link to="/writing" className="link">
              ← Back to Writing
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Essay;
