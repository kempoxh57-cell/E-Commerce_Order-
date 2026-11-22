-- =====================================================================
-- Practical Exercise: Database Design for E-Commerce Order System
-- Tables: Customers, Categories, Products, Orders, Order_Items
-- Compatible with: MySQL / MariaDB / PostgreSQL
-- =====================================================================

-- 1. Create Customers Table
DROP TABLE IF EXISTS Order_Items;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Customers;

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
    order_id VARCHAR(20) PRIMARY KEY, -- e.g., 'ORD-0001'
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

-- =====================================================================
-- Sample Data Seeding for the Practical Exercise
-- =====================================================================

-- Insert Categories
INSERT INTO Categories (category_name, description) VALUES
('Computers', 'Laptops, Workstations, and Desktops'),
('Accessories', 'Mice, Keyboards, and Peripherals'),
('Displays', 'Monitors and Computer Screens');

-- Insert Products (The 4 Required Products from Exercise 1)
INSERT INTO Products (category_id, product_name, price, stock_quantity, description) VALUES
(1, 'Laptop', 650.00, 12, 'High performance laptop with 16GB RAM, 512GB SSD'),
(2, 'Mouse', 15.00, 45, 'Ergonomic wireless mouse with silent clicks'),
(2, 'Keyboard', 25.00, 30, 'RGB backlit mechanical keyboard'),
(3, 'Monitor', 120.00, 18, '24-inch Full HD IPS monitor with 75Hz refresh rate');

-- Sample Customer from Exercise Checkout
INSERT INTO Customers (first_name, last_name, email, phone_number, address) VALUES
('Sokha', 'Meng', 'sokha.meng@example.com', '012345678', 'Street 2004, Phnom Penh');

-- Sample Order from Slide 28
INSERT INTO Orders (order_id, customer_id, shipping_method, shipping_cost, total_amount, order_status) VALUES
('ORD-0001', 1, 'Standard Delivery', 5.00, 895.00, 'Pending');

-- Sample Order Items
INSERT INTO Order_Items (order_id, product_id, quantity, unit_price, subtotal) VALUES
('ORD-0001', 1, 1, 650.00, 650.00),
('ORD-0001', 4, 2, 120.00, 240.00);
