import { test, expect } from '@playwright/test';

test.describe('Login page', () => {
  test('Login page', async ({ page }) => {
    await page.goto('/login');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("Easy Compare");
    await expect(page.getByRole('link', { name: 'No acccount? Create one!'})).toBeVisible()
    await expect(page.getByRole('button', { name: 'Log in'})).toBeVisible()
  });
})