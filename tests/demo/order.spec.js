import { test, expect } from '@playwright/test';
import { appElements } from '../pages/app'
import { login } from '../pages/login'
import { dashboard } from '../pages/dashboard'

test.describe('Dashboard Functionality', () => {

test.beforeEach(async ({ page }) => {
// Login before each test
await page.goto('');
await page.locator(login.username).fill('Tester');
await page.locator(login.password).fill('test');
await page.locator(login.submitButton).click();
});

    test('Should login and place the order', async ({ page }) => {
      await page.waitForTimeout(1000);
      await page.getByRole('link', { name: 'Order', exact: true }).click();
      await page.getByLabel('Product:*').selectOption('FamilyAlbum');
      await page.getByLabel('Quantity:*').fill('3');
      await page.getByLabel('Discount:').fill('10');
      await page.getByRole('button', { name: 'Calculate' }).click();
      await page.getByLabel('Customer name:*').fill('John Terry');
      await page.getByLabel('Street:*').fill('852 Road');
      await page.getByLabel('City:*').fill('Chicago');
      await page.getByLabel('State:').fill('IL');
      await page.getByLabel('Zip:*').fill('60611');
      await page.getByLabel('Visa').check();
      await page.getByLabel('Card Nr:*').fill('4736763387988673');
      await page.getByLabel('Expire date (mm/yy):*').fill('01/28');
      await page.getByRole('link', { name: 'Process' }).click();
    });

   test('Should handle popup, select last item from table and delete it', async ({ page }) => {
      // Navigate to View all orders page
      await page.getByRole('link', { name: 'View all orders' }).click();
      
      // Wait for the orders table to be visible
      await page.locator(dashboard.ordersTable).waitFor({ state: 'visible' });
      
      // Get all rows from the table (excluding the header row)
      const rows = await page.locator(`${dashboard.ordersTable} tr:not(:first-child)`).all();
      console.log(`Found ${rows.length} rows in the table`);
      
      if (rows.length > 0) {
        // Select the last row in the table
        const lastRowIndex = rows.length - 1; 
        
        // Find the checkbox in the last row (typically in the first cell)
        const lastRowCheckbox = await rows[lastRowIndex].locator('input[type="checkbox"]');
        await lastRowCheckbox.check();
        
        // Set up the dialog handler before clicking the delete button
        page.on('dialog', async dialog => {
          console.log(`Dialog message: ${dialog.message()}`);
          await dialog.accept(); // This clicks the OK button
        });
        
        // Click the Delete Selected button
        await page.locator('#ctl00_MainContent_btnDelete').click();
        
        // Verify the row was deleted (optional)
        await page.waitForTimeout(1000); // Wait for the page to refresh
        const rowsAfterDelete = await page.locator(`${dashboard.ordersTable} tr:not(:first-child)`).all();
        console.log(`Found ${rowsAfterDelete.length} rows after deletion`);
        expect(rowsAfterDelete.length).toBe(rows.length - 1);
      } else {
        console.log('No rows found in the table to delete');
      }
    });

    });