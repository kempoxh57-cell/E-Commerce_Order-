export const DATABASE_TABLES = [
  {
    name: "Customers",
    khmerName: "តារាងអតិថិជន (Customers)",
    description: "Stores personal information and contact details of registered shoppers.",
    columns: [
      { name: "customer_id", type: "INT", isPk: true, isFk: false, note: "Primary Key, Auto-increment" },
      { name: "first_name", type: "VARCHAR(50)", isPk: false, isFk: false, note: "Customer first name" },
      { name: "last_name", type: "VARCHAR(50)", isPk: false, isFk: false, note: "Customer last name" },
      { name: "email", type: "VARCHAR(100)", isPk: false, isFk: false, note: "Unique email address" },
      { name: "phone_number", type: "VARCHAR(20)", isPk: false, isFk: false, note: "Contact phone number" },
      { name: "address", type: "TEXT", isPk: false, isFk: false, note: "Shipping / billing address" },
      { name: "created_at", type: "TIMESTAMP", isPk: false, isFk: false, note: "Registration date/time" }
    ]
  },
  {
    name: "Categories",
    khmerName: "តារាងប្រភេទផលិតផល (Categories)",
    description: "Organizes products into logical groups like Computers, Displays, Accessories.",
    columns: [
      { name: "category_id", type: "INT", isPk: true, isFk: false, note: "Primary Key, Auto-increment" },
      { name: "category_name", type: "VARCHAR(50)", isPk: false, isFk: false, note: "Name of category" },
      { name: "description", type: "TEXT", isPk: false, isFk: false, note: "Category description" },
      { name: "created_at", type: "TIMESTAMP", isPk: false, isFk: false, note: "Date added" }
    ]
  },
  {
    name: "Products",
    khmerName: "តារាងផលិតផល (Products)",
    description: "Contains product inventory items (Laptop, Mouse, Keyboard, Monitor) and prices.",
    columns: [
      { name: "product_id", type: "INT", isPk: true, isFk: false, note: "Primary Key, Auto-increment" },
      { name: "category_id", type: "INT", isPk: false, isFk: true, ref: "Categories(category_id)", note: "Foreign Key to Categories" },
      { name: "product_name", type: "VARCHAR(100)", isPk: false, isFk: false, note: "Product name" },
      { name: "price", type: "DECIMAL(10,2)", isPk: false, isFk: false, note: "Selling unit price ($)" },
      { name: "stock_quantity", type: "INT", isPk: false, isFk: false, note: "Quantity in stock" },
      { name: "image_url", type: "VARCHAR(255)", isPk: false, isFk: false, note: "Product image URL" },
      { name: "description", type: "TEXT", isPk: false, isFk: false, note: "Product specifications" }
    ]
  },
  {
    name: "Orders",
    khmerName: "តារាងការបញ្ជាទិញ (Orders)",
    description: "Tracks transactions placed by customers, shipping method, and order status.",
    columns: [
      { name: "order_id", type: "VARCHAR(20)", isPk: true, isFk: false, note: "Primary Key (e.g., ORD-0001)" },
      { name: "customer_id", type: "INT", isPk: false, isFk: true, ref: "Customers(customer_id)", note: "Foreign Key to Customers" },
      { name: "order_date", type: "TIMESTAMP", isPk: false, isFk: false, note: "Order placement timestamp" },
      { name: "shipping_method", type: "VARCHAR(50)", isPk: false, isFk: false, note: "Standard / Express / Pickup" },
      { name: "shipping_cost", type: "DECIMAL(10,2)", isPk: false, isFk: false, note: "Delivery fee ($)" },
      { name: "total_amount", type: "DECIMAL(10,2)", isPk: false, isFk: false, note: "Grand total ($)" },
      { name: "order_status", type: "VARCHAR(20)", isPk: false, isFk: false, note: "Default 'Pending', Shipped, etc." }
    ]
  },
  {
    name: "Order_Items",
    khmerName: "តារាងលម្អិតមុខទំនិញបញ្ជាទិញ (Order_Items)",
    description: "Junction table linking Orders and Products for many-to-many relationship.",
    columns: [
      { name: "order_item_id", type: "INT", isPk: true, isFk: false, note: "Primary Key, Auto-increment" },
      { name: "order_id", type: "VARCHAR(20)", isPk: false, isFk: true, ref: "Orders(order_id)", note: "Foreign Key to Orders" },
      { name: "product_id", type: "INT", isPk: false, isFk: true, ref: "Products(product_id)", note: "Foreign Key to Products" },
      { name: "quantity", type: "INT", isPk: false, isFk: false, note: "Quantity ordered" },
      { name: "unit_price", type: "DECIMAL(10,2)", isPk: false, isFk: false, note: "Price at time of purchase" },
      { name: "subtotal", type: "DECIMAL(10,2)", isPk: false, isFk: false, note: "quantity * unit_price" }
    ]
  }
];

export const RELATIONSHIPS = [
  {
    from: "Categories",
    to: "Products",
    type: "1 : N (One-to-Many)",
    description: "One category contains many products. (Categories.category_id = Products.category_id)"
  },
  {
    from: "Customers",
    to: "Orders",
    type: "1 : N (One-to-Many)",
    description: "One customer can place many orders. (Customers.customer_id = Orders.customer_id)"
  },
  {
    from: "Orders",
    to: "Order_Items",
    type: "1 : N (One-to-Many)",
    description: "One order consists of one or more order items. (Orders.order_id = Order_Items.order_id)"
  },
  {
    from: "Products",
    to: "Order_Items",
    type: "1 : N (One-to-Many)",
    description: "One product can be referenced across multiple order items. (Products.product_id = Order_Items.product_id)"
  }
];

export const SQL_SCHEMA_SCRIPT = `-- ===================================================
-- E-Commerce Order Database Schema (MySQL / PostgreSQL)
-- ===================================================

-- 1. Create Customers Table
CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Categories Table
CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Products Table
CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    image_url VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- 4. Create Orders Table
CREATE TABLE Orders (
    order_id VARCHAR(20) PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    shipping_method VARCHAR(50) NOT NULL,
    shipping_cost DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- 5. Create Order_Items Table
CREATE TABLE Order_Items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(20) NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Sample Data Seeding
INSERT INTO Categories (category_name, description) VALUES
('Computers', 'Laptops, Desktops, and Workstations'),
('Accessories', 'Mice, Keyboards, and Peripherals'),
('Displays', 'Monitors and Screen Displays');

INSERT INTO Products (category_id, product_name, price, stock_quantity, description) VALUES
(1, 'Laptop', 650.00, 12, 'High performance laptop with 16GB RAM'),
(2, 'Mouse', 15.00, 45, 'Ergonomic wireless mouse'),
(2, 'Keyboard', 25.00, 30, 'RGB backlit mechanical keyboard'),
(3, 'Monitor', 120.00, 18, '24-inch Full HD IPS monitor');
`;
