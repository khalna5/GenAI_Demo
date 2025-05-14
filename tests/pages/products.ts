const products = {
    // Navigation links
    viewAllOrdersLink: 'a:has-text("View all orders")',
    viewAllProductsLink: 'a:has-text("View all products")',
    orderLink: 'a:has-text("Order")',
    logoutLink: 'a:has-text("Logout")',
    
    // Table elements
    productsTable: '.ProductsTable',
    tableRows: '.ProductsTable tr',
    tableHeaders: '.ProductsTable th',
    
    // Product elements
    productName: (index: number) => `.ProductsTable tr:nth-child(${index + 2}) td:nth-child(1)`,
    productPrice: (index: number) => `.ProductsTable tr:nth-child(${index + 2}) td:nth-child(2)`,
    productDiscount: (index: number) => `.ProductsTable tr:nth-child(${index + 2}) td:nth-child(3)`,
    productImage: (index: number) => `.ProductsTable tr:nth-child(${index + 2}) img`,
    
    // Page elements
    pageTitle: 'h2',
    
    // Order page elements
    productDropdown: '#ctl00_MainContent_fmwOrder_ddlProduct',
    quantityInput: '#ctl00_MainContent_fmwOrder_txtQuantity',
    pricePerUnitInput: '#ctl00_MainContent_fmwOrder_txtUnitPrice',
    discountInput: '#ctl00_MainContent_fmwOrder_txtDiscount',
    totalInput: '#ctl00_MainContent_fmwOrder_txtTotal'
}

export {
    products
}