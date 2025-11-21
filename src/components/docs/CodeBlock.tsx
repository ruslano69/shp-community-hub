import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export const CodeBlock = ({ code, language = "javascript", className }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative group", className)}>
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          variant="ghost"
          onClick={copyToClipboard}
          className="h-8 w-8 p-0 hover:bg-primary/20"
        >
          {copied ? (
            <Check className="h-4 w-4 text-primary" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
      <div className="rounded-lg bg-muted/50 border border-border/50 overflow-hidden">
        <div className="px-4 py-2 bg-muted/30 border-b border-border/50 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/50" />
            <div className="w-3 h-3 rounded-full bg-secondary/50" />
            <div className="w-3 h-3 rounded-full bg-primary/50" />
          </div>
          <span className="text-xs text-muted-foreground ml-2 font-mono">{language}</span>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm font-mono text-foreground leading-relaxed">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};
