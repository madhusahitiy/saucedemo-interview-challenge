import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import data from '../test-data/users.json';

test.describe('SauceDemo E2E Flow', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    // login as standard_user
    await loginPage.login(data.standard_user.username,data.standard_user.password); 

    await expect(page).toHaveURL(/inventory.html/);
  });

  test('user can complete purchase from login to confirmation', async ({ page }) => {
    const items = [
      data.available_products[0],
      data.available_products[1]
    ];
    //add items to cart
    for (const item of items) {
      await productsPage.addItemToCart(item);
    }
    await productsPage.navigateToCart();
    await checkoutPage.proceedToCheckout();

    await checkoutPage.fillCustomerInformation(
      data.checkoutInfo.firstName,
      data.checkoutInfo.lastName,
      data.checkoutInfo.zipCode
    );

    await checkoutPage.continueCheckout();
    await checkoutPage.finishCheckout();

    const confirmation = await checkoutPage.getConfirmationHeader();
    //validating purchase
    await expect(confirmation).toContainText('Thank you for your order!');

    await productsPage.logout();

    //validating logout and entiering login page again
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});