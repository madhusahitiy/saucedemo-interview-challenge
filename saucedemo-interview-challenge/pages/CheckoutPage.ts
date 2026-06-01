import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  private readonly page: Page;
  private readonly checkoutButton: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton: Locator;
  private readonly completeHeader: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async startCheckout() {
    await this.checkoutButton.click();
  }

  async fillInformation(firstName: string, lastName: string, zip: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill("");
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  getSuccessMessageLocator(): Locator {
    return this.completeHeader;
  }
  getErrorMessageLocator(): Locator {
    return this.errorMessage;
  }
}