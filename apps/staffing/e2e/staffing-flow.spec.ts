import { test, expect } from '@playwright/test';

test('staffing app home page loads', async ({ page }) => {
    await page.goto('/');

    // Basic test - update based on actual staffing app content
    await expect(page).toHaveTitle(/Staffing/i);
});
