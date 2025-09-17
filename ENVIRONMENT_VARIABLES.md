# 🔧 Environment Variables Configuration

## Required Environment Variables

### Backend API
```bash
# OpenAI API Key (required for AI functionality)
OPENAI_API_KEY=your_openai_api_key_here

# Database Connection (required for prompt logging)
DATABASE_URL=postgresql://username:password@localhost:5432/prompt_enhancer
```

### Development URLs (Optional)
```bash
# For local development
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
VSCODE_ENHANCER_API=http://localhost:3000
```

## CI/CD Environment Variables

### Vercel Deployment
```bash
# Vercel deployment tokens (set in Vercel dashboard)
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

### VS Code Marketplace
```bash
# For publishing VS Code extension
VSCODE_MARKETPLACE_TOKEN=your_marketplace_token
```

### GitHub Actions
```bash
# GitHub token for CI/CD
GITHUB_TOKEN=your_github_token
```

## Setting Up Environment Variables

### 1. Local Development
Create a `.env` file in the project root:
```bash
cp ENVIRONMENT_VARIABLES.md .env
# Edit .env with your actual values
```

### 2. Vercel Deployment
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variables:
   - `OPENAI_API_KEY`
   - `DATABASE_URL`

### 3. GitHub Actions
1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Add the following secrets:
   - `OPENAI_API_KEY`
   - `DATABASE_URL`
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
   - `VSCODE_MARKETPLACE_TOKEN`

## Security Notes

- ✅ **Never commit** `.env` files to version control
- ✅ **Use strong, unique** API keys
- ✅ **Rotate keys** regularly
- ✅ **Use environment-specific** values for different deployments
- ✅ **Limit permissions** for API keys to minimum required

## Production Checklist

- [ ] Set `OPENAI_API_KEY` in Vercel
- [ ] Set `DATABASE_URL` in Vercel
- [ ] Configure GitHub secrets for CI/CD
- [ ] Test API endpoints with production environment
- [ ] Verify extensions work with production API
- [ ] Monitor API usage and costs
