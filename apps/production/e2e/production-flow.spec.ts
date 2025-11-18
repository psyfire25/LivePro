import { test, expect } from '@playwright/test';

test('production app home page loads', async ({ page }) => {
    await page.goto('/');

    // Basic test - update based on actual production app content
    await expect(page).toHaveTitle(/Production/i);
});
