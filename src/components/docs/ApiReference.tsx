import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Book, Code2 } from "lucide-react";

export const ApiReference = () => {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold mb-4">API Reference</h2>
        <p className="text-lg text-muted-foreground">
          Complete API documentation for SHP protocol implementation.
        </p>
      </div>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Book className="h-5 w-5 text-primary" />
          SHPServer Class
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Constructor</h4>
            <CodeBlock
              language="typescript"
              code={`new SHPServer(options: SHPServerOptions)`}
            />
            <div className="mt-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">Options:</p>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-[140px_1fr] gap-2 p-2 rounded bg-muted/30">
                  <code className="text-primary">privateKey</code>
                  <span className="text-muted-foreground">string - Your private signing key</span>
                </div>
                <div className="grid grid-cols-[140px_1fr] gap-2 p-2 rounded bg-muted/30">
                  <code className="text-primary">algorithm</code>
                  <span className="text-muted-foreground">"Ed25519" | "RSA" - Signature algorithm (default: Ed25519)</span>
                </div>
                <div className="grid grid-cols-[140px_1fr] gap-2 p-2 rounded bg-muted/30">
                  <code className="text-primary">includeTimestamp</code>
                  <span className="text-muted-foreground">boolean - Add timestamp to signatures (default: true)</span>
                </div>
                <div className="grid grid-cols-[140px_1fr] gap-2 p-2 rounded bg-muted/30">
                  <code className="text-primary">cdnMode</code>
                  <span className="text-muted-foreground">boolean - Enable CDN compatibility mode (default: false)</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">sign()</h4>
            <CodeBlock
              language="typescript"
              code={`async sign(
  content: any,
  options?: SignOptions
): Promise<SignedResponse>`}
            />
            <p className="text-muted-foreground text-sm mt-2">
              Signs the provided content and returns a signed response object.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">signHeaders()</h4>
            <CodeBlock
              language="typescript"
              code={`async signHeaders(
  headers: Record<string, string>,
  content: any
): Promise<string>`}
            />
            <p className="text-muted-foreground text-sm mt-2">
              Creates a signature for specific HTTP headers along with the content.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Code2 className="h-5 w-5 text-primary" />
          SHPClient Class
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Constructor</h4>
            <CodeBlock
              language="typescript"
              code={`new SHPClient(options: SHPClientOptions)`}
            />
            <div className="mt-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">Options:</p>
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-[140px_1fr] gap-2 p-2 rounded bg-muted/30">
                  <code className="text-primary">publicKey</code>
                  <span className="text-muted-foreground">string - Server's public key for verification</span>
                </div>
                <div className="grid grid-cols-[140px_1fr] gap-2 p-2 rounded bg-muted/30">
                  <code className="text-primary">strictMode</code>
                  <span className="text-muted-foreground">boolean - Reject unsigned content (default: true)</span>
                </div>
                <div className="grid grid-cols-[140px_1fr] gap-2 p-2 rounded bg-muted/30">
                  <code className="text-primary">maxAge</code>
                  <span className="text-muted-foreground">number - Maximum signature age in seconds (default: 300)</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">verify()</h4>
            <CodeBlock
              language="typescript"
              code={`async verify(
  signedData: SignedResponse
): Promise<VerificationResult>`}
            />
            <p className="text-muted-foreground text-sm mt-2">
              Verifies the signature and returns the verification result with extracted content.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">verifyResponse()</h4>
            <CodeBlock
              language="typescript"
              code={`async verifyResponse(
  response: Response
): Promise<VerificationResult>`}
            />
            <p className="text-muted-foreground text-sm mt-2">
              Convenience method to verify a Fetch API Response object directly.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-xl font-semibold mb-4">Type Definitions</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">SignedResponse</h4>
            <CodeBlock
              language="typescript"
              code={`interface SignedResponse {
  content: any;
  signature: string;
  algorithm: string;
  timestamp?: number;
  headers?: Record<string, string>;
}`}
            />
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">VerificationResult</h4>
            <CodeBlock
              language="typescript"
              code={`interface VerificationResult {
  isValid: boolean;
  data: any;
  error?: string;
  timestamp?: number;
  age?: number;
}`}
            />
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">SignOptions</h4>
            <CodeBlock
              language="typescript"
              code={`interface SignOptions {
  includeHeaders?: string[];
  headerSignature?: boolean;
  url?: string;
  method?: string;
  metadata?: Record<string, any>;
}`}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
