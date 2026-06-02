import { test, expect } from '@playwright/test';
import data from '../test-data/users.json';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

  test('sorting works correctly for standard user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.navigate();
    await loginPage.login(data.standard_user.username, data.standard_user.password);

    const before = await productsPage.getAllProductPrices();
    await productsPage.selectSortOption('hilo');
    const after = await productsPage.getAllProductPrices();

    expect(after).toEqual([...before].sort((a, b) => b - a));
  });

  test('sorting does not break UI for problem_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
  
    await loginPage.navigate();
    await loginPage.login(data.problem_user.username, data.problem_user.password);
  
    await productsPage.selectSortOption('hilo');
  
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
    const count = await page.locator('[data-test="inventory-item"]').count();
expect(count).toBeGreaterThan(0);
  });

  test('sorting works under slow performance conditions', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
  
    await loginPage.navigate();
    await loginPage.login(data.performance_glitch_user.username, data.performance_glitch_user.password);
  
    const before = await productsPage.getAllProductPrices();
  
    await productsPage.selectSortOption('hilo');
    await page.waitForTimeout(1000);
  
    const after = await productsPage.getAllProductPrices();
    expect(after).toEqual([...before].sort((a, b) => b - a));
  });