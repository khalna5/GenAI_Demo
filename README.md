# Login and Dashboard Functionality with Playwright

This project demonstrates how to implement and test login functionality and dashboard dropdown selection using Playwright.

## Project Structure

- `/pages/login.js` - Page Object Model for the login page
- `/pages/dashboard.js` - Page Object Model for the dashboard page
- `/tests/demo/login.spec.js` - Test cases for valid and invalid login scenarios
- `/tests/demo/dashboard.spec.ts` - Test cases for dashboard dropdown functionality
- `/tests/demo/order.spec.js` - Test cases for order placement
- `/tests/pages/login.ts` - Selectors for the login page elements
- `/tests/pages/dashboard.ts` - Selectors for the dashboard page elements
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

## Dashboard Dropdown Test Cases

The following dashboard dropdown test cases are implemented:

1. **Verify Orders Table is Displayed** - Tests that the orders table is visible on the dashboard
2. **Create Customer Dropdown from Table Data** - Tests creating a dropdown from the customer column
3. **Create Product Dropdown from Table Data** - Tests creating a dropdown from the product column
4. **Create Date Dropdown from Table Data** - Tests creating a dropdown from the date column
5. **Filter Table by Selected Customer** - Tests filtering the table by selecting a customer from the dropdown

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

To run the dashboard dropdown tests:

```bash
npx playwright test tests/demo/dashboard.spec.ts
```

To run the order tests:

```bash
npx playwright test tests/demo/order.spec.js
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
npx playwright test -g "Create Customer Dropdown"
```

## Dashboard Dropdown Implementation

The dashboard dropdown functionality allows users to:

1. Extract unique values from any column in the orders table
2. Create a dropdown selection element with these values
3. Filter the table based on the selected value

This is implemented using Playwright's ability to:
- Extract data from table columns
- Create and inject HTML elements into the page
- Add event listeners to handle dropdown selection changes
- Filter table rows based on selected values

## Test Site

The tests use the SmartBear demo site:
http://secure.smartbearsoftware.com/samples/testcomplete12/WebOrders/login.aspx

Valid credentials:
- Username: Tester
- Password: test