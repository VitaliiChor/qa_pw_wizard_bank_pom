const { expect } = require('@playwright/test');

export class AddCustomerPage {
  constructor(page) {
    this.page = page; 
    this.currencyField = page.locator('#currency')
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async selectCurrencyByName(currencyName) {
    await this.currencyField.selectOption({ label: currencyName });
    await expect(this.currencyField.locator('option:checked')).toHaveText(currencyName);
  }

}