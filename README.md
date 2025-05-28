# Deno Dev Container for GitHub Codespaces

This repository is configured to work with GitHub Codespaces using a Deno development environment.

## Getting Started

1. Open this repository in GitHub Codespaces
2. The dev container will automatically set up an environment with:
   - Node.js & TypeScript
   - Deno runtime
   - VS Code extensions for Deno development

## Running the Sample Server

To run the included sample server:

```bash
deno run --allow-net server.ts
```

The server will be available at http://localhost:8000

## Features Included

- Deno runtime via GitHub Releases
- TypeScript support out-of-the-box
- VS Code extensions:
  - Deno (official extension)
  - Deno Standard Library Snippets
  - Prettier code formatter

## Development

This environment is ready for Deno development with proper TypeScript integration and linting support.

## Additional Resources

- [Deno Documentation](https://deno.land/manual)
- [Deno Standard Library](https://deno.land/std)
