import { test, expect } from '@playwright/test';
import data from '../test-data/users.json';
import { LoginPage } from '../pages/LoginPage';

test.describe('Product navigation', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(data.standard_user.username,data.standard_user.password);
  });

  const indexes = [0, 1, 2];

  for (const index of indexes) {
    test(`product ${index} opens correctly`, async ({ page }) => {

      const item = page.locator('[data-test="inventory-item"]').nth(index);

      const productName = await item.locator('[data-test="inventory-item-name"]').textContent();

      await expect(item).toBeVisible();

      await item.locator('[data-test="inventory-item-name"]').click();

      const detailName = page.locator('[data-test="inventory-item-name"]');

      await expect(detailName).toHaveText(productName!.trim());
      await expect(page.getByText('Back to products')).toBeVisible();
    });
  }
});