import { test, expect } from '@playwright/test';

test('talent app home page loads', async ({ page }) => {
    await page.goto('/');

    // Basic test - update based on actual talent app content
    await expect(page).toHaveTitle(/Talent/i);
});
