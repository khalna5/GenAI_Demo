const dashboard = {
    // Navigation links
    viewAllOrdersLink: 'a:has-text("View all orders")',
    viewAllProductsLink: 'a:has-text("View all products")',
    orderLink: 'a:has-text("Order")',
    logoutLink: 'a:has-text("Logout")',
    
    // Table elements
    ordersTable: '.SampleTable',
    tableRows: '.SampleTable tr',
    tableHeaders: '.SampleTable th',
    
    // Dropdown elements
    statusDropdown: '#ctl00_MainContent_fmwOrder_ddlStatus',
    customerDropdown: '#customerDropdown',
    productDropdown: '#productDropdown',
    
    // Filter elements
    filterContainer: '.filter-container',
    customerFilter: '#customerFilter',
    productFilter: '#productFilter',
    dateFilter: '#dateFilter'
}

export {
    dashboard
}