import { Button } from "@/components/ui/button";
import { Github, FileText, Users } from "lucide-react";
import shpLogo from "@/assets/shp-logo.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,217,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/20 rounded-full blur-[128px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/20 rounded-full blur-[128px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
      
      <div className="container relative z-10 px-4 py-20">
        <div className="flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto">
          {/* Logo */}
          <div className="relative animate-float">
            <img 
              src={shpLogo} 
              alt="SHP Logo" 
              className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-[0_0_50px_rgba(0,217,255,0.5)]"
            />
          </div>
          
          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Signed Hypertext Protocol
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light">
              Cryptographic Content Integrity for the Modern Web
            </p>
          </div>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl leading-relaxed">
            SHP is a backward-compatible extension to HTTP that provides cryptographic proof of content integrity 
            from origin server to browser rendering. While TLS secures the communication channel, 
            <span className="text-primary font-semibold"> SHP secures the content itself</span> — protecting against 
            compromised CDNs, malicious proxies, and parser ambiguity attacks.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 transition-opacity text-primary-foreground font-semibold text-lg px-8 shadow-cyan"
              asChild
            >
              <a href="https://github.com/ruslano69/SHP" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </a>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary font-semibold text-lg px-8"
              asChild
            >
              <a href="#documentation">
                <FileText className="mr-2 h-5 w-5" />
                Documentation
              </a>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-secondary/50 text-foreground hover:bg-secondary/10 hover:border-secondary font-semibold text-lg px-8"
              asChild
            >
              <a href="#community">
                <Users className="mr-2 h-5 w-5" />
                Join Community
              </a>
            </Button>
          </div>
          
          {/* Stats or badges */}
          <div className="flex gap-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span>MIT License</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
              <span>Backward Compatible</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
