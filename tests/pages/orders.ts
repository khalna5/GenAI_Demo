const orders = {
    // Navigation links
    viewAllOrdersLink: 'a:has-text("View all orders")',
    viewAllProductsLink: 'a:has-text("View all products")',
    orderLink: 'a:has-text("Order")',
    
    // Table elements
    ordersTable: '.SampleTable',
    tableRows: '.SampleTable tr',
    tableHeaders: '.SampleTable th',
    
    // Dropdown elements
    customerDropdown: '#customerDropdown',
    productDropdown: '#productDropdown',
    dateDropdown: '#dateDropdown',
    statusDropdown: '#statusDropdown',
    
    // Filter buttons
    applyFilterButton: '#applyFilter',
    resetFilterButton: '#resetFilter',
    
    // Order details
    orderDetailsContainer: '#orderDetails',
    orderIdField: '#orderId',
    customerNameField: '#customerName',
    productNameField: '#productName',
    quantityField: '#quantity',
    priceField: '#price',
    discountField: '#discount',
    totalField: '#total'
}

export {
    orders
}