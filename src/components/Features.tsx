import { Card } from "@/components/ui/card";
import { Shield, Lock, Zap, Globe, Code, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Content Integrity",
    description: "Cryptographic proof of content authenticity from origin to browser, ensuring what you send is what users receive.",
  },
  {
    icon: Lock,
    title: "End-to-End Security",
    description: "While TLS secures the channel, SHP secures the content itself — protection that survives intermediaries.",
  },
  {
    icon: Zap,
    title: "Zero Performance Impact",
    description: "Designed for efficiency with minimal overhead. Signatures are computed once and verified seamlessly.",
  },
  {
    icon: Globe,
    title: "Backward Compatible",
    description: "Works alongside existing HTTP infrastructure. Servers and clients can adopt SHP incrementally.",
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description: "Simple integration with clear APIs and comprehensive documentation. Get started in minutes.",
  },
  {
    icon: CheckCircle,
    title: "Attack Prevention",
    description: "Protects against compromised CDNs, malicious proxies, and parser ambiguity attacks at the protocol level.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(168,85,247,0.05),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(0,217,255,0.05),transparent_50%)]" />
      
      <div className="container relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why <span className="bg-gradient-primary bg-clip-text text-transparent">SHP</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built for the modern web's security challenges
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-card group backdrop-blur-sm"
            >
              <div className="flex flex-col space-y-4">
                <div className="p-3 rounded-lg bg-gradient-primary w-fit group-hover:shadow-cyan transition-all duration-300">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
