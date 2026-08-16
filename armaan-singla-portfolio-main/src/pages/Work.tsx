type Experience = {
  company: string;
  href: string;
  logo: string;
  location?: string;
  role: string;
  period: string;
  description: string;
  highlight?: boolean;
};

const current: Experience[] = [
  {
    company: "AMD",
    href: "https://www.amd.com/",
    logo: "/logos/amd.jpg",
    location: "Markham, ON",
    role: "Software Engineer Intern",
    period: "Summer 2026",
    description:
      "On the Product Security Office (PSO) team, building fuzzing agents that uncover security vulnerabilities. Also building AI agents that automate the team's workflows and take hours of manual work off their plate.",
  },
  {
    company: "Ordinum",
    href: "https://ordinum.org/",
    logo: "/logos/ordinum_ai_logo.jpg",
    role: "Co-Founder",
    period: "2025 — Present",
    description:
      "AI governance and observability platform for auditing, replaying, and controlling AI decisions in production.",
    highlight: true,
  },
];

const previous: Experience[] = [
  {
    company: "Geotab",
    href: "https://www.geotab.com/",
    logo: "/logos/geotab.jpg",
    location: "Toronto, ON",
    role: "Software Engineer Intern",
    period: "Winter 2026",
    description:
      "On the Agent Center of Excellence (Enterprise Data Office): built multi-agent and search-evaluator systems, A2A agent-to-agent orchestration, and ROI validation with Google ADK, Claude, and Gemini.",
  },
  {
    company: "Smith Engineering",
    href: "https://smithengineering.queensu.ca/",
    logo: "/logos/smith.jpg",
    location: "Kingston, ON",
    role: "Teaching Assistant",
    period: "Fall 2025",
    description:
      "Teaching assistant for ELEC 290: Electrical and Computer Engineering Design and Practice, and APSC 141: Introduction to Computer Programming for Engineers.",
  },
  {
    company: "Scotiabank",
    href: "https://www.scotiabank.com/",
    logo: "/logos/scotiabank.png",
    location: "Toronto, ON",
    role: "Data Science Intern",
    period: "Summer 2025",
    description:
      "On the Customer Insights, Data & Analytics (CID&A) team, focusing on AI for enterprise customer strategy.",
  },
  {
    company: "Home Trust Company",
    href: "https://www.hometrust.ca/",
    logo: "/logos/hometrust.jpg",
    location: "Toronto, ON",
    role: "Data Science Intern",
    period: "Summer 2024",
    description:
      "On the Data & AI team, specializing in machine learning, AI, and data engineering pipelines.",
  },
  {
    company: "GuestLogix",
    href: "https://www.guestlogix.com/",
    logo: "/logos/guestlogix.png",
    location: "Toronto, ON",
    role: "Software Engineer Intern",
    period: "Winter 2024",
    description:
      "On the Production Observability & Metrics team, improving reliability and real-time performance in a startup setting.",
  },
];

const Entry = ({ exp }: { exp: Experience }) => (
  <div
    className={
      "flex items-start gap-4" +
      (exp.highlight
        ? " rounded-lg border border-primary/20 bg-primary/5 p-4 -mx-4"
        : "")
    }
  >
    <div className="flex-1">
      <h3 className="text-lg">
        <a
          href={exp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link font-bold"
        >
          {exp.company}
        </a>
        {exp.location && (
          <span className="whitespace-nowrap text-muted-foreground">
            {" "}
            — {exp.location}
          </span>
        )}
      </h3>
      <p className="text-sm font-bold mt-0.5">
        {exp.role}{" "}
        <span className="font-normal text-muted-foreground">
          · {exp.period}
        </span>
      </p>
      <p className="mt-1.5 text-base leading-snug text-foreground/90">
        {exp.description}
      </p>
    </div>
    <img
      src={exp.logo}
      alt={`${exp.company} logo`}
      className="h-12 w-12 shrink-0 rounded-md object-contain"
    />
  </div>
);

const Work = () => {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">Work</h1>

      <h2 className="text-xl font-bold mb-4">Currently</h2>
      <div className="space-y-5">
        {current.map((exp) => (
          <Entry key={exp.company} exp={exp} />
        ))}
      </div>

      <h2 className="text-xl font-bold mt-10 mb-4">Previously</h2>
      <div className="space-y-5">
        {previous.map((exp) => (
          <Entry key={exp.company} exp={exp} />
        ))}
      </div>
    </div>
  );
};

export default Work;
