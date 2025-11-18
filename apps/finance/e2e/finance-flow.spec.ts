import { test, expect } from '@playwright/test';

test('finance app home page loads', async ({ page }) => {
    await page.goto('/');

    // Basic test - update based on actual finance app content
    await expect(page).toHaveTitle(/Finance/i);
});
