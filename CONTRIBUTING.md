# 🤝 Contributing to Prompt Enhancer

Thank you for your interest in contributing to Prompt Enhancer! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Process](#contributing-process)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Documentation Guidelines](#documentation-guidelines)
- [Issue Guidelines](#issue-guidelines)
- [Pull Request Guidelines](#pull-request-guidelines)

## 📜 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18+ (recommended: latest LTS)
- **Bun**: 1.2+ (package manager and runtime)
- **Git**: Latest version
- **VS Code**: Latest version (recommended)
- **PostgreSQL**: 14+ (for database)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/prompt-enhancer.git
   cd prompt-enhancer
   ```

3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/original-username/prompt-enhancer.git
   ```

## 🛠️ Development Setup

### Environment Setup

1. **Install dependencies:**
   ```bash
   bun install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

3. **Set up database:**
   ```bash
   bun run db:push
   ```

4. **Start development servers:**
   ```bash
   bun run dev
   ```

### Required Environment Variables

```bash
# Required
OPENAI_API_KEY=your_openai_api_key_here
DATABASE_URL=postgresql://username:password@localhost:5432/prompt_enhancer

# Optional (for development)
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
VSCODE_ENHANCER_API=http://localhost:3000
```

## 🔄 Contributing Process

### 1. Choose an Issue

- Look for issues labeled `good first issue` or `help wanted`
- Comment on the issue to indicate you're working on it
- If you want to work on something not listed, open an issue first

### 2. Create a Branch

```bash
# Update your local main branch
git checkout main
git pull upstream main

# Create a new branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Make Changes

- Write your code following the style guidelines
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass

### 4. Test Your Changes

```bash
# Run all tests
bun run test

# Run type checking
bun run type-check

# Run linting
bun run lint

# Test specific components
cd apps/server && bun run test
cd apps/web && bun run test
cd apps/vscode && bun run test
```

### 5. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat(api): add user authentication endpoint"
```

### 6. Push and Create PR

```bash
# Push your branch
git push origin feature/your-feature-name

# Create a pull request on GitHub
```

## 📝 Code Style Guidelines

### TypeScript

- Use strict mode
- Prefer explicit types over `any`
- Use interfaces for object shapes
- Use proper error handling

```typescript
// ✅ Good
interface User {
  id: string;
  email: string;
  name?: string;
}

async function getUser(id: string): Promise<User> {
  try {
    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    console.error('Failed to get user:', error);
    throw error;
  }
}

// ❌ Bad
async function getUser(id: any): Promise<any> {
  return await db.user.findUnique({ where: { id } });
}
```

### React/Next.js

- Use functional components with hooks
- Use TypeScript for props
- Follow Next.js conventions

```typescript
// ✅ Good
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// ❌ Bad
export function Button(props: any) {
  return <button onClick={props.onClick}>{props.children}</button>;
}
```

### VS Code Extension

- Follow VS Code API patterns
- Use proper disposal patterns
- Implement proper error handling

```typescript
// ✅ Good
export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('promptEnhancer.enhance', async () => {
    try {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage('No active editor');
        return;
      }
      
      // Implementation
    } catch (error) {
      vscode.window.showErrorMessage(`Enhancement failed: ${error.message}`);
    }
  });
  
  context.subscriptions.push(disposable);
}

// ❌ Bad
export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand('promptEnhancer.enhance', () => {
    // No error handling
    // No disposal
  });
}
```

### Git Commit Messages

Use the conventional commit format:

```
type(scope): description

feat(api): add user authentication endpoint
fix(extension): resolve command registration error
docs(readme): update installation instructions
refactor(ui): simplify component structure
test(api): add integration tests
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## 🧪 Testing Guidelines

### Test Structure

```
apps/
├── server/
│   ├── __tests__/
│   │   ├── api/
│   │   ├── lib/
│   │   └── utils/
│   └── src/
├── web/
│   ├── __tests__/
│   │   ├── components/
│   │   ├── pages/
│   │   └── utils/
│   └── src/
└── vscode/
    ├── __tests__/
    │   ├── extension/
    │   └── utils/
    └── src/
```

### Writing Tests

**API Tests:**
```typescript
import { describe, it, expect } from 'vitest';
import { enhancePrompt } from '../src/lib/ai';

describe('AI Enhancement', () => {
  it('should enhance a simple prompt', async () => {
    const prompt = 'Write a function';
    const result = await enhancePrompt(prompt);
    
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(prompt.length);
    expect(result).toContain('function');
  });
  
  it('should handle empty prompts', async () => {
    await expect(enhancePrompt('')).rejects.toThrow('Prompt is required');
  });
});
```

**Component Tests:**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../src/components/Button';

describe('Button Component', () => {
  it('should render with children', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Test Coverage

- Aim for 80%+ code coverage
- Test happy paths and edge cases
- Test error conditions
- Test user interactions

## 📚 Documentation Guidelines

### Code Documentation

- Document all public APIs
- Include JSDoc comments for functions
- Provide code examples
- Keep documentation up to date

```typescript
/**
 * Enhances a prompt using AI to make it more detailed and specific
 * @param prompt - The text prompt to enhance
 * @param options - Enhancement options
 * @returns Promise resolving to the enhanced prompt
 * @throws {Error} When the prompt is empty or API call fails
 * @example
 * ```typescript
 * const enhanced = await enhancePrompt('Write a function');
 * console.log(enhanced); // "Write a comprehensive function that..."
 * ```
 */
export async function enhancePrompt(
  prompt: string,
  options: EnhancementOptions = {}
): Promise<string> {
  // Implementation
}
```

### README Updates

- Update README when adding new features
- Include installation instructions
- Provide usage examples
- Keep links and badges current

### API Documentation

- Document all endpoints
- Include request/response examples
- Document error codes
- Provide integration examples

## 🐛 Issue Guidelines

### Bug Reports

When reporting bugs, include:

1. **Clear title** describing the issue
2. **Steps to reproduce** the bug
3. **Expected behavior** vs actual behavior
4. **Environment details** (OS, browser, extension version)
5. **Screenshots** or error messages
6. **Additional context** if relevant

### Feature Requests

When requesting features, include:

1. **Clear title** describing the feature
2. **Problem description** - what problem does this solve?
3. **Proposed solution** - how should it work?
4. **Alternatives considered** - other approaches you've thought about
5. **Additional context** - use cases, examples, etc.

### Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements or additions to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `question`: Further information is requested

## 🔀 Pull Request Guidelines

### PR Title

Use the same format as commit messages:

```
feat(api): add user authentication endpoint
fix(extension): resolve command registration error
docs(readme): update installation instructions
```

### PR Description

Include:

1. **Summary** of changes
2. **Motivation** - why these changes?
3. **Testing** - how was it tested?
4. **Screenshots** - for UI changes
5. **Breaking changes** - if any
6. **Related issues** - link to issues

### PR Checklist

- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] New tests added for new functionality
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
- [ ] PR title follows conventional format
- [ ] PR description is complete

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** by maintainers
4. **Approval** and merge

## 🏷️ Release Process

### Versioning

We use [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Steps

1. Update version numbers
2. Update changelog
3. Create release tag
4. Deploy to production
5. Publish extensions

## 📞 Getting Help

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and general discussion
- **Discord**: Real-time chat and community
- **Email**: support@prompt-enhancer.com

### Resources

- [API Documentation](API_DOCUMENTATION.md)
- [Developer Guide](DEVELOPER_GUIDE.md)
- [Testing Guide](TESTING_GUIDE.md)
- [Enhancement Guidelines](ENHANCEMENT_GUIDELINES.md)

## 🙏 Recognition

Contributors will be recognized in:

- README contributors section
- Release notes
- Project documentation
- Community highlights

Thank you for contributing to Prompt Enhancer! 🎉
