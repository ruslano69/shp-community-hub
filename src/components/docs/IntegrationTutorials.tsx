import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { BookOpen, Cloud, Database, Shield } from "lucide-react";

export const IntegrationTutorials = () => {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold mb-4">Integration Tutorials</h2>
        <p className="text-lg text-muted-foreground">
          Step-by-step tutorials for integrating SHP with popular frameworks and platforms.
        </p>
      </div>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Next.js Integration
        </h3>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Complete guide to adding SHP to a Next.js application:
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Step 1: Install Dependencies</h4>
              <CodeBlock
                language="bash"
                code={`npm install shp-protocol`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Step 2: Configure Environment Variables</h4>
              <CodeBlock
                language="bash"
                code={`# .env.local
SHP_PRIVATE_KEY=your_private_key_here
NEXT_PUBLIC_SHP_PUBLIC_KEY=your_public_key_here`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Step 3: Create API Route with SHP</h4>
              <CodeBlock
                language="typescript"
                code={`// pages/api/data.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { SHPServer } from 'shp-protocol';

const shp = new SHPServer({
  privateKey: process.env.SHP_PRIVATE_KEY!
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = { message: 'Hello from Next.js!' };
  const signed = await shp.sign(data);
  
  res.status(200).json(signed);
}`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Step 4: Verify on Client Side</h4>
              <CodeBlock
                language="typescript"
                code={`// lib/shp-client.ts
import { SHPClient } from 'shp-protocol';

export const shpClient = new SHPClient({
  publicKey: process.env.NEXT_PUBLIC_SHP_PUBLIC_KEY!
});

// components/SecureData.tsx
import { useEffect, useState } from 'react';
import { shpClient } from '@/lib/shp-client';

export function SecureData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/data');
      const signedData = await response.json();
      const verified = await shpClient.verify(signedData);
      
      if (verified.isValid) {
        setData(verified.data);
      }
    }
    fetchData();
  }, []);

  return <div>{data?.message}</div>;
}`}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Cloud className="h-5 w-5 text-primary" />
          CDN Configuration
        </h3>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Configure SHP to work seamlessly with CDN providers:
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Cloudflare Workers</h4>
              <CodeBlock
                language="javascript"
                code={`addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const response = await fetch(request);
  
  // SHP headers are preserved through CDN
  const signature = response.headers.get('X-SHP-Signature');
  const algorithm = response.headers.get('X-SHP-Algorithm');
  
  // Cache signed responses
  const cache = caches.default;
  const cacheKey = new Request(request.url, request);
  
  if (signature) {
    // Cache for 1 hour
    const cachedResponse = new Response(response.body, {
      ...response,
      headers: {
        ...response.headers,
        'Cache-Control': 'public, max-age=3600'
      }
    });
    
    event.waitUntil(cache.put(cacheKey, cachedResponse.clone()));
    return cachedResponse;
  }
  
  return response;
}`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Nginx Configuration</h4>
              <CodeBlock
                language="nginx"
                code={`http {
  # Preserve SHP headers
  proxy_pass_header X-SHP-Signature;
  proxy_pass_header X-SHP-Algorithm;
  proxy_pass_header X-SHP-Timestamp;
  
  server {
    listen 443 ssl;
    
    location /api/ {
      proxy_pass http://backend:3000;
      
      # Don't modify signed content
      proxy_buffering off;
      proxy_cache off;
      
      # Pass through SHP headers
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
  }
}`}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Database Integration
        </h3>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Sign database queries and results for data integrity:
          </p>
          <CodeBlock
            language="javascript"
            code={`const { Pool } = require('pg');
const { SHPServer } = require('shp-protocol');

const pool = new Pool();
const shp = new SHPServer({
  privateKey: process.env.SHP_PRIVATE_KEY
});

async function secureQuery(sql, params) {
  const client = await pool.connect();
  
  try {
    const result = await client.query(sql, params);
    
    // Sign query results
    const signed = await shp.sign({
      query: sql,
      rows: result.rows,
      rowCount: result.rowCount,
      timestamp: Date.now()
    });
    
    return signed;
  } finally {
    client.release();
  }
}

// Usage
app.get('/api/users', async (req, res) => {
  const signed = await secureQuery(
    'SELECT id, name, email FROM users WHERE active = $1',
    [true]
  );
  
  res.json(signed);
});`}
          />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Microservices Architecture
        </h3>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Implement SHP across a microservices architecture:
          </p>
          <CodeBlock
            language="javascript"
            code={`// Shared SHP configuration
const { SHPServer, SHPClient } = require('shp-protocol');

// Each service has its own key pair
const serviceKeys = {
  'auth-service': process.env.AUTH_SERVICE_KEY,
  'user-service': process.env.USER_SERVICE_KEY,
  'payment-service': process.env.PAYMENT_SERVICE_KEY
};

// Service-to-service communication
class SecureServiceClient {
  constructor(serviceName, targetService) {
    this.signer = new SHPServer({
      privateKey: serviceKeys[serviceName]
    });
    
    this.verifier = new SHPClient({
      publicKey: process.env[\`\${targetService.toUpperCase()}_PUBLIC_KEY\`]
    });
  }
  
  async request(url, data) {
    // Sign outgoing request
    const signed = await this.signer.sign({
      data,
      timestamp: Date.now(),
      service: this.serviceName
    });
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signed)
    });
    
    const responseData = await response.json();
    
    // Verify incoming response
    const verified = await this.verifier.verify(responseData);
    
    if (!verified.isValid) {
      throw new Error('Service response verification failed');
    }
    
    return verified.data;
  }
}

// Usage in auth service
const userServiceClient = new SecureServiceClient(
  'auth-service',
  'user-service'
);

const userData = await userServiceClient.request(
  'http://user-service/api/user',
  { userId: '123' }
);`}
          />
        </div>
      </Card>
    </div>
  );
};
