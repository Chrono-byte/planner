// Simple Deno web server
import { serve } from "https://deno.land/std@0.182.0/http/server.ts";

const port = 8000;
const handler = (request: Request): Response => {
  const body = `Hello from Deno! You requested: ${request.url}`;
  return new Response(body, { status: 200 });
};

console.log(`Server running on http://localhost:${port}`);
await serve(handler, { port });
