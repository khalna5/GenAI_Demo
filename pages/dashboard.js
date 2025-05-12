exports.DashboardPage = class DashboardPage {
    
    constructor(page) {
        this.page = page;
        // Selectors for dashboard elements
        this.viewAllOrdersLink = page.getByRole('link', { name: 'View all orders' });
        this.viewAllProductsLink = page.getByRole('link', { name: 'View all products' });
        this.orderLink = page.getByRole('link', { name: 'Order', exact: true });
        this.logoutLink = page.getByText('Logout');
        
        // Table elements
        this.ordersTable = page.locator('.SampleTable');
        this.tableRows = page.locator('.SampleTable tr');
        this.tableHeaders = page.locator('.SampleTable th');
        
        // Dropdown selection elements
        this.statusDropdown = page.locator('#ctl00_MainContent_fmwOrder_ddlStatus');
        this.customerDropdown = page.locator('#customerDropdown');
        this.productDropdown = page.locator('#productDropdown');
    }

    /**
     * Navigate to the dashboard page (requires login first)
     */
    async goToDashboard() {
        await this.page.goto('http://secure.smartbearsoftware.com/samples/testcomplete12/weborders/');
    }

    /**
     * Get the number of orders in the table
     * @returns {Promise<number>} Number of orders
     */
    async getOrderCount() {
        // Subtract 1 to account for the header row
        return (await this.tableRows.count()) - 1;
    }

    /**
     * Get all customer names from the orders table
     * @returns {Promise<string[]>} Array of customer names
     */
    async getAllCustomerNames() {
        // Get all customer names from the table (assuming customer name is in the 2nd column)
        return await this.page.$$eval('.SampleTable tr:not(:first-child) td:nth-child(2)', 
            cells => cells.map(cell => cell.textContent.trim()));
    }

    /**
     * Create a dropdown selection from the table data
     * @param {string} columnName - The name of the column to extract data from
     * @returns {Promise<string[]>} Array of unique values from the specified column
     */
    async createDropdownFromTableColumn(columnName) {
        // First, find the index of the column by header name
        const headerCells = await this.tableHeaders.all();
        let columnIndex = -1;
        
        for (let i = 0; i < headerCells.length; i++) {
            const headerText = await headerCells[i].textContent();
            if (headerText.trim() === columnName) {
                columnIndex = i;
                break;
            }
        }
        
        if (columnIndex === -1) {
            throw new Error(`Column "${columnName}" not found in the table`);
        }
        
        // Extract all values from the specified column (skip header row)
        const values = await this.page.$$eval(
            `.SampleTable tr:not(:first-child) td:nth-child(${columnIndex + 1})`,
            cells => cells.map(cell => cell.textContent.trim())
        );
        
        // Return unique values only
        return [...new Set(values)];
    }

    /**
     * Select a customer from the dropdown
     * @param {string} customerName - The customer name to select
     */
    async selectCustomer(customerName) {
        await this.customerDropdown.selectOption(customerName);
    }

    /**
     * Select a product from the dropdown
     * @param {string} productName - The product name to select
     */
    async selectProduct(productName) {
        await this.productDropdown.selectOption(productName);
    }

    /**
     * Filter the table by a specific column and value
     * @param {string} columnName - The name of the column to filter by
     * @param {string} value - The value to filter for
     */
    async filterTableByColumnValue(columnName, value) {
        // Implementation would depend on the actual filtering mechanism of the application
        // This is a placeholder for the actual implementation
        console.log(`Filtering table by ${columnName} = ${value}`);
    }

    /**
     * Create a dropdown element on the page from table data
     * @param {string} columnName - The name of the column to create dropdown from
     * @param {string} dropdownId - The ID to assign to the new dropdown
     */
    async createDropdownElement(columnName, dropdownId) {
        const values = await this.createDropdownFromTableColumn(columnName);
        
        // Create a dropdown element using JavaScript in the browser context
        await this.page.evaluate(({ values, dropdownId, columnName }) => {
            // Create container div
            const container = document.createElement('div');
            container.style.margin = '10px 0';
            
            // Create label
            const label = document.createElement('label');
            label.textContent = `Filter by ${columnName}: `;
            label.setAttribute('for', dropdownId);
            container.appendChild(label);
            
            // Create select element
            const select = document.createElement('select');
            select.id = dropdownId;
            
            // Add default option
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = `-- Select ${columnName} --`;
            select.appendChild(defaultOption);
            
            // Add options from table data
            values.forEach(value => {
                const option = document.createElement('option');
                option.value = value;
                option.textContent = value;
                select.appendChild(option);
            });
            
            container.appendChild(select);
            
            // Insert the dropdown before the table
            const table = document.querySelector('.SampleTable');
            if (table && table.parentNode) {
                table.parentNode.insertBefore(container, table);
            }
        }, { values, dropdownId, columnName });
        
        return this.page.locator(`#${dropdownId}`);
    }
}