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
    <div className="space-y-6">
      <h1 className="text-5xl font-bold tracking-tight">Armaan Singla</h1>

      <p className="text-xl leading-relaxed">
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

      <p className="text-xl leading-relaxed">
        At this stage of my career, I'm focused on learning as much as I can in
        the areas that genuinely inspire me. I'm still finding clarity on where I
        want to end up, but the goal that guides me is simple: to figure out the
        best way I can leave my mark on the world and humanity, while staying
        true to my philosophical beliefs.
      </p>

      <p className="text-xl leading-relaxed">
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

      <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-3">Socials</h2>
          <ul className="space-y-3 text-xl list-disc pl-6">
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
          <h2 className="text-2xl font-bold mb-3">Interests</h2>
          <ul className="space-y-3 text-xl list-disc pl-6">
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
