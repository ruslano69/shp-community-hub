import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { GettingStarted } from "@/components/docs/GettingStarted";
import { ImplementationGuide } from "@/components/docs/ImplementationGuide";
import { ApiReference } from "@/components/docs/ApiReference";
import { CodeExamples } from "@/components/docs/CodeExamples";
import { IntegrationTutorials } from "@/components/docs/IntegrationTutorials";

const Documentation = () => {
  const [activeTab, setActiveTab] = useState("getting-started");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-semibold">
                <span className="bg-gradient-primary bg-clip-text text-transparent">SHP</span> Documentation
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2 bg-card/50 p-2 h-auto">
            <TabsTrigger 
              value="getting-started"
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
            >
              Getting Started
            </TabsTrigger>
            <TabsTrigger 
              value="implementation"
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
            >
              Implementation
            </TabsTrigger>
            <TabsTrigger 
              value="api-reference"
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
            >
              API Reference
            </TabsTrigger>
            <TabsTrigger 
              value="examples"
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
            >
              Code Examples
            </TabsTrigger>
            <TabsTrigger 
              value="tutorials"
              className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
            >
              Tutorials
            </TabsTrigger>
          </TabsList>

          <TabsContent value="getting-started" className="space-y-6 animate-fade-in">
            <GettingStarted />
          </TabsContent>

          <TabsContent value="implementation" className="space-y-6 animate-fade-in">
            <ImplementationGuide />
          </TabsContent>

          <TabsContent value="api-reference" className="space-y-6 animate-fade-in">
            <ApiReference />
          </TabsContent>

          <TabsContent value="examples" className="space-y-6 animate-fade-in">
            <CodeExamples />
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-6 animate-fade-in">
            <IntegrationTutorials />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documentation;
