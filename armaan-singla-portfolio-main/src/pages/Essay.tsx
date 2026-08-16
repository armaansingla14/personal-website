import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Clock } from "lucide-react";
import { getEssay, readingTimeMinutes } from "@/data/essays";

const useActiveSection = (ids: string[]) => {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    if (ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 }
    );

    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => n !== null);
    nodes.forEach((n) => observer.observe(n));

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
};

const Essay = () => {
  const { slug } = useParams();
  const essay = slug ? getEssay(slug) : undefined;
  const ids = essay ? essay.sections.map((s) => s.id) : [];
  const activeId = useActiveSection(ids);

  if (!essay) {
    return (
      <div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
          Not found
        </h1>
        <p className="text-xl mb-4">That essay doesn't exist.</p>
        <Link to="/writing" className="link text-xl">
          Back to Writing
        </Link>
      </div>
    );
  }

  const minutes = readingTimeMinutes(essay);

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
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
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
                <h2 className="text-2xl font-bold mb-4">{s.heading}</h2>
                <div className="space-y-5 text-xl leading-relaxed text-foreground/90">
                  {s.content.map((para, i) => (
                    <p key={i}>{para}</p>
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
