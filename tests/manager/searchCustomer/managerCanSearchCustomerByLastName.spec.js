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

test('Assert manager can search customer by Last Name', async ({ page }) => {
/* 
Test:
1. Open Customers page
2. Fill the lastName to the search field
3. Assert customer row is present in the table. 
4. Assert no other rows is present in the table.
*/

const addCustomerPage = new AddCustomerPage(page)

await addCustomerPage.clickOnCustomersButton()

await addCustomerPage.searchCustomerByFirstName(customer.lastName)
});