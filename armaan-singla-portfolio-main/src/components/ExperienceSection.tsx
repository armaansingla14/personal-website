const experiences = [
  {
    title: "Teaching Assistant",
    company: "Smith Engineering",
    period: "Fall 2025",
    location: "Kingston, ON",
    description: [
      "Selected as 1 of only 2 undergraduates for ELEC 290: Electrical and Computer Engineering Design and Practice.",
      "Teaching APSC 141: Introduction to Computer Programming for Engineers I, supporting 800+ first-year students."
    ]
  },
  {
    title: "Data Science Intern",
    company: "Scotiabank",
    period: "Summer 2025",
    location: "Toronto, ON",
    description: [
      "On the Customer Insights, Data & Analytics (CID&A) team, focusing on AI for enterprise customer strategy."
    ]
  },
  {
    title: "Data Science Intern",
    company: "Home Trust Company",
    period: "Summer 2024",
    location: "Toronto, ON",
    description: [
      "On the Data & AI Team, specializing in machine learning, AI, and data engineering pipelines."
    ]
  },
  {
    title: "Software Engineering Intern",
    company: "GuestLogix",
    period: "Winter 2024",
    location: "Toronto, ON",
    description: [
      "On the Production Observability & Metrics team, improving reliability and real-time performance in a startup setting."
    ]
  }
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center font-mono">
          Experience
        </h2>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className="relative pl-8 border-l-2 border-primary/30 hover:border-primary/60 transition-colors duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Timeline dot */}
              <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full shadow-lg"></div>
              
              <div className="bg-card border border-border rounded-lg p-6 ml-4 hover:border-primary/30 transition-all duration-300">
                <div className="mb-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-lg font-semibold text-primary font-mono">
                      {exp.company} — {exp.location}
                    </h3>
                  </div>
                  <div className="text-base font-medium text-foreground font-mono">
                    {exp.title} • {exp.period}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {exp.description.map((item, itemIndex) => (
                    <p key={itemIndex} className="text-muted-foreground text-sm leading-relaxed font-mono">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;