import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { AlertCircle, CheckCircle2, Download } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const GettingStarted = () => {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold mb-4">Getting Started with SHP</h2>
        <p className="text-lg text-muted-foreground">
          Learn how to integrate the Signed Hypertext Protocol into your web applications 
          to provide cryptographic content integrity verification.
        </p>
      </div>

      <Alert className="border-primary/50 bg-primary/5">
        <AlertCircle className="h-4 w-4 text-primary" />
        <AlertDescription className="text-foreground">
          SHP is designed to be backward-compatible with existing HTTP infrastructure. 
          You can implement it incrementally without breaking existing functionality.
        </AlertDescription>
      </Alert>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" />
          Installation
        </h3>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Install the SHP library using npm or yarn:
          </p>
          <CodeBlock
            language="bash"
            code={`# Using npm
npm install shp-protocol

# Using yarn
yarn add shp-protocol

# Using pnpm
pnpm add shp-protocol`}
          />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-xl font-semibold mb-4">Prerequisites</h3>
        <div className="space-y-3">
          {[
            "Node.js 16.x or higher",
            "Basic understanding of HTTP protocol",
            "Familiarity with cryptographic concepts (signatures, public/private keys)",
            "SSL/TLS setup for your web server (recommended)",
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-xl font-semibold mb-4">Quick Start Example</h3>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Here's a simple example to get you started with SHP on the server side:
          </p>
          <CodeBlock
            language="javascript"
            code={`const { SHPServer } = require('shp-protocol');

// Initialize SHP with your private key
const shp = new SHPServer({
  privateKey: process.env.SHP_PRIVATE_KEY,
  algorithm: 'Ed25519'
});

// Sign your content before sending
app.get('/api/data', async (req, res) => {
  const content = { message: 'Hello, secure world!' };
  const signedResponse = await shp.sign(content);
  
  res.json(signedResponse);
});`}
          />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-xl font-semibold mb-4">Client-Side Verification</h3>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            On the client side, verify the signed content:
          </p>
          <CodeBlock
            language="javascript"
            code={`import { SHPClient } from 'shp-protocol';

// Initialize SHP client with server's public key
const shp = new SHPClient({
  publicKey: 'SERVER_PUBLIC_KEY_HERE'
});

// Fetch and verify signed content
async function fetchSecureData() {
  const response = await fetch('/api/data');
  const signedData = await response.json();
  
  // Verify signature
  const verified = await shp.verify(signedData);
  
  if (verified.isValid) {
    console.log('Content verified:', verified.data);
  } else {
    console.error('Signature verification failed!');
  }
}`}
          />
        </div>
      </Card>

      <div className="pt-4">
        <Alert className="border-cyan/50 bg-cyan/5">
          <CheckCircle2 className="h-4 w-4 text-cyan" />
          <AlertDescription className="text-foreground">
            <strong>Next Steps:</strong> Explore the Implementation Guide to learn about 
            key generation, signature algorithms, and advanced features like header signing 
            and CDN integration.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};
