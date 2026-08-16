import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Clock } from "lucide-react";
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

// Renders caret exponents like "n^(s)" as real superscripts.
const MathText = ({ text }: { text: string }) => {
  const parts = text.split(/\^\(([^)]*)\)/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <sup key={i}>{part}</sup> : <span key={i}>{part}</span>
      )}
    </>
  );
};

const CriticalStripDiagram = () => (
  <svg
    viewBox="0 0 320 120"
    className="mx-auto w-full max-w-sm"
    role="img"
    aria-label="Number line from 0 to 1 with a dashed critical line at one half holding three zeros."
  >
    <line x1="24" y1="86" x2="296" y2="86" stroke="currentColor" strokeWidth="1.5" />
    {[
      { x: 24, label: "0" },
      { x: 160, label: "1/2" },
      { x: 296, label: "1" },
    ].map((t) => (
      <g key={t.label}>
        <line x1={t.x} y1="80" x2={t.x} y2="92" stroke="currentColor" strokeWidth="1.5" />
        <text x={t.x} y="108" textAnchor="middle" fontSize="12" fill="currentColor">
          {t.label}
        </text>
      </g>
    ))}
    <line
      x1="160"
      y1="14"
      x2="160"
      y2="86"
      stroke="#B31217"
      strokeWidth="1.5"
      strokeDasharray="4 4"
    />
    {[26, 44, 62].map((cy) => (
      <circle key={cy} cx="160" cy={cy} r="3.5" fill="#B31217" />
    ))}
    <text x="160" y="10" textAnchor="middle" fontSize="11" fill="#B31217">
      critical line
    </text>
  </svg>
);

const ProgressionDiagram = () => (
  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
    {[
      { label: "41.6%", note: "old bound", accent: false },
      { label: "~67.2%", note: "Claude", accent: true },
      { label: "100%", note: "full RH", accent: false },
    ].map((step, i) => (
      <div key={step.label} className="flex items-center gap-2 sm:gap-3">
        <div
          className={
            "rounded-md border px-3 py-2 text-center " +
            (step.accent ? "border-primary text-primary" : "border-border")
          }
        >
          <div className="text-base font-bold leading-none">{step.label}</div>
          <div className="mt-1 text-xs text-muted-foreground">{step.note}</div>
        </div>
        {i < 2 && <span className="text-muted-foreground">→</span>}
      </div>
    ))}
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
          {block.text}
        </p>
      );
    case "math":
      return (
        <div className="overflow-x-auto rounded-md border border-border bg-muted/40 px-4 py-3 text-center">
          <span className="font-serif text-lg italic">
            <MathText text={block.text} />
          </span>
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
        <ul className="space-y-2 text-lg">
          {block.items.map((item) => (
            <li key={item.href}>
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
        </ul>
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
