import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';
import { DashboardPage } from '../../pages/dashboard';
import { ProductsPage } from '../../pages/products';
import { login } from '../pages/login';
import { dashboard } from '../pages/dashboard';
import { orders } from '../pages/orders';
import { products } from '../pages/products';

test.describe('View All Products Page Tests', () => {
  let loginPage;
  let dashboardPage;
  let productsPage;

  test.beforeEach(async ({ page }) => {
    // Initialize the page objects
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    productsPage = new ProductsPage(page);
    
    // Login before each test
    await loginPage.goToLoginPage();
    await loginPage.login('Tester', 'test');
    
    // Verify successful login
    await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/testcomplete12/weborders/');
  });

  test('Should navigate to View all products page', async ({ page }) => {
    // Navigate to products page using the page object
    await productsPage.goToProductsPage();
    
    // Verify the URL contains 'Products.aspx'
    await expect(page).toHaveURL(/.*Products\.aspx$/);
    
    // Verify the page title contains 'List of Products'
    const pageTitle = await productsPage.getPageTitle();
    expect(pageTitle).toContain('List of Products');
  });

  test('Should display products table with correct headers', async ({ page }) => {
    await productsPage.goToProductsPage();
        await expect(productsPage.productsTable).toBeVisible();
        const expectedHeaders = ['Product name', 'Price', 'Discount'];
    
    // Check headers numbers
    await expect(productsPage.tableHeaders).toHaveCount(expectedHeaders.length);
    
    // Check each header text
    for (let i = 0; i < expectedHeaders.length; i++) {
      const headerText = await productsPage.tableHeaders.nth(i).textContent();
      expect(headerText.trim()).toContain(expectedHeaders[i]);
    }
  });

  test('Should display correct product information', async ({ page }) => {
    // Navigate to View all products page
    await productsPage.goToProductsPage();
    
    // Expected products data (based on the SmartBear demo site)
    const expectedProducts = [
      { name: 'MyMoney', price: '$100', discount: '8%' },
      { name: 'FamilyAlbum', price: '$80', discount: '15%' },
      { name: 'ScreenSaver', price: '$20', discount: '10%' }
    ];
    
    // Get all product details using the page object
    const actualProducts = await productsPage.getAllProductDetails();
        expect(actualProducts.length).toBe(expectedProducts.length);
    
    // Verify each product's information
    for (let i = 0; i < expectedProducts.length; i++) {
      expect(actualProducts[i].name).toContain(expectedProducts[i].name);
      expect(actualProducts[i].price).toContain(expectedProducts[i].price);
      expect(actualProducts[i].discount).toContain(expectedProducts[i].discount);
    }
  });

  test('Should verify navigation between View all products and View all orders pages', async ({ page }) => {
    // Navigate to View all products page
    await productsPage.goToProductsPage();
    
    // Verify we're on the products page
    await expect(page).toHaveURL(/.*Products\.aspx$/);
    
    // Navigate back to View all orders page
    await productsPage.viewAllOrdersLink.click();
    
    // Verify we're on the orders page
    await expect(page).toHaveURL(/.*Default\.aspx$/);
    
    // Navigate back to View all products page again
    await productsPage.viewAllProductsLink.click();
    
    // Verify we're back on the products page
    await expect(page).toHaveURL(/.*Products\.aspx$/);
  });

  test('Should verify product details match when ordering the product', async ({ page }) => {
    // Navigate to View all products page
    await productsPage.goToProductsPage();
    
    // Get first product details using the page object
    const firstProduct = await productsPage.getProductDetails(0);
    
    // Navigate to Order page
    await productsPage.orderLink.click();
    
    // Select the first product from the dropdown
    const productDropdown = page.locator(products.productDropdown);
    await productDropdown.selectOption({ label: firstProduct.name });
    
    // Wait for the price to update
    await page.waitForTimeout(500);
    
    // Get the price from the order page
    const priceInput = page.locator(products.pricePerUnitInput);
    const orderPagePrice = await priceInput.inputValue();
    
    // Verify the price matches (removing $ and any formatting)
    const cleanProductPrice = firstProduct.price.replace('$', '').trim();
    const cleanOrderPrice = orderPagePrice.trim();
    
    expect(cleanOrderPrice).toBe(cleanProductPrice);
  });

  test('Should verify product prices are numeric and properly formatted', async ({ page }) => {
    // Navigate to View all products page
    await productsPage.goToProductsPage();
    
    // Get all product prices
    const prices = await productsPage.getAllProductPrices();
    
    // Verify each price is properly formatted (starts with $ followed by numbers)
    for (const price of prices) {
      expect(price).toMatch(/^\$\d+$/);
      
      // Extract the numeric value and verify it's a valid number
      const numericValue = parseFloat(price.replace('$', ''));
      expect(isNaN(numericValue)).toBe(false);
      expect(numericValue).toBeGreaterThan(0);
    }
  });
  
  test('Should verify product discounts are properly formatted as percentages', async ({ page }) => {
    // Navigate to View all products page
    await productsPage.goToProductsPage();
    
    // Get all product discounts
    const discounts = await productsPage.getAllProductDiscounts();
    
    // Verify each discount is properly formatted (numbers followed by %)
    for (const discount of discounts) {
      expect(discount).toMatch(/^\d+%$/);
      
      // Extract the numeric value and verify it's a valid percentage
      const numericValue = parseFloat(discount.replace('%', ''));
      expect(isNaN(numericValue)).toBe(false);
      expect(numericValue).toBeGreaterThanOrEqual(0);
      expect(numericValue).toBeLessThanOrEqual(100);
    }
  });
});