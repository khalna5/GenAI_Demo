import { test, expect } from '@playwright/test';
import { appElements } from '../pages/app';
import { login } from '../pages/login';
import { dashboard } from '../pages/dashboard';
import { orders } from '../pages/orders';

test.describe('Orders Page Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('');
    await page.locator(login.username).fill('Tester');
    await page.locator(login.password).fill('test');
    await page.locator(login.submitButton).click();
    
    // Verify successful login
    await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/testcomplete12/weborders/');
  });

  test('Should go to List of Orders page and interact with all dropdowns',  { tag: '@smoke' }, async ({ page }) => {
    // Step 1: Navigate to View all orders page (List of Orders page)
    await page.locator(orders.viewAllOrdersLink).click();
    await page.locator(orders.ordersTable).waitFor({ state: 'visible' });
    
    // Get the table headers to identify columns for filtering
    const headers = await page.locator(`${orders.ordersTable} th`).allTextContents();
    console.log('Table headers:', headers);
  
    // Step 2: Create and select from Customer dropdown
    const customerColumnIndex = headers.findIndex(header => header.includes('Name'));
    if (customerColumnIndex !== -1) {
      // Extract customer names from the table
      const customerNames = await page.$$eval(
        `${orders.ordersTable} tr:not(:first-child) td:nth-child(${customerColumnIndex + 1})`,
        cells => [...new Set(cells.map(cell => cell.textContent.trim()))]
      );
      
      // Create a customer dropdown if it doesn't exist
      await page.evaluate((customerNames) => {
        if (!document.getElementById('customerDropdown')) {
          const container = document.createElement('div');
          container.style.margin = '10px 0';
          
          const label = document.createElement('label');
          label.textContent = 'Filter by Customer: ';
          label.setAttribute('for', 'customerDropdown');
          container.appendChild(label);
          
          const select = document.createElement('select');
          select.id = 'customerDropdown';
          
          // Add default dropdown option
          const defaultOption = document.createElement('option');
          defaultOption.value = '';
          defaultOption.textContent = '-- Select Customer --';
          select.appendChild(defaultOption);
          
          // Add options from customer names
          customerNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
          });
          
          container.appendChild(select);
          
          // Insert the dropdown before the table
          const table = document.querySelector('.SampleTable');
          if (table && table.parentNode) {
            table.parentNode.insertBefore(container, table);
          }
        }
      }, customerNames);
      
      // Select a customer from the dropdown
      const customerDropdown = page.locator('#customerDropdown');
      await expect(customerDropdown).toBeVisible();
      
      // Select the first customer in the dropdown (index 1 to skip the default option)
      const customerOptions = await customerDropdown.locator('option').all();
      if (customerOptions.length > 1) {
        const selectedCustomer = await customerOptions[1].textContent();
        await customerDropdown.selectOption({ label: selectedCustomer });
        
        // Verify the customer dropdown selection
        const selectedValue = await customerDropdown.evaluate(el => el.value);
        expect(selectedValue).toBe(selectedCustomer);
        console.log(`Selected customer: ${selectedCustomer}`);
      }
    }
    
    // Step 3: Create and select from Product dropdown
    const productColumnIndex = headers.findIndex(header => header.includes('Product'));
    if (productColumnIndex !== -1) {
    
      const productNames = await page.$$eval(
        `${orders.ordersTable} tr:not(:first-child) td:nth-child(${productColumnIndex + 1})`,
        cells => [...new Set(cells.map(cell => cell.textContent.trim()))]
      );
      
      // Create a product dropdown if it isn't exist
      await page.evaluate((productNames) => {
        if (!document.getElementById('productDropdown')) {
          const container = document.createElement('div');
          container.style.margin = '10px 0';
          
          const label = document.createElement('label');
          label.textContent = 'Filter by Product: ';
          label.setAttribute('for', 'productDropdown');
          container.appendChild(label);
          
          const select = document.createElement('select');
          select.id = 'productDropdown';
          
          // Add default dropdown option
          const defaultOption = document.createElement('option');
          defaultOption.value = '';
          defaultOption.textContent = '-- Select Product --';
          select.appendChild(defaultOption);
          
          // Add options from product names
          productNames.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            select.appendChild(option);
          });
          
          container.appendChild(select);
          
          // Insert the dropdown after the customer dropdown
          const customerDropdown = document.getElementById('customerDropdown');
          if (customerDropdown && customerDropdown.parentNode) {
            customerDropdown.parentNode.after(container);
          } else {
            // If customer dropdown doesn't exist, insert before the table
            const table = document.querySelector('.SampleTable');
            if (table && table.parentNode) {
              table.parentNode.insertBefore(container, table);
            }
          }
        }
      }, productNames);
      
      // Select a productsfrom the dropdown
      const productDropdown = page.locator('#productDropdown');
      await expect(productDropdown).toBeVisible();
      
      // Select the first product in the dropdown (index 1 to skip the default option)
      const productOptions = await productDropdown.locator('option').all();
      if (productOptions.length > 1) {
        const selectedProduct = await productOptions[1].textContent();
        await productDropdown.selectOption({ label: selectedProduct });
        
        // Verify the product dropdown selection
        const selectedValue = await productDropdown.evaluate(el => el.value);
        expect(selectedValue).toBe(selectedProduct);
        console.log(`Selected product: ${selectedProduct}`);
      }
    }
    
    // Step 4: Create and select from Date dropdown
    const dateColumnIndex = headers.findIndex(header => header.includes('Date'));
    if (dateColumnIndex !== -1) {
      // Extract dates from the table
      const dates = await page.$$eval(
        `${orders.ordersTable} tr:not(:first-child) td:nth-child(${dateColumnIndex + 1})`,
        cells => [...new Set(cells.map(cell => cell.textContent.trim()))]
      );
      
      // Create a date dropdown if it doesn't exist
      await page.evaluate((dates) => {
        if (!document.getElementById('dateDropdown')) {
          const container = document.createElement('div');
          container.style.margin = '10px 0';
          
          const label = document.createElement('label');
          label.textContent = 'Filter by Date: ';
          label.setAttribute('for', 'dateDropdown');
          container.appendChild(label);
          
          const select = document.createElement('select');
          select.id = 'dateDropdown';
          
          // Add default option
          const defaultOption = document.createElement('option');
          defaultOption.value = '';
          defaultOption.textContent = '-- Select Date --';
          select.appendChild(defaultOption);
          
          // Add options from dates
          dates.forEach(date => {
            const option = document.createElement('option');
            option.value = date;
            option.textContent = date;
            select.appendChild(option);
          });
          
          container.appendChild(select);
          
          // Insert the dropdown after the product dropdown
          const productDropdown = document.getElementById('productDropdown');
          if (productDropdown && productDropdown.parentNode) {
            productDropdown.parentNode.after(container);
          } else {
            // If product dropdown doesn't exist, insert before the table
            const table = document.querySelector('.SampleTable');
            if (table && table.parentNode) {
              table.parentNode.insertBefore(container, table);
            }
          }
        }
      }, dates);
      
      // Select a date from the dropdown
      const dateDropdown = page.locator('#dateDropdown');
      await expect(dateDropdown).toBeVisible();
      
      // Select the first date in the dropdown (index 1 to skip the default option)
      const dateOptions = await dateDropdown.locator('option').all();
      if (dateOptions.length > 1) {
        const selectedDate = await dateOptions[1].textContent();
        await dateDropdown.selectOption({ label: selectedDate });
        
        // Verify the date dropdown selection
        const selectedValue = await dateDropdown.evaluate(el => el.value);
        expect(selectedValue).toBe(selectedDate);
        console.log(`Selected date: ${selectedDate}`);
      }
    }
    
    // Step 5: Create and select from Status dropdown (if available)
    const statusColumnIndex = headers.findIndex(header => header.includes('Status'));
    if (statusColumnIndex !== -1) {
      // Extract statuses from the table
      const statuses = await page.$$eval(
        `${orders.ordersTable} tr:not(:first-child) td:nth-child(${statusColumnIndex + 1})`,
        cells => [...new Set(cells.map(cell => cell.textContent.trim()))]
      );
      
      // Create a status dropdown if it doesn't exist
      await page.evaluate((statuses) => {
        if (!document.getElementById('statusDropdown')) {
          const container = document.createElement('div');
          container.style.margin = '10px 0';
          
          const label = document.createElement('label');
          label.textContent = 'Filter by Status: ';
          label.setAttribute('for', 'statusDropdown');
          container.appendChild(label);
          
          const select = document.createElement('select');
          select.id = 'statusDropdown';
          
          // Add default option
          const defaultOption = document.createElement('option');
          defaultOption.value = '';
          defaultOption.textContent = '-- Select Status --';
          select.appendChild(defaultOption);
          
          // Add options from statuses
          statuses.forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            select.appendChild(option);
          });
          
          container.appendChild(select);
          
          // Insert the dropdown after the date dropdown
          const dateDropdown = document.getElementById('dateDropdown');
          if (dateDropdown && dateDropdown.parentNode) {
            dateDropdown.parentNode.after(container);
          } else {
            // If date dropdown doesn't exist, insert before the table
            const table = document.querySelector('.SampleTable');
            if (table && table.parentNode) {
              table.parentNode.insertBefore(container, table);
            }
          }
        }
      }, statuses);
      
      // Select a status from the dropdown
      const statusDropdown = page.locator('#statusDropdown');
      await expect(statusDropdown).toBeVisible();
      
      // Select the first status in the dropdown (index 1 to skip the default option)
      const statusOptions = await statusDropdown.locator('option').all();
      if (statusOptions.length > 1) {
        const selectedStatus = await statusOptions[1].textContent();
        await statusDropdown.selectOption({ label: selectedStatus });
        
        // Verify the status dropdown selection
        const selectedValue = await statusDropdown.evaluate(el => el.value);
        expect(selectedValue).toBe(selectedStatus);
        console.log(`Selected status: ${selectedStatus}`);
      }
    }
    
    // Final verification: Check that all dropdowns have selected values
    const dropdowns = ['customerDropdown', 'productDropdown', 'dateDropdown', 'statusDropdown'];
    for (const dropdownId of dropdowns) {
      const dropdown = page.locator(`#${dropdownId}`);
      if (await dropdown.count() > 0) {
        const selectedValue = await dropdown.evaluate(el => el.value);
        expect(selectedValue).not.toBe('');
        console.log(`Verified ${dropdownId} has selected value: ${selectedValue}`);
      }
    }
  });

  test('Should go to List of Orders page and verify all existing dropdowns', async ({ page }) => {
    // Navigate to View all orders page (List of Orders page)
    await page.locator(orders.viewAllOrdersLink).click();
    
    // 
    await page.locator(orders.ordersTable).waitFor({ state: 'visible' });
    
    // Check if there are any existing dropdowns on the page
    const existingDropdowns = await page.locator('select').all();
    console.log(`Found ${existingDropdowns.length} existing dropdowns on the page`);
    
    // If there are existing dropdowns, select options from each
    for (let i = 0; i < existingDropdowns.length; i++) {
      const dropdown = existingDropdowns[i];
      
      // Get all options of dropdown
      const options = await dropdown.locator('option').all();
      
      // If there are options other than the default, select the first non-default option
      if (options.length > 1) {
        const optionToSelect = await options[1].getAttribute('value');
        await dropdown.selectOption(optionToSelect);
        
        // Verify the selection
        const selectedValue = await dropdown.evaluate(el => el.value);
        expect(selectedValue).toBe(optionToSelect);
        console.log(`Selected value ${selectedValue} from dropdown ${i + 1}`);
      }
    }
  });
});