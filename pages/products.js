exports.ProductsPage = class ProductsPage {
    
    constructor(page) {
        this.page = page;
        // Selectors for SmartBear demo site products page
        this.productsTable = page.locator('.ProductsTable');
        this.tableRows = page.locator('.ProductsTable tr');
        this.tableHeaders = page.locator('.ProductsTable th');
        this.productImages = page.locator('.ProductsTable img');
        this.pageTitle = page.locator('h2');
        
        // Navigation links
        this.viewAllOrdersLink = page.getByRole('link', { name: 'View all orders' });
        this.viewAllProductsLink = page.getByRole('link', { name: 'View all products' });
        this.orderLink = page.getByRole('link', { name: 'Order', exact: true });
        this.logoutLink = page.getByText('Logout');
    }

    /**
     * Navigate to the products page (requires login first)
     */
    async goToProductsPage() {
        await this.viewAllProductsLink.click();
        await this.page.waitForURL(/.*Products\.aspx$/);
    }

    /**
     * Get all product names from the products table
     * @returns {Promise<string[]>} Array of product names
     */
    async getAllProductNames() {
        return await this.page.$$eval('.ProductsTable tr:not(:first-child) td:nth-child(1)', 
            cells => cells.map(cell => cell.textContent.trim()));
    }

    /**
     * Get all product prices from the products table
     * @returns {Promise<string[]>} Array of product prices
     */
    async getAllProductPrices() {
        return await this.page.$$eval('.ProductsTable tr:not(:first-child) td:nth-child(2)', 
            cells => cells.map(cell => cell.textContent.trim()));
    }

    /**
     * Get all product discounts from the products table
     * @returns {Promise<string[]>} Array of product discounts
     */
    async getAllProductDiscounts() {
        return await this.page.$$eval('.ProductsTable tr:not(:first-child) td:nth-child(3)', 
            cells => cells.map(cell => cell.textContent.trim()));
    }

    /**
     * Get the number of products in the table
     * @returns {Promise<number>} Number of products
     */
    async getProductCount() {
        // Subtract 1 to account for the header row
        return (await this.tableRows.count()) - 1;
    }

    /**
     * Get product details by index
     * @param {number} index - The index of the product (0-based)
     * @returns {Promise<Object>} Product details object with name, price, and discount
     */
    async getProductDetails(index) {
        const rowIndex = index + 1; // Add 1 to account for the header row
        const row = this.tableRows.nth(rowIndex);
        
        const name = await row.locator('td:nth-child(1)').textContent();
        const price = await row.locator('td:nth-child(2)').textContent();
        const discount = await row.locator('td:nth-child(3)').textContent();
        
        return {
            name: name.trim(),
            price: price.trim(),
            discount: discount.trim()
        };
    }

    /**
     * Get all product details
     * @returns {Promise<Object[]>} Array of product detail objects
     */
    async getAllProductDetails() {
        const productCount = await this.getProductCount();
        const products = [];
        
        for (let i = 0; i < productCount; i++) {
            products.push(await this.getProductDetails(i));
        }
        
        return products;
    }

    /**
     * Verify if a product exists in the table by name
     * @param {string} productName - The name of the product to check
     * @returns {Promise<boolean>} True if the product exists
     */
    async productExists(productName) {
        const productNames = await this.getAllProductNames();
        return productNames.includes(productName);
    }

    /**
     * Get the page title text
     * @returns {Promise<string>} Page title text
     */
    async getPageTitle() {
        return await this.pageTitle.textContent();
    }
}