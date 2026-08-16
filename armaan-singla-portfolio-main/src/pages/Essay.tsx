import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Clock } from "lucide-react";
import katex from "katex";
import "katex/dist/katex.min.css";
import {
  getEssay,
  readingTimeMinutes,
  type EssayBlock,
} from "@/data/essays";

const useActiveSection = (ids: string[]) => {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");
  const key = ids.join(",");

  useEffect(() => {
    if (ids.length === 0) return;

    // A section is active once its top scrolls above this line (just below
    // the sticky nav, matching the sections' scroll-mt-24 = 96px offset).
    const OFFSET = 110;

    const update = () => {
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
        if (!el) continue;
        if (el.getBoundingClientRect().top <= OFFSET) {
          current = id;
        } else {
          break;
        }
      }
      setActiveId(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return activeId;
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

const EssayDiagram = ({ variant }: { variant: string }) => {
  if (variant === "critical-strip") return <CriticalStripDiagram />;
  if (variant === "progression") return <ProgressionDiagram />;
  if (variant === "discovery-tree") return <DiscoveryTreeDiagram />;
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
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {block.caption}
          </figcaption>
        </figure>
      );
    case "diagram":
      return (
        <figure className="my-2">
          <EssayDiagram variant={block.variant} />
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">
            {block.caption}
          </figcaption>
        </figure>
      );
    case "sources":
      return (
        <ol className="list-decimal space-y-2 pl-6 text-lg">
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
  const activeId = useActiveSection(ids);

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
    el.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="lg:relative lg:left-1/2 lg:w-[92vw] lg:max-w-5xl lg:-translate-x-1/2">
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
                        ? "font-bold text-primary"
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
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight leading-tight">
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
                <h2 className="text-xl font-bold mb-4">{s.heading}</h2>
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
