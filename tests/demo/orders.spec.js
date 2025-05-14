import { test, expect } from '@playwright/test';
import { login } from '../pages/login';
import { orders } from '../pages/orders';

test.describe('Web Orders Page Title Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page
    await page.goto('');
    
    // Login with valid credentials
    await page.locator(login.username).fill('Tester');
    await page.locator(login.password).fill('test');
    await page.locator(login.submitButton).click();
    
    // Verify successful login
    await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/testcomplete12/weborders/');
  });

  test('should verify the title of the Web Orders page', async ({ page }) => {
    // Navigate to View all orders page
    await page.locator(orders.viewAllOrdersLink).click();
    
    // Verify the page title
    const pageTitle = await page.title();
    expect(pageTitle).toBe('Web Orders');
    console.log(`Verified page title: ${pageTitle}`);
    
    // Additional verification: Check the heading on the page
    const heading = await page.locator('h2').textContent();
    expect(heading).toContain('List of All Orders');
    console.log(`Verified page heading: ${heading}`);
  });

  //test more scenarios 
  
});