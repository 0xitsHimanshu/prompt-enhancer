# 👨‍💻 Developer Guide

## Getting Started

### Prerequisites

- **Node.js**: 18+ (recommended: latest LTS)
- **Bun**: 1.2+ (package manager and runtime)
- **Git**: Latest version
- **VS Code**: Latest version (recommended)
- **PostgreSQL**: 14+ (for database)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/prompt-enhancer.git
cd prompt-enhancer

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start development servers
bun run dev
```

## Project Structure

```
prompt-enhancer/
├── apps/
│   ├── server/          # Next.js API server
│   ├── web/            # Next.js web client
│   ├── vscode/         # VS Code extension
│   └── browser/        # Browser extension
├── packages/           # Shared packages (future)
├── .github/           # GitHub Actions workflows
├── docs/              # Documentation
└── scripts/           # Build and utility scripts
```

## Development Workflow

### 1. Backend Development

**Start the server:**
```bash
cd apps/server
bun run dev
```

**Available scripts:**
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run type-check` - Run TypeScript checks
- `bun run lint` - Run ESLint
- `bun run db:push` - Push schema to database
- `bun run db:studio` - Open Prisma Studio

**Key files:**
- `src/app/api/enhance/route.ts` - Main API endpoint
- `src/lib/ai.ts` - AI provider integration
- `src/lib/trpc.ts` - tRPC configuration
- `prisma/schema/schema.prisma` - Database schema

### 2. Web Client Development

**Start the web client:**
```bash
cd apps/web
bun run dev
```

**Available scripts:**
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run type-check` - Run TypeScript checks
- `bun run lint` - Run ESLint

**Key files:**
- `src/app/page.tsx` - Main page component
- `src/components/` - React components
- `src/utils/trpc.ts` - tRPC client configuration

### 3. VS Code Extension Development

**Build the extension:**
```bash
cd apps/vscode
bun install
bun run build
```

**Test the extension:**
```bash
# Package for testing
bun run package

# Install in VS Code
code --install-extension prompt-enhancer-vscode-0.0.1.vsix
```

**Available scripts:**
- `bun run build` - Build extension
- `bun run watch` - Watch mode for development
- `bun run package` - Package for distribution
- `bun run type-check` - Run TypeScript checks

**Key files:**
- `src/extension.ts` - Main extension logic
- `package.json` - Extension manifest
- `tsconfig.json` - TypeScript configuration

### 4. Browser Extension Development

**Test the extension:**
```bash
cd apps/browser
# Load unpacked in Chrome: chrome://extensions/
```

**Key files:**
- `manifest.json` - Extension manifest
- `background.js` - Background script
- `content.js` - Content script
- `popup.html/js` - Extension popup

## Environment Setup

### Required Environment Variables

Create a `.env` file in the project root:

```bash
# OpenAI API Key (required)
OPENAI_API_KEY=your_openai_api_key_here

# Database URL (required)
DATABASE_URL=postgresql://username:password@localhost:5432/prompt_enhancer

# Development URLs (optional)
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
VSCODE_ENHANCER_API=http://localhost:3000
```

### Database Setup

**Using PostgreSQL:**
```bash
# Install PostgreSQL
# macOS: brew install postgresql
# Ubuntu: sudo apt install postgresql

# Create database
createdb prompt_enhancer

# Run migrations
cd apps/server
bun run db:push
```

**Using Docker:**
```bash
# Start PostgreSQL container
docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres

# Create database
docker exec -it postgres createdb -U postgres prompt_enhancer
```

## Testing

### Running Tests

**All tests:**
```bash
bun run test
```

**Backend tests:**
```bash
cd apps/server
bun run test
```

**Type checking:**
```bash
bun run type-check
```

**Linting:**
```bash
bun run lint
```

### Test Structure

```
apps/
├── server/
│   ├── __tests__/        # Backend tests
│   └── src/
├── web/
│   ├── __tests__/        # Frontend tests
│   └── src/
└── vscode/
    ├── __tests__/        # Extension tests
    └── src/
```

## Building and Deployment

### Local Build

**Build all packages:**
```bash
bun run build
```

**Build specific package:**
```bash
cd apps/server && bun run build
cd apps/web && bun run build
cd apps/vscode && bun run build
```

### Production Deployment

**Backend (Vercel):**
```bash
# Deploy to Vercel
vercel --prod

# Set environment variables in Vercel dashboard
```

**Extensions:**
```bash
# VS Code Extension
cd apps/vscode
vsce publish

# Browser Extension
# Upload to Chrome Web Store
```

## Code Style and Standards

### TypeScript

- Use strict mode
- Prefer explicit types
- Use interfaces for object shapes
- Avoid `any` type

### React/Next.js

- Use functional components
- Prefer hooks over class components
- Use TypeScript for props
- Follow Next.js conventions

### VS Code Extension

- Follow VS Code API patterns
- Use proper error handling
- Implement proper disposal patterns
- Follow extension guidelines

### Git Workflow

**Branch naming:**
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Code refactoring

**Commit messages:**
```
type(scope): description

feat(api): add rate limiting
fix(extension): resolve command registration error
docs(readme): update installation instructions
```

## Debugging

### Backend Debugging

**VS Code Debug Configuration:**
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Server",
  "program": "${workspaceFolder}/apps/server/src/app/route.ts",
  "env": {
    "NODE_ENV": "development"
  }
}
```

**Console logging:**
```typescript
console.log('Debug info:', { data });
console.error('Error occurred:', error);
```

### Extension Debugging

**VS Code Extension:**
1. Open VS Code
2. Press F5 to launch Extension Development Host
3. Use `console.log()` in extension code
4. Check Developer Console (Help → Toggle Developer Tools)

**Browser Extension:**
1. Open Chrome DevTools
2. Go to Extensions tab
3. Click "Inspect views" for background/content scripts
4. Use `console.log()` in extension code

## Performance Optimization

### Backend

- Use connection pooling for database
- Implement caching for frequent requests
- Optimize OpenAI API calls
- Monitor response times

### Extensions

- Minimize bundle size
- Use efficient data structures
- Implement proper cleanup
- Avoid memory leaks

## Security Considerations

### API Security

- Validate all inputs
- Sanitize user data
- Implement rate limiting
- Use HTTPS in production
- Secure API keys

### Extension Security

- Validate user inputs
- Sanitize content
- Use secure communication
- Follow platform security guidelines

## Contributing

### Development Process

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Add tests**
5. **Run the test suite**
6. **Submit a pull request**

### Code Review

- Ensure all tests pass
- Follow coding standards
- Add documentation
- Update changelog if needed

### Release Process

1. **Update version numbers**
2. **Update changelog**
3. **Create release tag**
4. **Deploy to production**
5. **Publish extensions**

## Troubleshooting

### Common Issues

**Build failures:**
- Check Node.js version
- Clear node_modules and reinstall
- Check TypeScript errors

**Database issues:**
- Verify PostgreSQL is running
- Check connection string
- Run migrations

**Extension issues:**
- Check manifest.json
- Verify API endpoints
- Check browser/VS Code console

### Getting Help

- Check existing issues on GitHub
- Review documentation
- Ask questions in discussions
- Contact maintainers

## Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [VS Code Extension API](https://code.visualstudio.com/api)
- [Chrome Extension API](https://developer.chrome.com/docs/extensions/)

### Tools
- [Prisma Studio](https://www.prisma.io/studio)
- [VS Code Extension Development](https://code.visualstudio.com/api/get-started/your-first-extension)
- [Chrome Extension Development](https://developer.chrome.com/docs/extensions/mv3/getstarted/)

### Community
- [GitHub Discussions](https://github.com/your-username/prompt-enhancer/discussions)
- [Discord Server](https://discord.gg/your-server)
- [Twitter](https://twitter.com/your-handle)
