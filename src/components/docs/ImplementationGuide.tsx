import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Key, Shield, Lock, Server } from "lucide-react";

export const ImplementationGuide = () => {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold mb-4">Implementation Guide</h2>
        <p className="text-lg text-muted-foreground">
          Comprehensive guide for implementing SHP in production environments with security best practices.
        </p>
      </div>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Key className="h-5 w-5 text-primary" />
          Key Generation
        </h3>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Generate a secure Ed25519 key pair for signing your content:
          </p>
          <CodeBlock
            language="javascript"
            code={`const { generateKeyPair } = require('shp-protocol');

// Generate a new key pair
const { publicKey, privateKey } = await generateKeyPair();

// Store private key securely (e.g., in environment variables)
console.log('Public Key:', publicKey);
console.log('Private Key:', privateKey); // KEEP THIS SECRET!

// Export keys in PEM format
const pemPublic = await exportPublicKey(publicKey);
const pemPrivate = await exportPrivateKey(privateKey);`}
          />
          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
            <p className="text-sm text-destructive font-semibold">⚠️ Security Warning</p>
            <p className="text-sm text-muted-foreground mt-2">
              Never commit private keys to version control. Always use environment variables or 
              secure key management systems (e.g., AWS KMS, HashiCorp Vault).
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Server className="h-5 w-5 text-primary" />
          Server-Side Implementation
        </h3>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Implement SHP signing in your Express.js application:
          </p>
          <CodeBlock
            language="javascript"
            code={`const express = require('express');
const { SHPServer } = require('shp-protocol');

const app = express();
const shp = new SHPServer({
  privateKey: process.env.SHP_PRIVATE_KEY,
  algorithm: 'Ed25519',
  includeTimestamp: true // Prevents replay attacks
});

// Middleware to sign all responses
app.use(async (req, res, next) => {
  const originalJson = res.json;
  
  res.json = async function(data) {
    const signedData = await shp.sign({
      content: data,
      url: req.originalUrl,
      method: req.method
    });
    
    // Add signature headers
    res.set('X-SHP-Signature', signedData.signature);
    res.set('X-SHP-Algorithm', 'Ed25519');
    res.set('X-SHP-Timestamp', signedData.timestamp);
    
    originalJson.call(this, signedData);
  };
  
  next();
});

app.get('/api/secure-data', (req, res) => {
  res.json({ message: 'This content is signed!' });
});`}
          />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Advanced Features
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2 text-foreground">Header Signing</h4>
            <p className="text-muted-foreground mb-3">
              Sign specific HTTP headers to prevent header manipulation:
            </p>
            <CodeBlock
              language="javascript"
              code={`const signedResponse = await shp.sign(content, {
  includeHeaders: ['content-type', 'cache-control', 'etag'],
  headerSignature: true
});`}
            />
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-foreground">CDN Integration</h4>
            <p className="text-muted-foreground mb-3">
              Configure SHP to work with CDNs and edge caching:
            </p>
            <CodeBlock
              language="javascript"
              code={`const shp = new SHPServer({
  privateKey: process.env.SHP_PRIVATE_KEY,
  cdnMode: true,
  cacheTTL: 3600, // 1 hour
  allowCDNProxy: ['cloudflare.com', 'fastly.com']
});`}
            />
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-foreground">Signature Rotation</h4>
            <p className="text-muted-foreground mb-3">
              Implement key rotation for enhanced security:
            </p>
            <CodeBlock
              language="javascript"
              code={`const shp = new SHPServer({
  keys: [
    { id: 'key-2024-01', key: process.env.SHP_KEY_CURRENT, active: true },
    { id: 'key-2023-12', key: process.env.SHP_KEY_OLD, active: false }
  ],
  keyRotationDays: 90
});`}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Lock className="h-5 w-5 text-primary" />
          Security Best Practices
        </h3>
        <div className="space-y-3">
          {[
            "Always use HTTPS/TLS in conjunction with SHP",
            "Rotate signing keys regularly (recommended: every 90 days)",
            "Implement rate limiting to prevent DoS attacks on verification endpoints",
            "Log signature verification failures for security monitoring",
            "Use timestamp validation to prevent replay attacks",
            "Store private keys in hardware security modules (HSM) for production",
            "Implement key revocation mechanisms for compromised keys",
            "Monitor signature verification success rates in production"
          ].map((practice, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">{index + 1}</span>
              </div>
              <span className="text-muted-foreground">{practice}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
