import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';


let customer;
test.beforeEach( async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */

  const addCustomerPage = new AddCustomerPage(page)

 customer = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postCode: faker.location.zipCode(),
  };

  await addCustomerPage.open()
  await addCustomerPage.fillCustomerFirstName(customer.firstName)
  await addCustomerPage.fillCustomerLastName(customer.lastName)
  await addCustomerPage.fillCustomerPostCode(customer.postCode)
  await addCustomerPage.clickAddCustomerButton()
  await addCustomerPage.reloadPage()

});

test('Assert manager can add new customer', async ({ page }) => {
/* 
Test:
1. Click [Open Account].
2. Select Customer name you just created.
3. Select currency.
4. Click [Process].
5. Reload the page (This is a simplified step to close the popup).
6. Click [Customers].
7. Assert the customer row has the account number not empty.

Tips:
 1. Do not rely on the customer row id for the step 13. Use the ".last()" locator to get the last row.
*/
const addCustomerPage = new AddCustomerPage(page)

await addCustomerPage.clickOnAccountButton()
await addCustomerPage.waitForAccoutPage()
await addCustomerPage.chooseNewCustomer(customer.firstName, customer.lastName)
await addCustomerPage.selectCurrencyByName('Dollar')
await addCustomerPage.clickProcessButton()
await addCustomerPage.reloadPage()

await addCustomerPage.clickOnCustomersButton()
await addCustomerPage.checkAccountNumerIsNotEmpty()
});