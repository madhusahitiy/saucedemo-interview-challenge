import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  private page: Page;
  private checkoutButton: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private postalCodeInput: Locator;
  private continueButton: Locator;
  private finishButton: Locator;
  private completeHeader: Locator;
  private subtotalLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async getCheckoutSubtotal() {
    const text = await this.subtotalLabel.textContent();
    return text ? parseFloat(text.replace(/[^0-9.]/g, '')) : 0;
  }
  // Pure, clean business method named exactly what you requested
  async getAllCheckoutItemPrices() {
    const prices = await this.page.locator('[data-test="inventory-item-price"]').allTextContents();
  
    return prices.map(price =>
      Number(price.replace('$', '').trim())
    );
  }
  async finishCheckout() {
    await this.finishButton.click();
  }

  async getConfirmationHeader() {
    return this.completeHeader;
  }
}