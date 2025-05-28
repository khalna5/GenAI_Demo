import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';

test.describe('Login Functionality Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    // Initialize the LoginPage for each test
    loginPage = new LoginPage(page);
    
    // Navigate login page before each test
    await loginPage.goToLoginPage();
  });

  test('Should login successfully with correct credentials', { tag: '@risky' }, async ({ page }) => {
    //Successfull login 
    await loginPage.login('Tester', 'test');
    
    await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/testcomplete12/weborders/');
    await expect(loginPage.pageTitle).toContainText('Web Orders');
    
    await expect(loginPage.logoutLink).toBeVisible();
  });

  test('Invalid login - Wrong Username', { tag: '@risky' }, async ({ page }) => {
   // Login with valid creds
    await loginPage.login('Invalid_User', 'test');
    
    // Verify the ERROR message 
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Invalid Login or Password.');
    
    // Verify we're still on the login page
    await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/testcomplete12/WebOrders/login.aspx');
  });

  test('Invalid Login - Wrong Password', async ({ page }) => {
    // Login with invalid password
    await loginPage.login('Tester', 'wrongpassword');
    
    // Verify error message
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Invalid Login or Password.');
    
    // Verify we're still on the login page
    await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/testcomplete12/WebOrders/login.aspx');
  });

  test('Invalid Login - Empty Username', async ({ page }) => {
    // Login with empty username
    await loginPage.login('', 'test');
    
    // Verify error message
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Invalid Login or Password.');
    
    // Verify we're still on the login page
    await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/testcomplete12/WebOrders/login.aspx');
  });

  test('Invalid Login - Empty Password', async ({ page }) => {
    // Login with empty Pass
    await loginPage.login('Tester', '');
    
    // Verify error message
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Invalid Login or Password.');
    
    // Verify we're still on the login page
    await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/testcomplete12/WebOrders/login.aspx');
  });

  test('Invalid Login - Empty Username and Password', { tag: '@risky' }, async ({ page }) => {
    // Login with empty username and password
    await loginPage.login('', '');
    
    // Verify error message
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Invalid Login or Password.');
    
    // Verify we're still on the login page
    await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/testcomplete12/WebOrders/login.aspx');
  });

  test('Logout Functionality',  async ({ page }) => {
    // First login successfully
    await loginPage.login('Tester', 'test');
    
    // Verify successful login
    await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/testcomplete12/weborders/');
    
    // Perform logout
    await loginPage.logout();
    
    // Verify we're back on the login page
    await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete12/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete12%2fWebOrders%2fDefault.aspx');
  });
});