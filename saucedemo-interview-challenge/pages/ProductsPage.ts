import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  private page: Page;
  private productSortDropdown: Locator;
  private shoppingCartLink: Locator;
  private shoppingCartBadge: Locator;
  private logoutSidebarLink: Locator;
  private menuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productSortDropdown = page.locator('[data-test="product-sort-container"]');
    this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutSidebarLink = page.locator('[data-test="logout-sidebar-link"]');
  }
  async getAllProductPrices() {
    const pricesText = await this.page.locator('[data-test="inventory-item-price"]').allTextContents();
    return pricesText.map(price => parseFloat(price.replace('$', '')));
  }
  async getProductPriceByName(productName: string) {
    const product = this.page.locator('.inventory_item').filter({
      hasText: productName
    });
  
    const priceText = await product.locator('.inventory_item_price').textContent();
  
    return Number(priceText?.replace('$', ''));
  }
  async getCartBadgeCount() {
    return await this.shoppingCartBadge.textContent();
  }
  
  async selectSortOption(option: string) {
    await this.productSortDropdown.selectOption(option);
  }
  async addItemToCart(itemName: string) {
    const itemContainer = this.page.locator('[data-test="inventory-item"]', { hasText: itemName });
    await itemContainer.locator('button').click();
  }
  async navigateToCart() {
    await this.shoppingCartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutSidebarLink.waitFor({ state: 'visible' });
    await this.logoutSidebarLink.click();
  }
}