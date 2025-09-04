import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: "PR Pilot",
    description: "Full-stack ML application that predicts pull request risk levels using RandomForest with 0.84 AUC and 6ms inference latency",
    tags: ["Python", "FastAPI", "scikit-learn", "React", "Tailwind"],
    github: "https://github.com/armaansingla14/pr-pilot",
    demo: "https://youtu.be/LS-mIn2PFcI",
    status: "Live"
  },
  {
    title: "AI Boss Fight",
    description: "Unity game with evolutionary neural networks using SharpNEAT to train an AI boss that adapts to player behavior over generations",
    tags: ["C#", "Unity", "SharpNEAT", "Evolutionary AI"],
    github: "https://github.com/armaansingla14/AI-Boss-Fight",
    demo: "#",
    status: "Live"
  },
  {
    title: "Robot Detection YOLOv5",
    description: "Computer vision system for autonomous robot detection using YOLOv5 object detection with custom training and optimization",
    tags: ["Python", "YOLOv5", "PyTorch", "Computer Vision"],
    github: "https://github.com/armaansingla14/Robot-Detection-yolov5",
    demo: "#",
    status: "Live"
  },
  {
    title: "Walking-Running Classifier",
    description: "Machine learning project classifying human motion using smartphone accelerometer data with PyQt5 desktop application interface",
    tags: ["Python", "scikit-learn", "PyQt5", "Signal Processing"],
    github: "https://github.com/armaansingla14/Walking-Running-292",
    demo: "https://youtu.be/yd7NedTEr9g",
    status: "Live"
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center font-mono">
          A few projects I'm working on...
        </h2>
        <p className="text-muted-foreground text-center mb-16 text-base font-mono">
          Building tools and experiences that make a difference
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="project-card group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors font-mono">
                    {project.title}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-mono ${
                    project.status === 'Live' 
                      ? 'bg-primary/20 text-primary' 
                      : project.status === 'Beta'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => window.open(project.github, '_blank')}
                  >
                    <Github className="h-4 w-4" />
                  </Button>
                  {project.demo !== "#" && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => window.open(project.demo, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4 leading-relaxed text-base font-mono">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-md font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;