import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Code, Layers, Zap } from "lucide-react";

export const CodeExamples = () => {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold mb-4">Code Examples</h2>
        <p className="text-lg text-muted-foreground">
          Practical code examples for common SHP implementation scenarios.
        </p>
      </div>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Code className="h-5 w-5 text-primary" />
          Basic REST API Protection
        </h3>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Protect a REST API endpoint with SHP signatures:
          </p>
          <CodeBlock
            language="javascript"
            code={`// server.js
const express = require('express');
const { SHPServer } = require('shp-protocol');

const app = express();
const shp = new SHPServer({
  privateKey: process.env.SHP_PRIVATE_KEY
});

app.get('/api/users/:id', async (req, res) => {
  try {
    // Fetch user data from database
    const user = await db.users.findById(req.params.id);
    
    // Sign the response
    const signed = await shp.sign({
      user,
      requestId: req.id,
      timestamp: Date.now()
    });
    
    res.json(signed);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000);`}
          />
          <CodeBlock
            language="javascript"
            code={`// client.js
import { SHPClient } from 'shp-protocol';

const shp = new SHPClient({
  publicKey: 'SERVER_PUBLIC_KEY'
});

async function fetchUser(userId) {
  const response = await fetch(\`/api/users/\${userId}\`);
  const data = await response.json();
  
  const result = await shp.verify(data);
  
  if (result.isValid) {
    return result.data.user;
  } else {
    throw new Error('Signature verification failed');
  }
}`}
          />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" />
          React Integration
        </h3>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Custom React hook for SHP verification:
          </p>
          <CodeBlock
            language="typescript"
            code={`import { useState, useEffect } from 'react';
import { SHPClient } from 'shp-protocol';

const shp = new SHPClient({
  publicKey: import.meta.env.VITE_SHP_PUBLIC_KEY
});

export function useSecureFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const signedData = await response.json();
        
        const result = await shp.verify(signedData);
        
        if (result.isValid) {
          setData(result.data);
        } else {
          setError('Signature verification failed');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage in component
function UserProfile({ userId }: { userId: string }) {
  const { data, loading, error } = useSecureFetch<User>(
    \`/api/users/\${userId}\`
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{data?.name}</div>;
}`}
          />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          GraphQL Integration
        </h3>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Protect GraphQL responses with SHP:
          </p>
          <CodeBlock
            language="javascript"
            code={`const { ApolloServer } = require('apollo-server-express');
const { SHPServer } = require('shp-protocol');

const shp = new SHPServer({
  privateKey: process.env.SHP_PRIVATE_KEY
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    {
      async requestDidStart() {
        return {
          async willSendResponse({ response }) {
            // Sign GraphQL response
            if (response.data) {
              const signed = await shp.sign(response.data);
              response.extensions = {
                ...response.extensions,
                signature: signed.signature,
                algorithm: signed.algorithm
              };
            }
          }
        };
      }
    }
  ]
});`}
          />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-xl font-semibold mb-4">WebSocket Protection</h3>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Sign WebSocket messages for real-time applications:
          </p>
          <CodeBlock
            language="javascript"
            code={`const WebSocket = require('ws');
const { SHPServer } = require('shp-protocol');

const shp = new SHPServer({
  privateKey: process.env.SHP_PRIVATE_KEY
});

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', async (message) => {
    const data = JSON.parse(message);
    
    // Process message
    const response = await processMessage(data);
    
    // Sign response
    const signed = await shp.sign({
      type: 'response',
      data: response,
      messageId: data.id
    });
    
    ws.send(JSON.stringify(signed));
  });
});`}
          />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-xl font-semibold mb-4">Error Handling</h3>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Robust error handling for verification failures:
          </p>
          <CodeBlock
            language="javascript"
            code={`async function fetchWithVerification(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const signedData = await response.json();
    const result = await shp.verify(signedData);
    
    if (!result.isValid) {
      // Log security incident
      console.error('Signature verification failed:', {
        url,
        error: result.error,
        timestamp: Date.now()
      });
      
      // Notify security monitoring
      await reportSecurityIncident({
        type: 'SIGNATURE_VERIFICATION_FAILED',
        url,
        details: result.error
      });
      
      throw new Error('Content signature verification failed');
    }
    
    // Check timestamp freshness
    if (result.age && result.age > 300) { // 5 minutes
      console.warn('Content signature is stale:', {
        url,
        age: result.age
      });
    }
    
    return result.data;
    
  } catch (error) {
    console.error('Fetch with verification failed:', error);
    throw error;
  }
}`}
          />
        </div>
      </Card>
    </div>
  );
};
