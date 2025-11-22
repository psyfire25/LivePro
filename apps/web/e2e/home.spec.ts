import { test, expect } from '@playwright/test';

test('redirects to sign-in when not authenticated', async ({ page }) => {
    await page.goto('/');

    // Expect to be redirected to the sign-in page
    await expect(page).toHaveURL(/.*sign-in.*/);
});

test('get started link', async ({ page }) => {
    await page.goto('/');

    // Click the get started link.
    // await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
