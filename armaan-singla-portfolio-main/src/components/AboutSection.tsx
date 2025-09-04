const AboutSection = () => {
  return (
    <section id="about" className="py-12 px-6 bg-muted/20">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold font-mono">
              About Me
            </h2>
            
            <div className="space-y-4 text-muted-foreground text-base leading-relaxed font-mono">
              <p>
                I'm Armaan, a Computer Engineering student at Queen's University with a passion for 
                artificial intelligence, machine learning, robotics, and crypto/finance. I'm drawn to 
                the intersection of software, systems, and real-world problem solving, especially when 
                it involves building things from the ground up.
              </p>
              
              <p>
                I enjoy creating full-stack solutions, experimenting with neural networks, and designing 
                systems that blend efficiency, intelligence, and creativity. Whether it's exploring the 
                logic behind an algorithm or building embedded tools that interface with hardware, I'm 
                always looking for ways to push my learning further.
              </p>
              
              <p>
                This site is a space where I share my projects, interests, and tools I'm building. 
                Feel free to explore and reach out anytime.
              </p>
            </div>

            <div className="space-y-6 pt-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3 font-mono">Technologies I Use</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-foreground font-mono">Languages:</span>
                    <span className="text-muted-foreground text-sm ml-2 font-mono">Python • Java • C++ • JavaScript • TypeScript</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground font-mono">Frameworks & Libraries:</span>
                    <span className="text-muted-foreground text-sm ml-2 font-mono">PyTorch • TensorFlow / JAX • React / Next.js • Node.js</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground font-mono">Tools & Platforms:</span>
                    <span className="text-muted-foreground text-sm ml-2 font-mono">Docker • Git • Linux • VS Code</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground font-mono">Databases & Querying:</span>
                    <span className="text-muted-foreground text-sm ml-2 font-mono">SQL • Firebase • MongoDB</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground font-mono">Cloud & DevOps:</span>
                    <span className="text-muted-foreground text-sm ml-2 font-mono">Google Cloud • GitHub Actions • Vercel</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-foreground mb-3 font-mono">Currently learning</h3>
                <div className="text-muted-foreground text-sm font-mono">
                  Machine Learning • Prompt Engineering • System Design • Cloud Architecture • Full-Stack Development • Blockchain & Smart Contracts • Golf • Chess
                </div>
              </div>
            </div>
          </div>

          {/* Image/Visual Element */}
          <div className="flex justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              {/* Profile photo */}
              <div className="w-80 h-80 rounded-2xl overflow-hidden border border-primary/20 shadow-lg">
                <img 
                  src="/lovable-uploads/68356f25-bbfd-47ce-8c3f-53883b2daca5.png" 
                  alt="Armaan Singla"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/30 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;