const { expect } = require('@playwright/test');

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustommerButton = page.getByRole('button', { name: 'Add Customer' })
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' })
    this.customersButton = page.getByRole('button', { name: 'Customers' })
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/login');
  }


  async waitForLoadingManagerMainPage() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager')
  }

  async checkButtonsVisibility() {
    await expect(this.addCustommerButton).toBeVisible()
    await expect(this.openAccountButton).toBeVisible()
    await expect(this.customersButton).toBeVisible()
  }
}