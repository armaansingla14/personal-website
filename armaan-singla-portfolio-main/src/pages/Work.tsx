const experiences = [
  {
    company: "AMD",
    href: "https://www.amd.com/",
    location: "Markham, ON",
    role: "Software Engineer Intern",
    period: "Summer 2026",
    description:
      "Building LLM fuzzing agents for hardware and firmware test generation and crash triage, plus JIRA-to-disclosure automation and AI security-notice generation for the Product Security Office.",
  },
  {
    company: "Geotab",
    href: "https://www.geotab.com/",
    location: "Toronto, ON",
    role: "AI Agent Developer Intern",
    period: "Winter 2026",
    description:
      "On the Agent Center of Excellence (Enterprise Data Office): built multi-agent and search-evaluator systems, A2A agent-to-agent orchestration, and ROI validation with Google ADK, Claude, and Gemini.",
  },
  {
    company: "Smith Engineering",
    href: "https://smithengineering.queensu.ca/",
    location: "Kingston, ON",
    role: "Teaching Assistant",
    period: "Fall 2025",
    description:
      "Selected as 1 of 2 undergraduates for ELEC 290; TA for APSC 141, supporting 800+ first-year students.",
  },
  {
    company: "Scotiabank",
    href: "https://www.scotiabank.com/",
    location: "Toronto, ON",
    role: "Data Science Intern",
    period: "Summer 2025",
    description:
      "On the Customer Insights, Data & Analytics (CID&A) team, focusing on AI for enterprise customer strategy.",
  },
  {
    company: "Home Trust Company",
    href: "https://www.hometrust.ca/",
    location: "Toronto, ON",
    role: "Data Science Intern",
    period: "Summer 2024",
    description:
      "On the Data & AI team, specializing in machine learning, AI, and data engineering pipelines.",
  },
  {
    company: "GuestLogix",
    href: "https://www.guestlogix.com/",
    location: "Toronto, ON",
    role: "Software Engineer Intern",
    period: "Winter 2024",
    description:
      "On the Production Observability & Metrics team, improving reliability and real-time performance in a startup setting.",
  },
];

const Work = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight mb-10">Work</h1>

      <div className="space-y-8">
        {experiences.map((exp) => (
          <div key={exp.company}>
            <h2 className="text-xl">
              <a
                href={exp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link font-bold"
              >
                {exp.company}
              </a>{" "}
              <span className="text-muted-foreground">— {exp.location}</span>
            </h2>
            <p className="font-bold mt-1">
              {exp.role}{" "}
              <span className="font-normal text-muted-foreground">
                · {exp.period}
              </span>
            </p>
            <p className="mt-2 leading-relaxed text-foreground/90">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
