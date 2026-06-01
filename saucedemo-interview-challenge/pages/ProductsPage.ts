import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  private readonly page: Page;
  private readonly cartBadge: Locator;
  private readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addProductToCart(productName: string) {
    // Converts "Sauce Labs Backpack" to "sauce-labs-backpack" matching the real page IDs
    const formattedName = productName.toLowerCase().replace(/ /g, '-');
    await this.page.locator(`[data-test="add-to-cart-${formattedName}"]`).click();
  }

  async getCartCount(): Promise<string | null> {
    if (await this.cartBadge.isVisible()) {
      return await this.cartBadge.textContent();
    }
    return '0';
  }

  async goToCart() {
    await this.cartLink.click();
  }
}