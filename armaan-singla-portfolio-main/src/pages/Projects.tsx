const projects = [
  {
    title: "Ordinum",
    href: "https://ordinum.org/",
    description:
      "AI governance and observability platform for auditing, replaying, and controlling AI decisions in production, capturing prompts, outputs, tool calls, and execution context as replayable, audit-ready timelines.",
  },
  {
    title: "Veritas",
    href: "https://github.com/armaansingla14/Veritas",
    description:
      "AI-powered civic platform for Kingston: answers municipal questions with cited sources, detects issues from photos, and logs interactions to Solana. Won Best Use of Solana at QHacks 2026.",
  },
  {
    title: "PR Pilot",
    href: "https://github.com/armaansingla14/pr-pilot",
    description:
      "Full-stack ML app predicting pull-request risk with a RandomForest, reaching 0.84 AUC and 6 ms inference latency, with automated CI/CD.",
  },
  {
    title: "Landlord Review App",
    href: "https://github.com/armaansingla14/elec376-landlord-app",
    description:
      "Full-stack housing review platform built for ELEC 376 to browse landlords, submit reviews, and view rating summaries through a clean Vite + React interface.",
  },
  {
    title: "LangChain AI Agent Demo",
    href: "https://github.com/armaansingla14/langchain-ai-agent-demo",
    description:
      "A demo AI agent built with LangChain, showcasing tool use and multi-step reasoning.",
  },
  {
    title: "Valentine's Day Project",
    href: "https://github.com/armaansingla14/Valentines-day-Project",
    description: "A playful Next.js web app built for Valentine's Day.",
  },
  {
    title: "AI Boss Fight",
    href: "https://github.com/armaansingla14/AI-Boss-Fight",
    description:
      "Unity game using evolutionary neural networks (SharpNEAT) to train an AI boss that adapts to player behavior over generations.",
  },
  {
    title: "Robot Detection (YOLOv5)",
    href: "https://github.com/armaansingla14/Robot-Detection-yolov5",
    description:
      "Computer-vision system for autonomous robot detection using custom-trained and optimized YOLOv5.",
  },
  {
    title: "Walking-Running Classifier",
    href: "https://github.com/armaansingla14/Walking-Running-292",
    description:
      "ML project classifying human motion from smartphone accelerometer data, with a PyQt5 desktop application.",
  },
  {
    title: "Automated Fluid Dispenser",
    href: "https://drive.google.com/file/d/1BfrOQ0cYX_pa87A0vaD3lFjXwmDfPdLx/view?usp=sharing",
    description:
      "Pharmaceutical-grade automated fluid and powder dispenser: SolidWorks/AutoCAD design, 3D-printed and CNC-milled parts, and Arduino-based motor control.",
  },
];

const Projects = () => {
  return (
    <div>
      <h1 className="text-5xl font-bold tracking-tight mb-10">Projects</h1>

      <div className="space-y-7">
        {projects.map((p) => (
          <div key={p.title}>
            <h2 className="text-2xl">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link font-bold"
              >
                {p.title}
              </a>
            </h2>
            <p className="mt-1 text-xl leading-relaxed text-foreground/90">
              {p.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
