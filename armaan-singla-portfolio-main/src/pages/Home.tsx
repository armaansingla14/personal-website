import Seo from "@/components/Seo";

const socials = [
  { label: "X", href: "https://x.com/armsingla" },
  { label: "GitHub", href: "https://github.com/armaansingla14" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/armaansingla" },
  { label: "Email", href: "mailto:armaan.singla@outlook.com" },
];

const interests = [
  "Chess",
  "Trading (stocks, crypto, commodities)",
  "Philosophy",
  "AI research (safety/ethics, reasoning, robotics)",
];

const Home = () => {
  return (
    <div className="space-y-5 sm:space-y-6">
      <Seo
        title="Armaan Singla | AI, Agents & Security"
        description="Computer Engineering student at Queen's University working on AI agents, software, security, data, and intelligent systems. Currently at AMD and co-founding Ordinum."
        path="/"
      />
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Armaan Singla</h1>

      <p className="text-base sm:text-lg leading-relaxed">
        I'm a Computer Engineering student at{" "}
        <a
          href="https://www.queensu.ca/"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          Queen's University
        </a>{" "}
        interested in machine learning, agents, data, and security.
      </p>

      <p className="text-base sm:text-lg leading-relaxed">
        Right now, I'm trying to understand not only what I want to build, but what I believe is worth building.
        I'm drawn to questions around intelligence, progress, human agency, and the role technology should play in our lives.
        As I figure out where I want my work to take me, I want to keep questioning the assumptions behind it while staying 
        grounded in my philosophical beliefs and the principles that matter to me.
      </p>

      <p className="text-base sm:text-lg leading-relaxed">
        Currently, I'm at{" "}
        <a
          href="https://www.amd.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          AMD
        </a>{" "}
        as a Software Engineering Intern on the Product Security Office team,
        building fuzzing agents, along with AI agents and software that automate
        the team's workflows.
      </p>

      <div className="pt-2 sm:pt-6 grid grid-cols-2 gap-3 sm:gap-8">
        <div>
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Socials</h2>
          <ul className="space-y-1.5 sm:space-y-3 text-sm sm:text-lg list-disc pl-5">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="link"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Interests</h2>
          <ul className="space-y-1.5 sm:space-y-3 text-sm sm:text-lg list-disc pl-5">
            {interests.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
