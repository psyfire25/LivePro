# Testing Strategy - LivePro Monorepo

## Table of Contents
1. [Overview](#overview)
2. [Testing Pyramid](#testing-pyramid)
3. [Test Types](#test-types)
4. [Coverage Goals](#coverage-goals)
5. [Testing Patterns](#testing-patterns)
6. [Mocking Strategy](#mocking-strategy)
7. [Performance Testing](#performance-testing)
8. [Accessibility Testing](#accessibility-testing)

## Overview

The LivePro monorepo follows a comprehensive testing strategy that ensures code quality, reliability, and maintainability across all applications and packages.

### Core Principles

1. **Test Early, Test Often**: Write tests alongside production code
2. **Fast Feedback**: Keep tests fast to enable quick iteration
3. **Meaningful Coverage**: Focus on business logic and critical paths
4. **Maintainable Tests**: Write tests that are easy to understand and update
5. **Realistic Testing**: Test behavior, not implementation details

## Testing Pyramid

The LivePro testing strategy follows the testing pyramid:

```
           /\
          /  \
         / E2E \
        /--------\
       /          \
      / Integration \
     /--------------\
    /                \
   /   Unit Tests     \
  /____________________\
```

### Distribution

- **Unit Tests (70%)**: Quick, isolated tests for individual functions/components
- **Integration Tests (20%)**: Testing interactions between components/modules
- **E2E Tests (10%)**: Full user journey testing

## Test Types

### 1. Unit Tests

**Purpose**: Test individual units of code in isolation

**Tools**: 
- Vitest (packages, Next.js apps)
- Jest (NestJS API)

**What to Test**:
- Pure functions
- React components
- Utility functions
- Service methods
- Controller logic

**Example**:
```typescript
describe('calculateTotal', () => {
  it('should sum all item prices', () => {
    const items = [
      { price: 10 },
      { price: 20 },
      { price: 30 }
    ];
    expect(calculateTotal(items)).toBe(60);
  });

  it('should return 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });
});
```

### 2. Integration Tests

**Purpose**: Test interactions between multiple components/modules

**Tools**:
- Vitest with React Testing Library
- Jest with Supertest (API)

**What to Test**:
- Component composition
- Data flow between components
- API endpoint integration
- Database operations

**Example**:
```typescript
describe('TaskForm', () => {
  it('should submit task and update list', async () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} />);
    
    await userEvent.type(screen.getByLabelText('Task Name'), 'New Task');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    
    expect(onSubmit).toHaveBeenCalledWith({ name: 'New Task' });
  });
});
```

### 3. End-to-End (E2E) Tests

**Purpose**: Test complete user workflows from UI to backend

**Tools**: Playwright

**What to Test**:
- Critical user journeys
- Authentication flows
- Multi-step processes
- Cross-page navigation

**Example**:
```typescript
test('user can create and complete a task', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('[name="email"]', 'user@example.com');
  await page.fill('[name="password"]', 'password');
  await page.click('button[type="submit"]');
  
  // Navigate to tasks
  await page.click('a[href="/tasks"]');
  
  // Create task
  await page.click('button:has-text("New Task")');
  await page.fill('[name="title"]', 'Test Task');
  await page.click('button:has-text("Save")');
  
  // Verify task appears
  await expect(page.locator('text=Test Task')).toBeVisible();
  
  // Complete task
  await page.click('[data-testid="task-checkbox"]');
  
  // Verify completion
  await expect(page.locator('.completed')).toContainText('Test Task');
});
```

## Coverage Goals

### Overall Targets

- **Packages**: 85%+ coverage
- **Applications**: 75%+ coverage
- **Critical Paths**: 95%+ coverage

### Package-Specific Goals

#### UI Package (@repo/ui)
- **Target**: 90%
- **Focus**: All exported components
- **Priority**: Button, Form, Modal, Card components

#### Auth Package (@repo/auth)
- **Target**: 95%
- **Focus**: Authentication and authorization logic
- **Priority**: Login, logout, token validation

#### Motion Package (@repo/motion)
- **Target**: 80%
- **Focus**: Animation utilities
- **Priority**: Core animation functions

### Application-Specific Goals

#### API (apps/api)
- **Target**: 85%
- **Focus**: Controllers, Services, Guards
- **Priority**: Authentication, Task management, Workspace management

#### Web App (apps/web)
- **Target**: 75%
- **Focus**: Pages, shared components
- **Priority**: Home page, navigation, core UI

#### Production App (apps/production)
- **Target**: 75%
- **Focus**: Production-specific features
- **Priority**: Production workflows, forms

#### Staffing App (apps/staffing)
- **Target**: 75%
- **Focus**: Staffing management
- **Priority**: Staff scheduling, assignment

#### Talent App (apps/talent)
- **Target**: 75%
- **Focus**: Talent management
- **Priority**: Talent profiles, search

#### Finance App (apps/finance)
- **Target**: 75%
- **Focus**: Financial features
- **Priority**: Payment processing, reporting

## Testing Patterns

### 1. Arrange-Act-Assert (AAA)

Structure all tests using AAA pattern:

```typescript
test('validates email format', () => {
  // Arrange
  const email = 'invalid-email';
  
  // Act
  const result = validateEmail(email);
  
  // Assert
  expect(result.isValid).toBe(false);
  expect(result.error).toBe('Invalid email format');
});
```

### 2. Given-When-Then (BDD)

For complex scenarios, use BDD style:

```typescript
test('user authentication flow', async () => {
  // Given a user with valid credentials
  const credentials = { email: 'user@test.com', password: 'Pass123!' };
  
  // When they attempt to login
  const response = await login(credentials);
  
  // Then they receive a valid token
  expect(response.token).toBeDefined();
  expect(response.user.email).toBe(credentials.email);
});
```

### 3. Test Data Builders

Create reusable test data builders:

```typescript
class UserBuilder {
  private user: Partial<User> = {
    email: 'test@example.com',
    name: 'Test User',
    role: 'user'
  };

  withEmail(email: string) {
    this.user.email = email;
    return this;
  }

  withRole(role: string) {
    this.user.role = role;
    return this;
  }

  build(): User {
    return this.user as User;
  }
}

// Usage
test('admin can delete users', () => {
  const admin = new UserBuilder()
    .withRole('admin')
    .build();
  
  expect(canDeleteUsers(admin)).toBe(true);
});
```

### 4. Custom Render Functions

Create custom render functions for common setups:

```typescript
// test-utils.tsx
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </Provider>
    );
  }
  
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Usage
test('renders with theme', () => {
  renderWithProviders(<MyComponent />);
  // ...
});
```

## Mocking Strategy

### 1. External APIs

Mock external API calls:

```typescript
// __mocks__/api-client.ts
export const apiClient = {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn()
};

// In test
import { apiClient } from '../api-client';

test('fetches user data', async () => {
  apiClient.get.mockResolvedValue({ id: 1, name: 'John' });
  
  const user = await getUser(1);
  
  expect(user.name).toBe('John');
  expect(apiClient.get).toHaveBeenCalledWith('/users/1');
});
```

### 2. Browser APIs

Global mocks are in `test-setup.ts`:
- `ResizeObserver`
- `IntersectionObserver`
- `window.matchMedia`

Add more as needed:

```typescript
// test-setup.ts
global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};
```

### 3. Next.js Router

Mock Next.js router:

```typescript
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn()
  }),
  usePathname: () => '/test-path'
}));
```

### 4. Database

For API tests, use test database or mock Prisma:

```typescript
// __mocks__/prisma.ts
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'vitest-mock-extended';

export type MockPrisma = DeepMockProxy<PrismaClient>;

export const prismaMock = mockDeep<PrismaClient>();
```

## Performance Testing

### Load Testing

Use k6 or Artillery for load testing:

```javascript
// load-test.js
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 100, // Virtual users
  duration: '30s'
};

export default function() {
  const res = http.get('http://localhost:4000/api/tasks');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200
  });
}
```

### Performance Budgets

Set performance budgets in tests:

```typescript
test('page loads within budget', async ({ page }) => {
  const startTime = Date.now();
  
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  const loadTime = Date.now() - startTime;
  
  expect(loadTime).toBeLessThan(3000); // 3 second budget
});
```

## Accessibility Testing

### 1. Automated a11y Testing

Use axe-core for automated accessibility testing:

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('has no a11y violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 2. Keyboard Navigation

Test keyboard accessibility:

```typescript
test('can navigate with keyboard', async () => {
  render(<Navigation />);
  
  const firstLink = screen.getAllByRole('link')[0];
  firstLink.focus();
  
  await userEvent.keyboard('{Tab}');
  
  const secondLink = screen.getAllByRole('link')[1];
  expect(secondLink).toHaveFocus();
});
```

### 3. Screen Reader Testing

Test with Playwright screen reader support:

```typescript
test('announces form errors', async ({ page }) => {
  await page.goto('/form');
  
  const announcements = [];
  page.on('ariaSnapshot', (snapshot) => {
    announcements.push(snapshot);
  });
  
  await page.click('button[type="submit"]');
  
  expect(announcements).toContain('Email is required');
});
```

## Visual Regression Testing

### Setup Playwright Visual Testing

```typescript
test('homepage looks correct', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png');
});
```

### Update Snapshots

```bash
pnpm test:e2e --update-snapshots
```

## Test Organization Best Practices

### 1. File Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── Form/
│       ├── Form.tsx
│       ├── Form.test.tsx
│       └── index.ts
```

### 2. Test Naming

```typescript
// Good
describe('UserProfile', () => {
  it('should display user name when user is logged in', () => {});
  it('should show login prompt when user is logged out', () => {});
});

// Avoid
describe('UserProfile', () => {
  it('works', () => {});
  it('test2', () => {});
});
```

### 3. Setup and Teardown

```typescript
describe('Database operations', () => {
  beforeEach(async () => {
    await database.connect();
    await database.seed();
  });

  afterEach(async () => {
    await database.clean();
    await database.disconnect();
  });

  it('creates a user', async () => {
    // Test implementation
  });
});
```

## Continuous Improvement

### 1. Monitor Coverage Trends

Track coverage over time:
- Set minimum coverage requirements
- Fail builds if coverage drops
- Review coverage reports regularly

### 2. Test Performance

Monitor test execution time:
- Identify slow tests
- Optimize slow tests
- Parallelize test execution

### 3. Review Test Quality

Regular test reviews:
- Are tests readable?
- Are tests maintainable?
- Are tests testing the right things?
- Can tests be simplified?

## Resources

- [Vitest Best Practices](https://vitest.dev/guide/best-practices)
- [Testing Library Guiding Principles](https://testing-library.com/docs/guiding-principles)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Kent C. Dodds - Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
