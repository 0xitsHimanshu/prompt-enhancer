# ✨ Prompt Enhancer

> AI-powered prompt enhancement for developers, writers, and content creators

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)

Transform your basic prompts into detailed, specific, and effective instructions using AI. Available as VS Code extension, browser extension, and web application.

## 🚀 Features

### Core Functionality
- **AI-Powered Enhancement**: Transform simple prompts into detailed, actionable instructions
- **Multiple AI Models**: Support for GPT-4o, GPT-4o-mini, and more
- **Smart API Detection**: Automatic production/development environment detection
- **Zero Configuration**: Works out of the box with sensible defaults

### Extensions
- **VS Code Extension**: Inline enhancement with accept/reject workflow
- **Browser Extension**: Right-click context menu for any webpage
- **Web Playground**: Test and experiment with prompt enhancement

### Developer Experience
- **Type-Safe APIs**: Built with tRPC for end-to-end type safety
- **Modern Stack**: Next.js 15, TypeScript, Prisma, PostgreSQL
- **CI/CD Ready**: Automated testing, building, and deployment
- **Comprehensive Documentation**: API docs, guides, and examples

## 📦 Installation

### VS Code Extension

**From Marketplace:**
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Prompt Enhancer"
4. Click Install

**From Source:**
```bash
cd apps/vscode
bun install
bun run build
bun run package
code --install-extension prompt-enhancer-vscode-0.0.1.vsix
```

### Browser Extension

**From Chrome Web Store:**
1. Visit the Chrome Web Store
2. Search for "Prompt Enhancer"
3. Click "Add to Chrome"

**From Source:**
1. Download the repository
2. Open Chrome → Extensions (chrome://extensions/)
3. Enable "Developer mode"
4. Click "Load unpacked" and select `apps/browser/`

### Web Application

**Live Demo:**
Visit [prompt-enhancer.vercel.app](https://prompt-enhancer.vercel.app)

**Local Development:**
```bash
git clone https://github.com/your-username/prompt-enhancer.git
cd prompt-enhancer
bun install
bun run dev
```

## 🎯 Quick Start

### VS Code Extension
1. **Select text** in any editor
2. **Click the sparkle icon** (✨) in the status bar
3. **Review enhanced text** with green highlighting
4. **Choose**: "Keep Enhancement" or "Revert to Original"

### Browser Extension
1. **Select any text** on any webpage
2. **Right-click** → "Enhance with AI"
3. **Review enhanced text** in the popup
4. **Choose**: "Accept", "Copy Enhanced", or "Cancel"

### Web Application
1. **Enter your prompt** in the left text area
2. **Click "Enhance"** button
3. **Review enhanced version** in the right text area
4. **Copy or use** the enhanced prompt

## 🏗️ Project Structure

```
prompt-enhancer/
├── apps/
│   ├── server/          # Next.js API server (tRPC, Prisma)
│   ├── web/            # Next.js web client (React, Tailwind)
│   ├── vscode/         # VS Code extension (TypeScript)
│   └── browser/        # Browser extension (Manifest V3)
├── .github/            # GitHub Actions workflows
├── docs/               # Documentation
└── scripts/            # Build and utility scripts
```

## 🛠️ Development

### Prerequisites
- **Node.js**: 18+ (recommended: latest LTS)
- **Bun**: 1.2+ (package manager and runtime)
- **PostgreSQL**: 14+ (for database)

### Setup
```bash
# Clone the repository
git clone https://github.com/your-username/prompt-enhancer.git
cd prompt-enhancer

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Set up database
bun run db:push

# Start development servers
bun run dev
```

### Environment Variables
```bash
# Required
OPENAI_API_KEY=your_openai_api_key_here
DATABASE_URL=postgresql://username:password@localhost:5432/prompt_enhancer

# Optional (for development)
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
VSCODE_ENHANCER_API=http://localhost:3000
```

### Available Scripts
```bash
# Development
bun run dev              # Start all applications
bun run dev:web          # Start web client only
bun run dev:server       # Start API server only

# Building
bun run build            # Build all applications
bun run type-check       # Run TypeScript checks
bun run lint             # Run ESLint

# Database
bun run db:push          # Push schema to database
bun run db:studio        # Open Prisma Studio
bun run db:generate      # Generate Prisma client

# Extensions
cd apps/vscode && bun run package    # Package VS Code extension
cd apps/browser && zip -r extension.zip .  # Package browser extension
```

## 📚 Documentation

- **[API Documentation](API_DOCUMENTATION.md)** - Complete API reference
- **[Extension Guides](EXTENSION_GUIDES.md)** - Installation and usage guides
- **[Developer Guide](DEVELOPER_GUIDE.md)** - Development setup and guidelines
- **[Deployment Guide](DEPLOYMENT.md)** - Production deployment instructions
- **[Testing Guide](TESTING_GUIDE.md)** - Testing scenarios and procedures
- **[Enhancement Guidelines](ENHANCEMENT_GUIDELINES.md)** - Future development roadmap

## 🔧 Configuration

### VS Code Extension Settings
```json
{
  "promptEnhancer.apiBaseUrl": "",
  "promptEnhancer.productionApiUrl": "https://prompt-enhancer.vercel.app",
  "promptEnhancer.model": "gpt-4o-mini"
}
```

### Browser Extension Settings
- **Custom API URL**: Override default endpoint
- **Production API URL**: Default production endpoint
- **Model**: AI model preference

## 🚀 Deployment

### Backend (Vercel)
```bash
# Deploy to Vercel
vercel --prod

# Set environment variables in Vercel dashboard
```

### Extensions
- **VS Code**: Publish to VS Code Marketplace
- **Browser**: Upload to Chrome Web Store

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Process
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

### Code Style
- Use TypeScript with strict mode
- Follow ESLint configuration
- Write tests for new features
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack)
- Powered by OpenAI's GPT models
- Icons by [Lucide](https://lucide.dev/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/prompt-enhancer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/prompt-enhancer/discussions)
- **Email**: support@prompt-enhancer.com

---

**Made with ❤️ for the developer community**