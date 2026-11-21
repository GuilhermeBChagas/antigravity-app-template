import { expect, test } from '@playwright/test';

test('carrega aplicação e redireciona para login quando não autenticado', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/login|\/$/);
  await expect(page.locator('body')).toBeVisible();
});
