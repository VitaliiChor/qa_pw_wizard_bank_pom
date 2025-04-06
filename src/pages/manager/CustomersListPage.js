const { expect } = require('@playwright/test');

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customersTable = page.locator('table')
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async findUserInCustomerTable(firstName, lastName, postCode) {
    const lastRow = this.customersTable.locator('tbody tr').last()
    const cells = lastRow.locator('td')

    await expect(cells.nth(0)).toContainText(firstName)
    await expect(cells.nth(1)).toContainText(lastName)
    await expect(cells.nth(2)).toContainText(postCode)
    await expect(cells.nth(3)).toHaveText('')
  }

  async deleteCustomer(firstName, lastName, postCode) {
    const deleteCustomer = this.page.getByRole('row', { name: `${firstName} ${lastName} ${postCode} Delete` }).getByRole('button')
    await deleteCustomer.click()
    await expect(deleteCustomer).toBeHidden()
  }

  async reloadPage() {
    await this.page.reload()
  }

  async assertUserNotInCustomerTable(firstName, lastName, postCode) {
    const rowLocator = this.customersTable.locator(`tbody tr:has(td:text("${firstName}") and td:text("${lastName}") and td:text("${postCode}"))`);
    await expect(rowLocator).toBeHidden();  
  }
}