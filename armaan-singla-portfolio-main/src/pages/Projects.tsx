import { Youtube } from "lucide-react";

type Project = {
  title: string;
  href: string;
  description: string;
  video?: string;
};

const projects: Project[] = [
  {
    title: "Veritas",
    href: "https://github.com/armaansingla14/Veritas",
    video: "https://youtu.be/sJOm-jkIVQA",
    description:
      "AI civic platform for the City of Kingston: answers municipal questions with cited sources, detects issues from photos, and anchors every interaction to Solana so answers are verifiably untampered. Won Best Use of Solana at QHacks 2026.",
  },
  {
    title: "PR Pilot",
    href: "https://github.com/armaansingla14/pr-pilot",
    video: "https://youtu.be/LS-mIn2PFcI",
    description:
      "Full-stack ML app that scores a git diff's risk with a trained RandomForest and returns an actionable review checklist in milliseconds — 0.84 AUC, ~6 ms inference, automated CI/CD.",
  },
  {
    title: "AI Boss Fight",
    href: "https://github.com/armaansingla14/AI-Boss-Fight",
    description:
      "2D Unity combat game whose boss isn't scripted but evolves: SharpNEAT neuroevolution breeds and mutates neural networks across generations to read and counter the player.",
  },
  {
    title: "Robot Armor Detection (YOLOv5)",
    href: "https://github.com/armaansingla14/Robot-Detection-yolov5",
    description:
      "Real-time computer-vision system training YOLOv5 to detect robot armor plates for RoboMaster, with a label-preserving augmentation pipeline over a ~1,200-image dataset.",
  },
  {
    title: "Walking vs. Jumping Classifier",
    href: "https://github.com/armaansingla14/Walking-Running-292",
    video: "https://youtu.be/yd7NedTEr9g",
    description:
      "End-to-end ML pipeline classifying human motion from phone accelerometer data — HDF5 storage, signal preprocessing, feature engineering, and a PyQt5 desktop app that labels new recordings.",
  },
  {
    title: "LangChain RAG Agent Demo",
    href: "https://github.com/armaansingla14/langchain-ai-agent-demo",
    description:
      "A compact from-scratch retrieval-augmented generation agent over local docs that grounds every answer in retrieved context and refuses to answer when the source doesn't cover it.",
  },
  {
    title: "Rate My Landlord",
    href: "https://github.com/armaansingla14/elec376-landlord-app",
    description:
      "Full-stack rental-review platform (ELEC 376) to browse landlords, submit ratings, and view a scored leaderboard; built backend data handling, leaderboard sorting, and review-fetching logic.",
  },
  {
    title: "Will You Be My Valentine?",
    href: "https://github.com/armaansingla14/Valentines-day-Project",
    description:
      "Playful single-page Next.js app: a typed state machine walks visitors through a mini-game, a dodging “No” button, and an animated date itinerary — entirely client-side.",
  },
  {
    title: "Automated Fluid Dispenser",
    href: "https://drive.google.com/file/d/1BfrOQ0cYX_pa87A0vaD3lFjXwmDfPdLx/view?usp=sharing",
    video: "https://drive.google.com/file/d/1BfrOQ0cYX_pa87A0vaD3lFjXwmDfPdLx/view?usp=sharing",
    description:
      "Pharmaceutical-grade automated fluid and powder dispenser: SolidWorks/AutoCAD design, 3D-printed and CNC-milled parts, and Arduino motor control.",
  },
];

const Projects = () => {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-10">
        Projects
      </h1>

      <div className="space-y-7">
        {projects.map((p) => (
          <div key={p.title}>
            <h2 className="flex items-center gap-2 text-2xl">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link font-bold"
              >
                {p.title}
              </a>
              {p.video && (
                <a
                  href={p.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch the ${p.title} demo video`}
                  title="Watch demo video"
                  className="text-primary transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
                >
                  <Youtube className="h-5 w-5" aria-hidden="true" />
                </a>
              )}
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
