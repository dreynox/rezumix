# 🤝 Contributing to rezumix

Welcome to **rezumix**! We're thrilled that you're interested in contributing to our AI-powered resume and personality analysis platform. This document will guide you through the contribution process and help you get started quickly.

---

## 📋 Table of Contents

1. [Code of Conduct](#-code-of-conduct)
2. [Getting Started](#-getting-started)
3. [Project Structure](#-project-structure)
4. [Development Setup](#-development-setup)
5. [Branching Strategy](#-branching-strategy)
6. [Commit Message Guidelines](#-commit-message-guidelines)
7. [Making Changes](#making-changes)
8. [Testing](#-testing)
9. [Submitting a Pull Request](#-submitting-a-pull-request)
10. [Code Review Process](#-code-review-process)
11. [Coding Standards](#-coding-standards)
12. [GSSoC '26 Guidelines](#-gssoc-26-guidelines)
13. [Troubleshooting](#-troubleshooting)
14. [Getting Help](#-getting-help)

---

## 📖 Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and follow our [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) before contributing.

**Key Principles:**
- Be respectful and inclusive
- Welcome feedback and different perspectives
- Focus on constructive criticism
- Report harassment to the maintainers immediately

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) — [Download here](https://nodejs.org/)
- **npm** (v9 or higher) — comes with Node.js
- **Git** — [Download here](https://git-scm.com/)
- **MongoDB** (local or Atlas account) — [Setup Guide](https://www.mongodb.com/docs/manual/installation/)
- **Google Gemini API Key** — [Get it here](https://ai.google.dev/)

### Fork & Clone the Repository

1. **Fork the repository** by clicking the "Fork" button on GitHub
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/YOUR_USERNAME/rezumix.git
   cd rezumix
   ```
3. **Add upstream remote** to keep your fork in sync:
   ```bash
   git remote add upstream https://github.com/thedevanshagrawal/rezumix.git
   ```

### Verify the Setup

```bash
# Check Node.js and npm versions
node --version
npm --version

# Should output v18+ and v9+ respectively
```

---

## 📁 Project Structure

Understanding the project layout will help you navigate and contribute effectively:

```
rezumix/
├── .github/                      # GitHub workflows and templates
├── app/                          # Next.js App Router
│   ├── layout.js                # Root layout wrapper
│   ├── page.js                  # Landing page
│   ├── dashboard/               # User dashboard pages
│   ├── upload/                  # Resume upload page
│   ├── questionnaire/           # Personality test form
│   ├── result/                  # Personality report display
│   └── api/                     # API routes
│       ├── auth/                # Authentication endpoints
│       │   ├── login/route.js
│       │   └── register/route.js
│       ├── resume/              # Resume processing endpoints
│       │   ├── upload/route.js
│       │   └── analyze/route.js
│       ├── questionnaire/       # Questionnaire endpoints
│       │   ├── submit/route.js
│       │   └── sample/route.js
│       └── personality/         # Report endpoints
│           ├── report/route.js
│           └── tips/route.js
├── components/                  # Reusable React components
│   ├── auth/                    # Auth-related components
│   ├── forms/                   # Form components
│   ├── ui/                      # Base UI components
│   └── shared/                  # Shared components
├── lib/                         # Utility functions
│   ├── db.js                    # MongoDB connection
│   ├── gemini.js                # Gemini API integration
│   ├── auth.js                  # Authentication utilities
│   └── utils.js                 # General utilities
├── models/                      # Mongoose schemas
│   ├── User.js
│   ├── Report.js
│   └── Questionnaire.js
├── public/                      # Static assets
├── styles/                      # CSS (Tailwind config)
├── .env.local                   # Environment variables (local only)
├── .gitignore
├── package.json
├── next.config.mjs
├── tailwind.config.js
├── eslint.config.mjs
└── README.md
```

### Key Directories Explained

| Directory | Purpose |
|-----------|---------|
| `/app` | Next.js 15+ App Router — contains pages, layouts, and API routes |
| `/components` | Reusable React components organized by feature |
| `/lib` | Utility functions, API integrations (Gemini, DB) |
| `/models` | Mongoose schemas for MongoDB collections |
| `/public` | Static assets like images, fonts, icons |

---

## ⚙️ Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Environment File

Create a `.env.local` file in the **root directory** with the following variables:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rezumix

# Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_min_32_chars

# Optional: Email Configuration (for future features)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Optional: Cloudinary (for resume file storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**⚠️ Security Note:** Never commit `.env.local` to version control. It's already in `.gitignore`.

### 3. Seed the Database (Optional)

If you want to add sample data for testing:

```bash
# Create a seed.js file in your project root and run:
node seed.js
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 5. Verify Everything Works

- Visit `http://localhost:3000` in your browser
- The page should load without errors
- Check the console for any warnings

---

## 🌿 Branching Strategy

We follow a **Git Flow** branching strategy. Use the following branch naming convention:

```
<type>/<short-description>
```

### Branch Types

| Type | Purpose | Example |
|------|---------|---------|
| `feat/` | New feature or functionality | `feat/add-pdf-parser` |
| `fix/` | Bug fixes | `fix/jwt-token-expiry` |
| `docs/` | Documentation updates | `docs/update-contributing-guide` |
| `refactor/` | Code refactoring without behavior change | `refactor/optimize-gemini-calls` |
| `perf/` | Performance improvements | `perf/reduce-bundle-size` |
| `test/` | Adding or updating tests | `test/add-auth-tests` |
| `chore/` | Build, CI/CD, dependencies | `chore/update-dependencies` |
| `style/` | Code style (formatting, ESLint) | `style/fix-linting-errors` |

### Creating a Branch

```bash
# Update your local master
git fetch upstream
git checkout master
git merge upstream/master

# Create and switch to your new branch
git checkout -b feat/my-awesome-feature
```

---

## 📝 Commit Message Guidelines

We use **Conventional Commits** for clear and consistent commit history. This helps in automatic changelog generation and better understanding of changes.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Example

```
feat(resume-analyzer): add PDF text extraction using pdfjs

- Integrate pdfjs library for robust PDF parsing
- Add support for both text-based and scanned PDFs
- Fallback to OCR for image-heavy documents

Closes #42
```

### Rules

1. **Type** (required): `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`
2. **Scope** (optional): Component/feature affected (e.g., `auth`, `gemini-api`, `ui`)
3. **Subject** (required):
   - Use imperative mood ("add" not "added")
   - Don't capitalize first letter
   - No period (.) at the end
   - Max 50 characters

4. **Body** (optional):
   - Explain *what* and *why*, not *how*
   - Max 72 characters per line
   - Separated from subject with blank line

5. **Footer** (optional):
   - Reference issues: `Closes #123`
   - Break changes: `BREAKING CHANGE: ...`

### Commit Best Practices

✅ **DO:**
```bash
# Good: Small, focused commits
git commit -m "fix(auth): handle JWT expiry gracefully"
git commit -m "docs: add environment setup guide"
```

❌ **DON'T:**
```bash
# Bad: Large, unfocused commits
git commit -m "updates"
git commit -m "fix stuff and add features"
```

---

## 🛠️ Making Changes

### 1. Pick an Issue or Create One

- Browse [existing issues](https://github.com/thedevanshagrawal/rezumix/issues)
- If working on something new, open an issue first for discussion
- Comment on the issue to indicate you're working on it
- Wait for assignment confirmation before starting (especially for GSSoC '26)

### 2. Keep Your Branch Updated

Before starting work, ensure your branch is up-to-date:

```bash
git fetch upstream
git rebase upstream/master
```

### 3. Code According to Standards

- Follow the [Coding Standards](#coding-standards) section
- Use ESLint and Prettier for formatting
- Write clean, readable code with comments where necessary

### 4. Create Meaningful Commits

```bash
# Make focused commits
git add <specific-files>
git commit -m "feat(component): add loading spinner"
```

### 5. Keep Changes Focused

- One feature/fix per branch
- Don't mix refactoring with new features
- Avoid unnecessary whitespace changes

---

## ✅ Testing

### Running ESLint

```bash
# Check linting errors
npm run lint

# Fix linting errors automatically
npm run lint --fix
```

### Running the Application

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Manual Testing Checklist

Before submitting a PR, test the following:

- [ ] Application starts without errors
- [ ] No console warnings or errors
- [ ] Feature works as expected
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Forms submit correctly
- [ ] API calls return expected responses
- [ ] Database operations work properly
- [ ] No sensitive data in logs or network requests

### Testing with Gemini API

When testing Gemini API integration:

```javascript
// .env.local must have GEMINI_API_KEY set
// Use the test endpoint to verify:

const response = await fetch('/api/resume/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    resumeText: 'Sample resume text here...'
  })
});

const data = await response.json();
console.log(data); // Check response structure
```

### Testing with MongoDB

Ensure MongoDB is running:

```bash
# If using local MongoDB
mongod

# If using MongoDB Atlas, verify connection string in .env.local
```

---

## 📤 Submitting a Pull Request

### 1. Push Your Changes

```bash
git push origin feat/my-awesome-feature
```

### 2. Create a Pull Request

1. Go to [Rezumix on GitHub](https://github.com/thedevanshagrawal/rezumix)
2. Click **"Compare & pull request"** button
3. Ensure the base branch is `master` (or `main`)

### 3. Fill in the PR Template

Use the provided PR template (auto-generated) with:

**Title Format:** `[TYPE] Short description`
```
[FEAT] Add PDF text extraction to resume analyzer
[FIX] Fix JWT token expiry bug in login
[DOCS] Update API documentation
```

**Description (required):**

```markdown
## 📝 Description
Brief explanation of what this PR does.

## 🔗 Related Issue
Closes #42

## 🧪 Type of Change
- [x] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Breaking change

## 📸 Screenshots (if applicable)
Add screenshots for UI changes

## ✅ Checklist
- [x] Code follows style guidelines
- [x] Tested locally
- [x] No breaking changes
- [x] Updated documentation
- [x] No secrets/sensitive data included
```

### 4. PR Best Practices

✅ **DO:**
- Link related issues
- Add clear description of changes
- Include screenshots for UI changes
- Keep PR size manageable (< 400 lines if possible)
- Respond to review comments promptly

❌ **DON'T:**
- Force push to your PR branch during review
- Include unrelated changes
- Leave PR unreviewed for weeks
- Push sensitive data (API keys, passwords)

---

## 👀 Code Review Process

### What to Expect

1. **Automated Checks** (GitHub Actions)
   - ESLint validation
   - Build check
   - Security scanning

2. **Maintainer Review**
   - Code quality assessment
   - Adherence to standards
   - Testing verification
   - API integration checks

3. **Feedback & Iteration**
   - Maintainers may request changes
   - Be responsive and collaborative
   - Update your PR with requested changes

### Addressing Review Comments

```bash
# Make requested changes
git add <modified-files>
git commit -m "refactor: address review feedback"
git push origin feat/my-awesome-feature

# Don't force push; maintainers can see the conversation
```

### Approval & Merge

Once approved:
- Maintainers will merge your PR
- Your changes will appear in the next release
- Your contribution will be credited

---

## 💻 Coding Standards

### JavaScript/React Conventions

#### File Naming
```
✅ Components:        UserProfile.jsx, ResumePDF.jsx
✅ Utilities:         formatDate.js, validateEmail.js
✅ API Routes:        /api/resume/upload/route.js
✅ Styles:            globals.css, components.module.css
❌ Bad Examples:      UserProfile.js (use .jsx for React)
```

#### Component Structure

```javascript
// ✅ GOOD: Functional component with hooks
import { useState, useEffect } from 'react';

export default function ResumeAnalyzer({ resumeId }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/resume/analyze/${resumeId}`);
        const data = await response.json();
        setAnalysis(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [resumeId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{/* Component JSX */}</div>;
}
```

#### API Route Structure

```javascript
// ✅ GOOD: Well-structured API route
import { connectDB } from '@/lib/db';
import { analyzeWithGemini } from '@/lib/gemini';
import { verifyAuth } from '@/lib/auth';

export async function POST(request) {
  try {
    // 1. Verify authentication
    const user = await verifyAuth(request);
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Connect to database
    await connectDB();

    // 3. Parse and validate request
    const { resumeText } = await request.json();
    if (!resumeText) {
      return Response.json(
        { error: 'Resume text is required' },
        { status: 400 }
      );
    }

    // 4. Process request
    const analysis = await analyzeWithGemini(resumeText);

    // 5. Return response
    return Response.json({ success: true, data: analysis });
  } catch (error) {
    console.error('API Error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### CSS/Tailwind Guidelines

```jsx
// ✅ GOOD: Organized Tailwind classes
<div className="flex items-center justify-between gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
  <h2 className="text-2xl font-bold text-gray-900">Resume Analysis</h2>
  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
    Download
  </button>
</div>

// ❌ BAD: Inline styles or too many hardcoded colors
<div style={{ display: 'flex', padding: '24px', backgroundColor: '#fff' }}>
  <h2 style={{ fontSize: '24px', color: '#000' }}>Resume Analysis</h2>
</div>
```

### Comments & Documentation

```javascript
// ✅ GOOD: Clear, purposeful comments
/**
 * Analyzes resume content using Gemini API
 * @param {string} resumeText - Extracted resume text
 * @returns {Promise<Object>} Analysis results including OCEAN scores
 */
async function analyzeResume(resumeText) {
  // Use Gemini to extract personality traits
  const prompt = `Analyze this resume for personality traits...`;
  const result = await gemini.generateContent(prompt);
  return JSON.parse(result);
}

// ❌ BAD: Obvious or misleading comments
function analyzeResume(resumeText) {
  // This function analyzes resumes
  return analyze(resumeText); // Call analyze
}
```

### Error Handling

```javascript
// ✅ GOOD: Proper error handling
async function uploadResume(file) {
  try {
    if (!file) throw new Error('File is required');
    if (file.type !== 'application/pdf') {
      throw new Error('Only PDF files are supported');
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/resume/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Resume upload error:', error);
    return { error: error.message };
  }
}

// ❌ BAD: Silent failures
async function uploadResume(file) {
  const response = await fetch('/api/resume/upload', {
    method: 'POST',
    body: file
  });
  return await response.json();
}
```

---

## 🎓 GSSoC '26 Guidelines

### For GSSoC Contributors

We're proud to participate in **Girls Script Summer of Code 2026**! Here are specific guidelines for participants:

#### 1. **Levels of Difficulty**

Label your issues/PRs with difficulty levels:

- 🟢 **Level 0 (Beginner)**: Documentation, simple UI fixes, small bug fixes
- 🟡 **Level 1 (Intermediate)**: Feature additions, API improvements
- 🔴 **Level 2 (Advanced)**: Complex features, system refactors, Gemini integration

#### 2. **Contribution Requirements**

- **Quality over quantity**: Focus on meaningful contributions
- **Learning mindset**: Engage with mentors and ask questions

#### 3. **Mentorship**

- You'll be paired with a mentor for guidance
- Attend weekly sync-ups if available
- Ask questions in issues before implementing
- Share progress in PR descriptions

#### 4. **Portfolio Building**

Make your contributions count:
- Write clear commit messages and PR descriptions
- Document your learning journey
- Consider creating a blog post about what you built
- Add this project to your portfolio/resume

#### 5. **Code of Conduct Compliance**

- Maintain professionalism and respect
- Inclusive language in all communications
- Support fellow contributors
- Report any issues immediately

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### 1. **MongoDB Connection Error**

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Ensure MongoDB is running locally: `mongod`
- Or verify MongoDB Atlas connection string in `.env.local`
- Check network connectivity

#### 2. **Gemini API Key Error**

```
Error: GEMINI_API_KEY is not set
```

**Solution:**
- Add `GEMINI_API_KEY` to `.env.local`
- Restart the dev server
- Verify the key is valid

#### 3. **Port Already in Use**

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Kill process on port 3000
lsof -i :3000        # macOS/Linux
netstat -ano | grep :3000  # Windows

# Or use a different port
PORT=3001 npm run dev
```

#### 4. **Module Not Found Error**

```
Error: Cannot find module '@/lib/db'
```

**Solution:**
- Check `jsconfig.json` for path aliases
- Ensure file exists at correct location
- Run `npm install` again

#### 5. **Linting Errors**

```
error  Unexpected token  (prettier/prettier)
```

**Solution:**
```bash
npm run lint --fix
```

---

## 🆘 Getting Help

### Resources

- 📚 **Documentation**: [Next.js Docs](https://nextjs.org/docs), [MongoDB Docs](https://docs.mongodb.com)
- 🤖 **Gemini API**: [Google AI Studio](https://aistudio.google.com), [Docs](https://ai.google.dev/docs)
- 💬 **Community**: GitHub Discussions, Discord (if available)

### Asking for Help

When asking for help, provide:

```markdown
## Issue Description
What are you trying to do?

## Error Message
Exact error message (full stack trace)

## Steps to Reproduce
1. Do this
2. Then this
3. See error

## Environment
- Node.js version: (output of `node --version`)
- OS: macOS/Windows/Linux
- Browser: (if frontend issue)

## Attempts Made
What have you already tried?
```

### Contact & Discussion

- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for general questions
- **Email**: Contact maintainer directly for sensitive issues

---

## 📜 License

By contributing to Rezumix, you agree that your contributions will be licensed under the [MIT License](./LICENSE).

---

## 🎉 Final Thoughts

**Thank you for contributing to Rezumix!** Your work helps us build better tools for everyone. Whether you're fixing a bug, adding a feature, or improving documentation, every contribution matters.


## 📝 Changelog

This document is maintained and updated regularly. Last updated: May 2026

**Version History:**
- v1.0 — Initial contribution guide for GSSoC '26

---

<div align = "center"> 

**Happy contributing! 💙**

</div>

---