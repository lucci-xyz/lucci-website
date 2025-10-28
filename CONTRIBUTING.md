# Contributing to Lucci Labs Website

Thank you for your interest in contributing! This document provides guidelines for contributing to the Lucci Labs website.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/lucci-website.git`
3. Install dependencies: `npm install`
4. Start the dev server: `npm run dev`
5. Visit `http://localhost:3000`

## Development Workflow

### Making Changes

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test your changes: `npm run build && npm test`
4. Format your code: `npm run format`
5. Commit your changes: `git commit -m "Description of changes"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Open a Pull Request

### Code Style

- We use Prettier for code formatting (run `npm run format`)
- Follow existing patterns in the codebase
- Use TypeScript for type safety
- Write meaningful commit messages

### Testing

- Add tests for new components in `__tests__/`
- Ensure all tests pass: `npm test`
- Check that the build succeeds: `npm run build`

## Project Structure

- `/app` - Next.js pages and API routes
- `/components` - Reusable React components
- `/lib` - Utility functions and helpers
- `/data` - Static data (projects.json)
- `/content` - MDX content (research posts)
- `/public` - Static assets

## Adding Content

### Adding a Project

Edit `data/projects.json` and add your project following the existing format:

```json
{
  "name": "ProjectName",
  "blurb": "Brief description",
  "tags": ["tag1", "tag2"],
  "status": "alpha",
  "githubUrl": "https://github.com/...",
  "siteUrl": "https://..."
}
```

### Adding a Research Post

Create a new `.mdx` file in `content/research/` with frontmatter:

```mdx
---
title: "Post Title"
date: "YYYY-MM-DD"
summary: "Brief summary"
tags: ["tag1", "tag2"]
---

# Content here
```

## Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Update documentation if needed
- Add tests for new functionality
- Ensure CI passes
- Reference related issues

## Code of Conduct

- Be respectful and constructive
- Welcome newcomers
- Focus on what's best for the project
- Show empathy towards other contributors

## Questions?

Open an issue or reach out to the maintainers.

---

Thanks for contributing! 🚀

