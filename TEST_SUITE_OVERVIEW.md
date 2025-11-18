# Test Suite Overview - LivePro Monorepo

## Table of Contents
- [Introduction](#introduction)
- [Test Infrastructure](#test-infrastructure)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Writing Tests](#writing-tests)
- [Continuous Integration](#continuous-integration)

## Introduction

This document provides an overview of the comprehensive test suite for the LivePro monorepo. The test suite includes unit tests, integration tests, and end-to-end (E2E) tests for all applications and packages.

## Test Infrastructure

### Shared Test Configuration

The monorepo uses a shared test configuration package (`@repo/test-config`) that provides:

- **Vitest Configuration**: For unit and integration tests
- **Playwright Configuration**: For E2E tests
- **Test Setup**: Common mocks and test utilities

**Location**: `packages/test-config/`

#### Files:
- `vitest.config.ts` - Base Vitest configuration
- `playwright.config.ts` - Base Playwright configuration
- `test-setup.ts` - Global test setup and mocks

### Testing Tools

#### Unit & Integration Tests
- **Vitest**: Fast unit test framework
- **@testing-library/react**: React component testing utilities
- **@testing-library/jest-dom**: Custom matchers for DOM nodes
- **jsdom**: DOM environment for Node.js

#### E2E Tests
- **Playwright**: Modern E2E testing framework
- **Multiple browsers**: Chromium, Firefox, WebKit
- **Mobile testing**: Pixel 5, iPhone 12

## Running Tests

### All Tests
```bash
# Run all tests across the monorepo
pnpm test

# Run unit tests only
pnpm test:unit

# Run integration tests only
pnpm test:integration

# Run E2E tests only
pnpm test:e2e

# Run tests with coverage
pnpm test:coverage
```

### Package-Specific Tests

#### UI Package
```bash
cd packages/ui
pnpm test              # Run unit tests
pnpm test:watch       # Watch mode
pnpm test:coverage    # With coverage
```

#### Auth Package
```bash
cd packages/auth
pnpm test
pnpm test:watch
pnpm test:coverage
```

#### Motion Package
```bash
cd packages/motion
pnpm test
pnpm test:watch
pnpm test:coverage
```

### App-Specific Tests

#### Web App
```bash
cd apps/web
pnpm test             # Unit tests
pnpm test:e2e         # E2E tests
pnpm test:coverage    # Coverage
```

#### Production App
```bash
cd apps/production
pnpm test
pnpm test:e2e
pnpm test:coverage
```

#### Staffing App
```bash
cd apps/staffing
pnpm test
pnpm test:e2e
pnpm test:coverage
```

#### Talent App
```bash
cd apps/talent
pnpm test
pnpm test:e2e
pnpm test:coverage
```

#### Finance App
```bash
cd apps/finance
pnpm test
pnpm test:e2e
pnpm test:coverage
```

#### Docs App
```bash
cd apps/docs
pnpm test  # Build validation
```

#### API
```bash
cd apps/api
pnpm test              # Unit tests
pnpm test:e2e          # Integration tests
pnpm test:coverage     # Coverage
```

## Test Coverage

### Packages

#### `@repo/ui`
Located in `packages/ui/src/components/ui/__tests__/`

**Unit Tests:**
- ✅ `button.test.tsx` - Button component tests
  - Renders correctly
  - Applies variant classes
  - Renders as child with asChild prop
- ✅ `card.test.tsx` - Card component tests
- ✅ `input.test.tsx` - Input component tests

**Configuration:**
- `packages/ui/vitest.config.ts`

#### `@repo/auth`
Located in `packages/auth/src/__tests__/`

**Unit Tests:**
- ✅ `index.test.ts` - Basic auth functionality tests

**Configuration:**
- `packages/auth/vitest.config.ts`

#### `@repo/motion`
Located in `packages/motion/src/__tests__/`

**Unit Tests:**
- ✅ `index.test.ts` - Basic motion functionality tests

**Configuration:**
- `packages/motion/vitest.config.ts`

### Applications

#### Web App
**Unit Tests:**
- `apps/web/src/lib/__tests__/utils.test.ts` - Utility function tests

**E2E Tests:**
- `apps/web/e2e/home.spec.ts` - Home page E2E tests
  - Title verification
  - Navigation tests

**Configuration:**
- `apps/web/vitest.config.ts`
- Playwright inherits from `@repo/test-config`

#### Production App
**Unit Tests:**
- `apps/production/__tests__/page.test.tsx` - Page component tests

**E2E Tests:**
- `apps/production/e2e/production-flow.spec.ts` - Production workflow E2E tests

**Configuration:**
- `apps/production/vitest.config.ts`

#### Staffing App
**Unit Tests:**
- `apps/staffing/__tests__/page.test.tsx` - Page component tests

**E2E Tests:**
- `apps/staffing/e2e/staffing-flow.spec.ts` - Staffing workflow E2E tests

**Configuration:**
- `apps/staffing/vitest.config.ts`

#### Talent App
**Unit Tests:**
- `apps/talent/__tests__/page.test.tsx` - Page component tests

**E2E Tests:**
- `apps/talent/e2e/talent-flow.spec.ts` - Talent workflow E2E tests

**Configuration:**
- `apps/talent/vitest.config.ts`

#### Finance App
**Unit Tests:**
- `apps/finance/__tests__/page.test.tsx` - Page component tests

**E2E Tests:**
- `apps/finance/e2e/finance-flow.spec.ts` - Finance workflow E2E tests

**Configuration:**
- `apps/finance/vitest.config.ts`

#### Docs App
**Unit Tests:**
- `apps/docs/__tests__/build.test.ts` - Build validation tests

**Test Strategy:**
- Primary test is successful build
- No dedicated E2E tests (documentation site)

#### API
**Unit Tests:**
Located in `apps/api/src/`
- `app.controller.spec.ts` - App controller tests
- `events/events.controller.spec.ts` - Events controller tests
- `events/events.service.spec.ts` - Events service tests
- `schedule/schedule.controller.spec.ts` - Schedule controller tests
- `schedule/schedule.service.spec.ts` - Schedule service tests
- `stages/stages.controller.spec.ts` - Stages controller tests
- `stages/stages.service.spec.ts` - Stages service tests
- `tasks/tasks.controller.spec.ts` - Tasks controller tests
- `tasks/tasks.service.spec.ts` - Tasks service tests
- `workspaces/workspaces.controller.spec.ts` - Workspaces controller tests
- `workspaces/workspaces.service.spec.ts` - Workspaces service tests

**Integration Tests:**
- `apps/api/test/` - Integration tests directory

**Testing Framework:**
- Jest (NestJS default)
- Supertest for API testing

**Configuration:**
- Jest config in `apps/api/package.json`
- `apps/api/test/jest-e2e.json` for integration tests

## Writing Tests

### Unit Tests (Vitest)

Create test files alongside your source code or in `__tests__` directories:

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { YourComponent } from '../your-component';

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const { user } = render(<YourComponent />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Clicked')).toBeInTheDocument();
  });
});
```

### E2E Tests (Playwright)

Create test files in the `e2e/` directory:

```typescript
import { test, expect } from '@playwright/test';

test('user flow', async ({ page }) => {
  // Navigate to page
  await page.goto('/');

  // Interact with page
  await page.getByRole('button', { name: 'Submit' }).click();

  // Assert results
  await expect(page.getByText('Success')).toBeVisible();
});
```

### API Tests (Jest)

For NestJS API, follow the existing pattern:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { YourController } from './your.controller';
import { YourService } from './your.service';

describe('YourController', () => {
  let controller: YourController;
  let service: YourService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YourController],
      providers: [YourService],
    }).compile();

    controller = module.get<YourController>(YourController);
    service = module.get<YourService>(YourService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
```

## Test Organization

### Directory Structure

```
LivePro/
├── packages/
│   ├── ui/
│   │   ├── src/
│   │   │   └── components/
│   │   │       └── ui/
│   │   │           └── __tests__/
│   │   │               ├── button.test.tsx
│   │   │               ├── card.test.tsx
│   │   │               └── input.test.tsx
│   │   └── vitest.config.ts
│   ├── auth/
│   │   ├── src/
│   │   │   └── __tests__/
│   │   │       └── index.test.ts
│   │   └── vitest.config.ts
│   ├── motion/
│   │   ├── src/
│   │   │   └── __tests__/
│   │   │       └── index.test.ts
│   │   └── vitest.config.ts
│   └── test-config/
│       ├── vitest.config.ts
│       ├── playwright.config.ts
│       └── test-setup.ts
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   └── lib/
│   │   │       └── __tests__/
│   │   │           └── utils.test.ts
│   │   ├── e2e/
│   │   │   └── home.spec.ts
│   │   └── vitest.config.ts
│   ├── production/
│   │   ├── __tests__/
│   │   │   └── page.test.tsx
│   │   ├── e2e/
│   │   │   └── production-flow.spec.ts
│   │   └── vitest.config.ts
│   ├── staffing/
│   │   ├── __tests__/
│   │   │   └── page.test.tsx
│   │   ├── e2e/
│   │   │   └── staffing-flow.spec.ts
│   │   └── vitest.config.ts
│   ├── talent/
│   │   ├── __tests__/
│   │   │   └── page.test.tsx
│   │   ├── e2e/
│   │   │   └── talent-flow.spec.ts
│   │   └── vitest.config.ts
│   ├── finance/
│   │   ├── __tests__/
│   │   │   └── page.test.tsx
│   │   ├── e2e/
│   │   │   └── finance-flow.spec.ts
│   │   └── vitest.config.ts
│   ├── docs/
│   │   └── __tests__/
│   │       └── build.test.ts
│   └── api/
│       ├── src/
│       │   ├── app.controller.spec.ts
│       │   ├── events/
│       │   ├── schedule/
│       │   ├── stages/
│       │   ├── tasks/
│       │   └── workspaces/
│       └── test/
│           └── jest-e2e.json
```

## Continuous Integration

### GitHub Actions (To Be Implemented)

A GitHub Actions workflow should be created to:

1. **Install Dependencies**
   ```yaml
   - run: pnpm install
   ```

2. **Run Type Checking**
   ```yaml
   - run: pnpm check-types
   ```

3. **Run Linting**
   ```yaml
   - run: pnpm lint
   ```

4. **Run Unit Tests**
   ```yaml
   - run: pnpm test:unit
   ```

5. **Run E2E Tests**
   ```yaml
   - run: pnpm test:e2e
   ```

6. **Generate Coverage Reports**
   ```yaml
   - run: pnpm test:coverage
   ```

7. **Upload Coverage**
   - Upload to Codecov or similar service

### Recommended Workflow File

Create `.github/workflows/test.yml`:

```yaml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8.15.6
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Type check
        run: pnpm check-types
      
      - name: Lint
        run: pnpm lint
      
      - name: Unit tests
        run: pnpm test:unit
      
      - name: E2E tests
        run: pnpm test:e2e
        
      - name: Coverage
        run: pnpm test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

## Best Practices

### 1. Test Naming
- Use descriptive test names
- Follow the pattern: "it should [expected behavior] when [condition]"
- Example: "it should render error message when validation fails"

### 2. Test Organization
- Group related tests using `describe` blocks
- Keep tests focused and atomic
- One assertion per test when possible

### 3. Test Coverage
- Aim for 80%+ code coverage
- Focus on critical paths and business logic
- Don't test implementation details

### 4. Mocking
- Use the shared mocks from `@repo/test-config/test-setup.ts`
- Mock external dependencies
- Keep mocks simple and maintainable

### 5. E2E Tests
- Test user flows, not individual components
- Use data-testid attributes sparingly
- Prefer role-based queries (getByRole)

### 6. Performance
- Keep tests fast
- Use `test.concurrent` for parallel tests
- Avoid unnecessary waiting in E2E tests

## Troubleshooting

### Common Issues

#### 1. "vitest: command not found"
**Solution**: Run `pnpm install` from the root directory to ensure all dependencies are installed.

#### 2. Tests timing out
**Solution**: Increase timeout in vitest config or use `test.setTimeout()` for specific tests.

#### 3. E2E tests failing in CI
**Solution**: Ensure the app is running before E2E tests. Use `webServer` option in playwright config.

#### 4. Module resolution errors
**Solution**: Check that `vite-tsconfig-paths` is configured in vitest config.

## Next Steps

1. **Enhance Test Coverage**
   - Add more component tests
   - Add integration tests for complex flows
   - Expand E2E test scenarios

2. **Set Up CI/CD**
   - Create GitHub Actions workflow
   - Add test coverage reporting
   - Configure automated E2E test execution

3. **Documentation**
   - Add JSDoc comments to test utilities
   - Create video tutorials for writing tests
   - Document testing patterns and conventions

4. **Performance**
   - Optimize test execution time
   - Implement test parallelization
   - Use test sharding for large test suites

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Library Documentation](https://testing-library.com/)
- [Jest Documentation](https://jestjs.io/) (for API tests)
