import { Github, Linkedin, Mail, FileText, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mono">
          Let's Connect
        </h2>
        <p className="text-base text-muted-foreground mb-12 max-w-2xl mx-auto font-mono">
          I'm always interested in new opportunities, collaborations, and interesting conversations. 
          Feel free to reach out if you'd like to chat!
        </p>

        {/* Primary Contact */}
        <div className="mb-12">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-mono"
          >
            <Mail className="mr-2 h-5 w-5" />
            armaan.singla@outlook.com
          </Button>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-3xl mx-auto mb-12">
          <a 
            href="https://github.com/armaansingla14" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-card/80 transition-all duration-300 group"
          >
            <Github className="h-6 w-6 mb-2 group-hover:text-primary transition-colors" />
            <span className="text-sm text-muted-foreground font-mono">GitHub</span>
          </a>
          
          <a 
            href="https://www.linkedin.com/in/armaansingla/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-card/80 transition-all duration-300 group"
          >
            <Linkedin className="h-6 w-6 mb-2 group-hover:text-primary transition-colors" />
            <span className="text-sm text-muted-foreground font-mono">LinkedIn</span>
          </a>
          
          <a 
            href="https://raw.githubusercontent.com/armaansingla14/Resume/main/Armaan_Singla_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-card/80 transition-all duration-300 group"
          >
            <FileText className="h-6 w-6 mb-2 group-hover:text-primary transition-colors" />
            <span className="text-sm text-muted-foreground font-mono">Resume</span>
          </a>
          
          <a 
            href="https://x.com/armsingla"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-card/80 transition-all duration-300 group"
          >
            <svg className="h-6 w-6 mb-2 group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="text-sm font-medium font-mono">X</span>
          </a>
          
          <a 
            href="http://www.youtube.com/@armaansinglacodes"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-card/80 transition-all duration-300 group"
          >
            <svg className="h-6 w-6 mb-2 group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="text-sm font-medium font-mono">YouTube</span>
          </a>
          
          <a 
            href="https://www.tiktok.com/@armsingla"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-card/80 transition-all duration-300 group"
          >
            <svg className="h-6 w-6 mb-2 group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
            <span className="text-sm font-medium font-mono">TikTok</span>
          </a>
        </div>

        {/* Thank You Message */}
        <div className="text-muted-foreground max-w-2xl mx-auto font-mono">
          <p>
            Thanks for checking out my portfolio. I appreciate your time, and I hope we get the chance to connect or collaborate soon!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;