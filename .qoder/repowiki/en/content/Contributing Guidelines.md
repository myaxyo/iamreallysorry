# Contributing Guidelines

<cite>
**Referenced Files in This Document**
- [README.md](file://README.md)
- [package.json](file://package.json)
- [eslint.config.mjs](file://eslint.config.mjs)
- [tsconfig.json](file://tsconfig.json)
- [next.config.ts](file://next.config.ts)
- [src/app/layout.tsx](file://src/app/layout.tsx)
- [src/app/[lang]/page.tsx](file://src/app/[lang]/page.tsx)
- [src/app/[lang]/dictionaries.ts](file://src/app/[lang]/dictionaries.ts)
- [src/components/ApologyExperience.tsx](file://src/components/ApologyExperience.tsx)
- [src/components/CreatorFlow.tsx](file://src/components/CreatorFlow.tsx)
- [src/components/LandingContent.tsx](file://src/components/LandingContent.tsx)
- [src/components/SorryMeterI18n.tsx](file://src/components/SorryMeterI18n.tsx)
- [src/components/RunawayButtonI18n.tsx](file://src/components/RunawayButtonI18n.tsx)
- [AGENTS.md](file://AGENTS.md)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Development Environment Setup](#development-environment-setup)
3. [Fork and Clone Workflow](#fork-and-clone-workflow)
4. [Branch Naming Conventions](#branch-naming-conventions)
5. [Feature Development Patterns](#feature-development-patterns)
6. [Code Style Standards and TypeScript Guidelines](#code-style-standards-and-typescript-guidelines)
7. [Pull Request Process](#pull-request-process)
8. [Issue Reporting and Bug Fixes](#issue-reporting-and-bug-fixes)
9. [Feature Requests](#feature-requests)
10. [Adding New Languages](#adding-new-languages)
11. [Architectural Principles and Design Patterns](#architectural-principals-and-design-patterns)
12. [Testing Expectations](#testing-expectations)
13. [Documentation Requirements](#documentation-requirements)
14. [Community Contribution Standards](#community-contribution-standards)
15. [Debugging Procedures](#debugging-procedures)
16. [Troubleshooting Common Issues](#troubleshooting-common-issues)
17. [Conclusion](#conclusion)

## Introduction
Thank you for your interest in contributing to the I Am Really Sorry project. This document provides comprehensive guidance for setting up your development environment, understanding the project structure, following coding standards, and submitting high-quality contributions. The project is a Next.js application featuring an interactive apology experience with internationalization support, animations, and sound effects.

## Development Environment Setup
- Install dependencies using your preferred package manager as defined in the project scripts.
- Start the development server to verify your local setup.
- The project uses TypeScript with strict compiler options and ESLint for code quality enforcement.

**Section sources**
- [README.md:5-15](file://README.md#L5-L15)
- [package.json:5-10](file://package.json#L5-L10)

## Fork and Clone Workflow
- Fork the repository on GitHub.
- Clone your fork locally using your preferred Git client.
- Create a new branch for your feature or fix.
- Commit your changes with clear, concise messages.
- Push your branch and open a pull request against the main branch.

## Branch Naming Conventions
- Use descriptive names that reflect the change (e.g., feature/add-language-es, fix/i18n-dictionary-loading, chore/update-dependencies).
- Prefix branches with feature/, fix/, chore/, docs/, refactor/, perf/, test/, or build/ as appropriate.

## Feature Development Patterns
- Follow the existing component structure and file naming conventions.
- Keep components self-contained and reusable.
- Use TypeScript interfaces for props to ensure type safety.
- Leverage the existing internationalization pattern for new text content.
- Maintain a single responsibility principle for each component.

## Code Style Standards and TypeScript Guidelines
- The project enforces strict TypeScript compilation with modern module resolution.
- ESLint is configured with Next.js recommended rules for TypeScript and Core Web Vitals.
- Global ignores exclude build artifacts and Next.js generated types.
- Use consistent indentation and spacing as enforced by the linter.
- Prefer functional components with hooks for state management.
- Use React's built-in lazy loading for heavy 3D components.

**Section sources**
- [tsconfig.json:2-24](file://tsconfig.json#L2-L24)
- [eslint.config.mjs:1-19](file://eslint.config.mjs#L1-L19)

## Pull Request Process
Review Criteria
- Code compiles without errors and passes lint checks.
- Changes align with the project's architectural principles.
- New features include appropriate internationalization updates.
- Performance impact is considered and documented if significant.
- Documentation and comments are clear and helpful.

Testing Requirements
- Verify functionality across supported browsers and devices.
- Test internationalization changes with multiple locales.
- Ensure animations and sound effects work as expected.
- Validate responsive behavior on various screen sizes.

Merge Procedures
- Ensure CI checks pass and reviews are approved.
- Squash or rebase commits for clarity before merging.
- Update related documentation and changelogs as needed.

## Issue Reporting and Bug Fixes
Bug Report Template
- Environment details (OS, browser, device).
- Steps to reproduce the issue.
- Expected vs. actual behavior.
- Screenshots or videos if applicable.
- Proposed solution or workaround if available.

Bug Fix Process
- Create a dedicated branch for the fix.
- Include a test case that reproduces the issue.
- Provide clear commit messages referencing the issue.
- Update tests if they were missing or inadequate.

## Feature Requests
Request Process
- Open a GitHub issue describing the feature and its benefits.
- Include use cases and potential implementation approaches.
- Discuss trade-offs and alternatives.
- Collaborate on acceptance criteria and testing strategy.

## Adding New Languages
Language Support Pattern
- Add a new dictionary file in the [lang]/dictionaries directory.
- Import and register the new locale in the dictionaries loader.
- Update the language selection component with the new option.
- Ensure proper RTL support for right-to-left languages.
- Test the new locale thoroughly across all components.

Implementation Steps
1. Create the new dictionary JSON file with all required keys.
2. Import the dictionary in the dictionaries loader.
3. Add the locale to the supported locales array.
4. Update the language selector UI.
5. Test the new locale in isolation and integrated scenarios.

**Section sources**
- [src/app/[lang]/dictionaries.ts:3-15](file://src/app/[lang]/dictionaries.ts#L3-L15)
- [src/components/CreatorFlow.tsx:6-18](file://src/components/CreatorFlow.tsx#L6-L18)

## Architectural Principles and Design Patterns
Component Architecture
- Single-page application with route-based internationalization.
- Client-side interactivity with server-rendered landing pages.
- Dynamic imports for resource-intensive 3D components.
- Composition over inheritance with reusable UI primitives.

Design Patterns
- Internationalization through locale-specific dictionary loading.
- Progressive enhancement with animation libraries.
- Event-driven interactions with sound effects.
- Responsive design with Tailwind CSS utilities.

**Section sources**
- [src/app/[lang]/page.tsx:12-31](file://src/app/[lang]/page.tsx#L12-L31)
- [src/components/ApologyExperience.tsx:12-12](file://src/components/ApologyExperience.tsx#L12-L12)

## Testing Expectations
Quality Assurance
- Manual testing across desktop and mobile devices.
- Cross-browser compatibility verification.
- Internationalization testing with all supported locales.
- Performance testing with real-world data volumes.
- Accessibility compliance with WCAG guidelines.

Automated Testing
- Unit tests for utility functions and pure components.
- Integration tests for critical user flows.
- Visual regression testing for UI components.
- End-to-end tests for core interactions.

## Documentation Requirements
Content Standards
- Update README.md for major changes or new features.
- Add inline comments for complex logic and algorithms.
- Document public APIs with clear parameter and return value descriptions.
- Include migration guides for breaking changes.
- Provide troubleshooting guides for common issues.

## Community Contribution Standards
Communication
- Be respectful and inclusive in all interactions.
- Provide constructive feedback and accept criticism gracefully.
- Help new contributors get started and onboard effectively.
- Follow the project's code of conduct in all spaces.

Collaboration
- Review pull requests promptly and provide meaningful feedback.
- Keep discussions focused and actionable.
- Share knowledge and mentorship generously.
- Celebrate successes and learn from failures together.

## Debugging Procedures
Local Debugging
- Use browser developer tools to inspect rendering and performance.
- Enable React DevTools for component inspection.
- Utilize console logging strategically for state and flow debugging.
- Test network requests and API responses during development.

Remote Debugging
- Monitor production logs and error reports.
- Use browser performance profiling for optimization.
- Capture screenshots and user session recordings when possible.
- Collaborate with users to reproduce and resolve issues.

## Troubleshooting Common Issues
Build Problems
- Clear node_modules and reinstall dependencies if builds fail.
- Verify TypeScript configuration and module resolution settings.
- Check for conflicting peer dependencies in the lockfile.

Runtime Issues
- Ensure all dynamic imports are properly handled on the client.
- Verify dictionary loading and fallback mechanisms.
- Check CORS policies for external resources if applicable.

Performance Issues
- Profile bundle sizes and optimize heavy dependencies.
- Implement proper code splitting and lazy loading.
- Monitor Core Web Vitals and address regressions.

Internationalization Problems
- Verify locale detection and fallback logic.
- Check dictionary completeness for all required keys.
- Test RTL layouts for right-to-left languages.

**Section sources**
- [AGENTS.md:1-6](file://AGENTS.md#L1-L6)
- [src/app/[lang]/dictionaries.ts:22-26](file://src/app/[lang]/dictionaries.ts#L22-L26)

## Conclusion
Thank you for contributing to the I Am Really Sorry project. By following these guidelines, you help maintain code quality, improve user experience, and foster a welcoming community. Remember to keep contributions focused, well-tested, and aligned with the project's mission of creating meaningful digital apologies. For questions or clarifications, engage with the community through GitHub issues and discussions.