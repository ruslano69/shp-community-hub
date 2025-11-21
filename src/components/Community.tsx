import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, MessageSquare, BookOpen, Code2 } from "lucide-react";

const resources = [
  {
    icon: Github,
    title: "GitHub Repository",
    description: "Explore the source code, contribute, and track development progress.",
    link: "https://github.com/ruslano69/SHP",
    linkText: "View Repository",
  },
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Comprehensive guides, API references, and integration examples.",
    link: "https://github.com/ruslano69/SHP#readme",
    linkText: "Read Docs",
  },
  {
    icon: Code2,
    title: "Get Started",
    description: "Quick start guides and tutorials for implementing SHP in your projects.",
    link: "https://github.com/ruslano69/SHP#getting-started",
    linkText: "Start Building",
  },
  {
    icon: MessageSquare,
    title: "Discussions",
    description: "Join the conversation, ask questions, and share your implementations.",
    link: "https://github.com/ruslano69/SHP/discussions",
    linkText: "Join Discussion",
  },
];

export const Community = () => {
  return (
    <section id="community" className="py-24 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple/10 to-transparent rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Join the <span className="bg-gradient-primary bg-clip-text text-transparent">Community</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help shape the future of web security through collaboration and innovation
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {resources.map((resource, index) => (
            <Card 
              key={index}
              className="p-6 bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card backdrop-blur-sm"
            >
              <div className="flex flex-col space-y-4">
                <div className="p-3 rounded-lg bg-primary/10 w-fit">
                  <resource.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {resource.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  {resource.description}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary"
                  asChild
                >
                  <a href={resource.link} target="_blank" rel="noopener noreferrer">
                    {resource.linkText}
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center space-y-6 mt-16">
          <h3 className="text-2xl md:text-3xl font-semibold">
            Ready to contribute?
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            SHP is open-source and welcomes contributions from developers, security researchers, and organizations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 transition-opacity text-primary-foreground font-semibold shadow-cyan"
              asChild
            >
              <a href="https://github.com/ruslano69/SHP" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                Star on GitHub
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-secondary/50 hover:bg-secondary/10 hover:border-secondary font-semibold"
              asChild
            >
              <a href="https://github.com/ruslano69/SHP/fork" target="_blank" rel="noopener noreferrer">
                <Code2 className="mr-2 h-5 w-5" />
                Fork & Contribute
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
