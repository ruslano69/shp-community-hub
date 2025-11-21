import { Card } from "@/components/ui/card";
import { Server, ArrowRight, FileCheck, Globe2 } from "lucide-react";

const steps = [
  {
    icon: Server,
    title: "Origin Server Signs",
    description: "Content is cryptographically signed at the origin server using private keys.",
    color: "primary",
  },
  {
    icon: Globe2,
    title: "Transit & Intermediaries",
    description: "Signed content travels through CDNs, proxies, and other intermediaries.",
    color: "secondary",
  },
  {
    icon: FileCheck,
    title: "Browser Verifies",
    description: "Client verifies signatures before rendering, ensuring content integrity.",
    color: "cyan",
  },
];

export const HowItWorks = () => {
  return (
    <section id="documentation" className="py-24 px-4 bg-gradient-to-b from-background to-card/30">
      <div className="container">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            How It <span className="bg-gradient-primary bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, secure, and transparent content verification
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="p-8 bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 h-full backdrop-blur-sm">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative">
                      <div className={`p-4 rounded-full bg-${step.color}/20 border-2 border-${step.color}`}>
                        <step.icon className={`h-8 w-8 text-${step.color}`} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground">
                        {index + 1}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Card>
                
                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-8 w-8 text-primary animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Technical details */}
          <div className="mt-16 p-8 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-4 text-center">Technical Overview</h3>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                <span className="text-primary font-semibold">SHP (Signed Hypertext Protocol)</span> extends HTTP with cryptographic signatures that travel with content. 
                Unlike TLS which only secures the transport layer, SHP signatures remain bound to the content through the entire delivery chain.
              </p>
              <p className="leading-relaxed">
                This protocol-level approach protects against attacks that exploit the gap between encrypted transmission 
                and final rendering — including compromised CDNs, malicious proxies, and parser ambiguity vulnerabilities.
              </p>
              <div className="flex gap-2 pt-4 flex-wrap justify-center">
                <code className="px-3 py-1 bg-muted rounded text-sm font-mono">HTTP compatible</code>
                <code className="px-3 py-1 bg-muted rounded text-sm font-mono">Ed25519 signatures</code>
                <code className="px-3 py-1 bg-muted rounded text-sm font-mono">Zero trust architecture</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
