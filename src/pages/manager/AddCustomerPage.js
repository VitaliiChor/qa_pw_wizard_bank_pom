const { expect } = require('@playwright/test');

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name')
    this.lastNameField = page.getByPlaceholder('Last Name')
    this.postCodeField = page.getByPlaceholder('Post Code')
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' })
    this.customersButton = page.getByRole('button', { name: 'Customers' })
    this.accountButton = page.getByRole('button', { name: 'Open Account' })
    this.customerField = page.locator('#userSelect')
    this.currencyField = page.locator('#currency')
    this.processButton = page.getByRole('button', { name: 'Process' })
    this.customersTable = page.locator('table')
    this.searchCustomerField = page.getByPlaceholder('Search Customer')
  }


  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async waitForLoading() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list')
  }

  async waitForAccoutPage() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/openAccount')
  }

  async fillCustomerFirstName(customerName) {
    await this.firstNameField.fill(customerName)
  }

  async fillCustomerLastName(customerLastName) {
    await this.lastNameField.fill(customerLastName)
  }

  async fillCustomerPostCode(customerPostCode) {
    await this.postCodeField.fill(customerPostCode)
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click()
  }

  async reloadPage() {
    await this.page.reload()
  }

  async clickOnCustomersButton() {
    await this.customersButton.click()
  }

  async clickOnAccountButton() {
    await this.accountButton.click()
  }

  async chooseNewCustomer(firstName, lastName) {
    const fullName = `${firstName} ${lastName}`;
    await this.customerField.selectOption({ label: fullName });
  }

  async selectCurrencyByName(currencyName) {
    await this.currencyField.selectOption({ label: currencyName });
    await expect(this.currencyField.locator('option:checked')).toHaveText(currencyName);
  }

  async clickProcessButton() {
    await this.processButton.click()
  }

  async checkAccountNumerIsNotEmpty() {
    const lastRow = this.customersTable.locator('tbody tr').last()
    const cells = lastRow.locator('td')

    await expect(cells.nth(3)).not.toHaveText('')
  }

  async searchCustomerByFirstName(customerName) {
    const customerRow = this.customersTable.locator('tbody tr')
    await this.searchCustomerField.fill(customerName)
    await expect(customerRow).toContainText(customerName)
    await expect(customerRow).toHaveCount(1)
  }

  async searchCustomerByLastName(customerLastName) {
    const customerRow = this.customersTable.locator('tbody tr')
    await this.searchCustomerField.fill(customerLastName)
    await expect(customerRow).toContainText(customerLastName)
    await expect(customerRow).toHaveCount(1)
  }

  async searchCustomerByPostCode(customerPostCode) {
    const customerRow = this.customersTable.locator('tbody tr')
    await this.searchCustomerField.fill(customerPostCode)
    await expect(customerRow).toContainText(customerPostCode)
    await expect(customerRow).toHaveCount(1)
  }
}