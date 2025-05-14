# Login, Dashboard, and Products Functionality with Playwright

This project demonstrates how to implement and test login functionality, dashboard dropdown selection, order management, and product listing using Playwright.

## Project Structure

- `/pages/login.js` - Page Object Model for the login page
- `/pages/dashboard.js` - Page Object Model for the dashboard page
- `/pages/products.js` - Page Object Model for the products page
- `/tests/demo/login.spec.js` - Test cases for valid and invalid login scenarios
- `/tests/demo/order.spec.js` - Test cases for order page functionality and dropdown selection
- `/tests/demo/orders.spec.js` - Test cases for verifying the Web Orders page title
- `/tests/demo/viewAllProduct.spec.js` - Test cases for the View all products page
- `/tests/pages/login.ts` - Selectors for the login page elements
- `/tests/pages/dashboard.ts` - Selectors for the dashboard page elements
- `/tests/pages/orders.ts` - Selectors for the orders page elements
- `/tests/pages/products.ts` - Selectors for the products page elements
- `/tests/pages/app.ts` - Common selectors for the application

## Login Test Cases

The following test cases are implemented:

1. **Valid Login** - Tests successful login with correct credentials
2. **Invalid Login - Wrong Username** - Tests login with an incorrect username
3. **Invalid Login - Wrong Password** - Tests login with an incorrect password
4. **Invalid Login - Empty Username** - Tests login with an empty username
5. **Invalid Login - Empty Password** - Tests login with an empty password
6. **Invalid Login - Empty Username and Password** - Tests login with both fields empty
7. **Logout Functionality** - Tests the logout process after a successful login

## Products Page Test Cases

The following product page test cases are implemented:

1. **Navigate to View all products page** - Tests navigation to the products page and verifies the URL and page title
2. **Display products table with correct headers** - Tests that the products table has the correct headers
3. **Display correct product information** - Tests that the products table displays the correct product information
4. **Verify product images are displayed** - Tests that product images are displayed and have proper attributes
5. **Verify navigation between View all products and View all orders pages** - Tests navigation between the products and orders pages
6. **Verify product details match when ordering the product** - Tests that product details on the products page match those on the order page
7. **Verify all products can be ordered** - Tests that all products from the products page are available in the order dropdown
8. **Verify product prices are numeric and properly formatted** - Tests that product prices are properly formatted
9. **Verify product discounts are properly formatted as percentages** - Tests that product discounts are properly formatted

## ProductsPage (`/pages/products.js`)

The ProductsPage class provides the following methods:

- `goToProductsPage()` - Navigates to the products page
- `getAllProductNames()` - Gets all product names from the products table
- `getAllProductPrices()` - Gets all product prices from the products table
- `getAllProductDiscounts()` - Gets all product discounts from the products table
- `getProductCount()` - Gets the number of products in the table
- `getProductDetails(index)` - Gets product details by index
- `getAllProductDetails()` - Gets all product details
- `productExists(productName)` - Checks if a product exists in the table by name
- `getPageTitle()` - Gets the page title text

## Orders Page Test Cases

The following order page test cases are implemented:

1. **Go to List of Orders Page and Interact with All Dropdowns** - Tests navigating to the orders page and interacting with all available dropdowns
2. **Go to List of Orders Page and Verify All Existing Dropdowns** - Tests navigating to the orders page and verifying all existing dropdowns

The order.spec.js file implements the following functionality:
1. Navigates to the List of Orders page
2. Creates dynamic dropdowns for filtering based on table columns (Customer, Product, Date, Status)
3. Selects values from each dropdown
4. Verifies that the dropdowns have selected values

The orders.spec.js file implements the following test cases:
1. **Verify the title of the Web Orders page** - Tests that the page title is correctly set to "Web Orders"
2. **Verify the title after navigating to different sections** - Tests that the page title remains consistent when navigating between different sections of the application

## Page Object Models

### LoginPage (`/pages/login.js`)

The LoginPage class provides the following methods:

- `goToLoginPage()` - Navigates to the login page
- `login(username, password)` - Performs login with the provided credentials
- `isLoggedIn()` - Checks if login was successful
- `getErrorMessage()` - Gets the error message text if login failed
- `isErrorMessageDisplayed()` - Checks if error message is displayed
- `getPageTitle()` - Gets the page title text after successful login
- `logout()` - Logs out from the application

### DashboardPage (`/pages/dashboard.js`)

The DashboardPage class provides the following methods:

- `goToDashboard()` - Navigates to the dashboard page
- `getOrderCount()` - Gets the number of orders in the table
- `getAllCustomerNames()` - Gets all customer names from the orders table
- `createDropdownFromTableColumn(columnName)` - Creates a dropdown from a specific table column
- `selectCustomer(customerName)` - Selects a customer from the dropdown
- `selectProduct(productName)` - Selects a product from the dropdown
- `filterTableByColumnValue(columnName, value)` - Filters the table by a specific column and value
- `createDropdownElement(columnName, dropdownId)` - Creates a dropdown element on the page from table data

## Running the Tests

To run the login tests:

```bash
npx playwright test tests/demo/login.spec.js
```

To run the order tests:

```bash
npx playwright test tests/demo/order.spec.js
```

To run the orders page title tests:

```bash
npx playwright test tests/demo/orders.spec.js
```

To run the product tests:

```bash
npx playwright test tests/demo/viewAllProduct.spec.js
```

To run all tests:

```bash
npx playwright test
```

To run the tests with a UI:

```bash
npx playwright test --ui
```

To run a specific test:

```bash
npx playwright test -g "Should navigate to View all products page"
```

## Orders Page Dropdown Implementation

The orders page dropdown functionality allows users to:

1. Navigate to the List of Orders page
2. Extract unique values from table columns (Customer, Product, Date, Status)
3. Create dropdown selection elements with these values
4. Select values from each dropdown
5. Verify that the dropdowns have selected values

This is implemented using Playwright's ability to:
- Extract data from table columns
- Create and inject HTML elements into the page
- Select options from dropdown elements
- Verify selected values

## Test Site

The tests use the SmartBear demo site:
http://secure.smartbearsoftware.com/samples/testcomplete12/WebOrders/login.aspx

Valid credentials:
- Username: Tester
- Password: test
