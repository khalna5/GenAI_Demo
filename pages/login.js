exports.LoginPage = class LoginPage {
    
    constructor(page) {
        this.page = page;
        // Selectors for SmartBear demo site
        this.usernameInput = page.locator('#ctl00_MainContent_username');
        this.passwordInput = page.locator('#ctl00_MainContent_password');
        this.loginButton = page.locator('#ctl00_MainContent_login_button');
        this.errorMessage = page.locator('#ctl00_MainContent_status');
        this.logoutLink = page.getByText('Logout');
        this.pageTitle = page.locator('h1');
    }

    /**
     * Navigate to the login page
     */
    async goToLoginPage() {
        await this.page.goto('http://secure.smartbearsoftware.com/samples/testcomplete12/WebOrders/login.aspx');
    }

    /**
     * Perform login with provided credentials
     * @param {string} username - Username to login with
     * @param {string} password - Password to login with
     */
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
     * Check if login was successful
     * @returns {Promise<boolean>} True if login was successful
     */
    async isLoggedIn() {
        return await this.page.url() === 'http://secure.smartbearsoftware.com/samples/testcomplete12/weborders/';
    }

    /**
     * Get the error message text if login failed
     * @returns {Promise<string>} Error message text
     */
    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    /**
     * Check if error message is displayed
     * @returns {Promise<boolean>} True if error message is displayed
     */
    async isErrorMessageDisplayed() {
        return await this.errorMessage.isVisible();
    }

    /**
     * Get the page title text after successful login
     * @returns {Promise<string>} Page title text
     */
    async getPageTitle() {
        return await this.pageTitle.textContent();
    }

    /**
     * Logout from the application
     */
    async logout() {
        await this.logoutLink.click();
    }
}