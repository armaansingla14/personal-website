const socials = [
  { label: "X", href: "https://x.com/armsingla" },
  { label: "GitHub", href: "https://github.com/armaansingla14" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/armaansingla" },
  { label: "Email", href: "mailto:armaan.singla@outlook.com" },
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
        interested in machine learning agents, data, and security.
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
        as a Software Engineering Intern in the Product Security Office, where I
        build LLM fuzzing agents for hardware and firmware testing and automate
        AI agents for the PSO team.
      </p>

      <div className="pt-6">
        <h2 className="text-2xl font-bold mb-3">Socials</h2>
        <ul className="space-y-2 text-xl list-disc pl-6">
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
    </div>
  );
};

export default Home;
