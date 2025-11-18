# Testing Quick Reference Guide

## Prerequisites

Before running tests, ensure dependencies are installed:
```bash
pnpm install
```

## Quick Commands

### Run All Tests
```bash
pnpm test                    # Run all tests in all packages/apps
pnpm test:unit              # Run all unit tests only
pnpm test:integration       # Run all integration tests only
pnpm test:e2e               # Run all E2E tests only
pnpm test:coverage          # Run tests with coverage report
```

### Development Mode
```bash
# In any package with tests:
pnpm test:watch             # Run tests in watch mode
```

## Package-Specific Testing

### UI Package (`packages/ui`)
```bash
cd packages/ui
pnpm test                   # Run component tests
pnpm test:watch            # Watch mode
pnpm test:coverage         # Coverage report
```

**Tests:**
- Button component
- Card component
- Input component

### Auth Package (`packages/auth`)
```bash
cd packages/auth
pnpm test
pnpm test:watch
pnpm test:coverage
```

### Motion Package (`packages/motion`)
```bash
cd packages/motion
pnpm test
pnpm test:watch
pnpm test:coverage
```

## App-Specific Testing

### Web App (`apps/web`)
```bash
cd apps/web
pnpm test                   # Unit tests
pnpm test:watch            # Watch mode
pnpm test:e2e              # E2E tests (requires dev server running)
pnpm test:coverage         # Coverage
```

### Production App (`apps/production`)
```bash
cd apps/production
pnpm test
pnpm test:e2e
pnpm test:coverage
```

### Staffing App (`apps/staffing`)
```bash
cd apps/staffing
pnpm test
pnpm test:e2e
pnpm test:coverage
```

### Talent App (`apps/talent`)
```bash
cd apps/talent
pnpm test
pnpm test:e2e
pnpm test:coverage
```

### Finance App (`apps/finance`)
```bash
cd apps/finance
pnpm test
pnpm test:e2e
pnpm test:coverage
```

### Docs App (`apps/docs`)
```bash
cd apps/docs
pnpm test                   # Build validation
```

### API (`apps/api`)
```bash
cd apps/api
pnpm test                   # Unit tests (Jest)
pnpm test:watch            # Watch mode
pnpm test:e2e              # Integration tests
pnpm test:coverage         # Coverage
```

## Running E2E Tests

E2E tests require the application to be running:

### Option 1: Manual Server
```bash
# Terminal 1: Start the dev server
pnpm dev

# Terminal 2: Run E2E tests
cd apps/web
pnpm test:e2e
```

### Option 2: Auto Server (Playwright)
Playwright config includes `webServer` to start automatically.

## Coverage Reports

After running `pnpm test:coverage`, view reports:

### Vitest (UI, Auth, Motion, Apps)
- Open `coverage/index.html` in browser

### Jest (API)
- Open `apps/api/coverage/lcov-report/index.html` in browser

## Debugging Tests

### Vitest UI (Interactive)
```bash
pnpm test:watch
# Press 'u' to open UI
```

### VS Code Debugging
Add to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Vitest Tests",
  "runtimeExecutable": "pnpm",
  "runtimeArgs": ["test:watch"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

### Playwright Debug Mode
```bash
PWDEBUG=1 pnpm test:e2e
```

## Common Issues

### Issue: `vitest: command not found`
**Fix:** Run `pnpm install` from root

### Issue: Tests timeout
**Fix:** Increase timeout in test file:
```typescript
test('slow test', async () => {
  // ...
}, { timeout: 10000 }); // 10 seconds
```

### Issue: E2E tests fail
**Fix:** Ensure dev server is running on correct port

### Issue: Module not found
**Fix:** Check `vitest.config.ts` has `tsconfigPaths()` plugin

## Writing New Tests

### Unit Test Template
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from './my-component';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### E2E Test Template
```typescript
import { test, expect } from '@playwright/test';

test('user can complete workflow', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Start' }).click();
  await expect(page.getByText('Success')).toBeVisible();
});
```

## Test File Naming

- Unit tests: `*.test.{ts,tsx}` or `*.spec.{ts,tsx}`
- E2E tests: `*.spec.ts` in `e2e/` directory
- Location: `__tests__/` directory or alongside source

## Useful Scripts

### Clean and Reinstall
```bash
# From root
rm -rf node_modules
pnpm install
```

### Run Specific Test File
```bash
# Vitest
pnpm vitest path/to/test.test.ts

# Playwright
pnpm playwright test path/to/test.spec.ts
```

### Update Snapshots
```bash
pnpm test -- -u
```

## CI/CD Testing

Tests run automatically on:
- Push to main/develop
- Pull requests
- Manual workflow dispatch

See `.github/workflows/test.yml` for full CI configuration.

## More Information

See [TEST_SUITE_OVERVIEW.md](./TEST_SUITE_OVERVIEW.md) for comprehensive documentation.
