import { Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">SHP Protocol</span> — Securing web content integrity
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Open source under MIT License
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/ruslano69/SHP" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="font-medium">GitHub</span>
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/30 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SHP Community. Built with modern web technologies.</p>
        </div>
      </div>
    </footer>
  );
};
