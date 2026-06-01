import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import testData from '../test-data/users.json';

test.describe('Sauce Labs Shop Core Journeys', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login(testData.validUser.username, testData.validUser.password);
  });

  test('TC1 - Standard user is able to login successfully', async ({ page }) => {
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('TC2 - User can add a product to the cart', async () => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    const cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe('1');
  });

  test('TC3 - User can successfully complete the checkout journey', async () => {
    await productsPage.addProductToCart('Sauce Labs Backpack');
    await productsPage.goToCart();
    
    await checkoutPage.startCheckout();
    await checkoutPage.fillInformation(
      testData.checkoutInfo.firstName,
      testData.checkoutInfo.lastName,
      testData.checkoutInfo.zipCode
    );
    await checkoutPage.finishOrder();

    const successHeader = checkoutPage.getSuccessMessageLocator();
    await expect(successHeader).toHaveText('Thank you for your order!');
  });
});