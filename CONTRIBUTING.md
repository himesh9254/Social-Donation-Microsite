# Contributing to Social Good Donations Microsite

Thank you for your interest in contributing to this project! We welcome contributions from developers of all skill levels.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Code Standards](#code-standards)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Security](#security)

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Setup Development Environment
1. **Fork the repository** on GitHub
2. **Clone your fork:**
   ```bash
   git clone https://github.com/yourusername/donations-microsite.git
   cd donations-microsite
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up environment variables:**
   - Copy `.env.example` to `.env.local`
   - Add your development credentials
5. **Start development server:**
   ```bash
   npm run dev
   ```

## 🔄 Development Process

### Workflow
1. **Create a branch** for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```

2. **Make your changes** following our code standards

3. **Test your changes:**
   ```bash
   npm run lint          # Check code style
   npm run build         # Verify build works
   npm run dev           # Test locally
   ```

4. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add new donation analytics feature"
   ```

5. **Push and create a pull request:**
   ```bash
   git push origin feature/your-feature-name
   ```

### Branch Naming Conventions
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding tests

### Commit Message Format
Follow [Conventional Commits](https://www.conventionalcommits.org/):
```
type(scope): description

feat(api): add donation analytics endpoint
fix(ui): resolve mobile responsive issues
docs(readme): update installation instructions
```

## 📝 Code Standards

### TypeScript
- Use strict TypeScript configuration
- Provide type definitions for all functions
- Avoid `any` types when possible
- Use interfaces for object types

```typescript
// Good
interface DonationData {
  amount: number;
  currency: string;
  donorEmail: string;
}

// Avoid
function processDonation(data: any) { ... }
```

### React Components
- Use functional components with hooks
- Implement proper prop types
- Use semantic HTML
- Follow accessibility guidelines

```typescript
// Good
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export function Button({ onClick, children, disabled = false }: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className="btn btn-primary"
      aria-label="Submit donation"
    >
      {children}
    </button>
  );
}
```

### API Routes
- Use proper HTTP status codes
- Implement comprehensive error handling
- Validate all inputs
- Return consistent response formats

```typescript
// Good
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate input
    if (!data.email || !data.amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Process request
    const result = await processData(data);
    
    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Ensure accessibility compliance
- Test across different screen sizes

```jsx
// Good
<div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md sm:max-w-lg lg:max-w-xl">
  <h2 className="text-xl font-semibold text-gray-900 mb-4">
    Donation Form
  </h2>
</div>
```

## 🔍 Pull Request Process

### Before Submitting
- [ ] Code follows established style guidelines
- [ ] All tests pass locally
- [ ] Documentation is updated if needed
- [ ] Changes are tested across different browsers
- [ ] No console errors or warnings
- [ ] Security considerations are addressed

### Pull Request Template
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
- [ ] Local testing completed
- [ ] Cross-browser testing done
- [ ] API endpoints tested

## Screenshots
If applicable, add screenshots of UI changes.

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

### Review Process
1. **Automated checks** must pass (linting, building)
2. **Code review** by maintainers
3. **Testing** on staging environment
4. **Approval** by project maintainer
5. **Merge** to main branch

## 📋 Issue Guidelines

### Reporting Bugs
Use the bug report template and include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser/environment details
- Screenshots/error messages

### Feature Requests
Use the feature request template and include:
- Problem description
- Proposed solution
- Alternative solutions considered
- Implementation considerations

### Labels
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed

## 🔒 Security

### Reporting Security Vulnerabilities
**Do not** create public issues for security vulnerabilities.

Instead, email security concerns to: [security@yourproject.com]

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact assessment
- Suggested fix (if any)

### Security Considerations
- Never commit API keys or secrets
- Validate all user inputs
- Use HTTPS in production
- Follow OWASP security guidelines
- Regularly update dependencies

## 🎯 Areas for Contribution

### High Priority
- Unit test coverage improvements
- Mobile UI/UX enhancements
- Performance optimizations
- Accessibility improvements

### Medium Priority
- Additional payment providers
- Enhanced admin dashboard
- Email template designs
- Documentation improvements

### Good First Issues
- UI component styling
- Documentation updates
- Bug fixes with clear reproduction steps
- Adding validation messages

## 📚 Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)

### Tools
- [VS Code](https://code.visualstudio.com/) - Recommended editor
- [GitHub Desktop](https://desktop.github.com/) - Git GUI
- [Postman](https://www.postman.com/) - API testing

## 🤝 Community

### Communication
- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and ideas
- **Pull Requests** - Code contributions and reviews

### Code of Conduct
We follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

### Recognition
Contributors will be recognized in:
- Project README
- Release notes
- Contributors page

---

## Questions?

If you have questions about contributing, feel free to:
- Open a [GitHub Discussion](https://github.com/yourusername/donations-microsite/discussions)
- Create an issue with the `question` label
- Check existing documentation

Thank you for contributing to making the world a better place through technology! 🌟
