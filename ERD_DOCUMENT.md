# E-Commerce Database Design & Practical Exercises Report
**Project:** React.js E-Commerce Order System  
**Tables:** Customers, Categories, Products, Orders, Order_Items  

---

## 1. Entity Relationship Diagram (Crow's Foot Notation)

```mermaid
erDiagram
    CUSTOMERS ||--o{ ORDERS : "places (1:N)"
    CATEGORIES ||--o{ PRODUCTS : "contains (1:N)"
    ORDERS ||--|{ ORDER_ITEMS : "has (1:N)"
    PRODUCTS ||--o{ ORDER_ITEMS : "appears_in (1:N)"

    CUSTOMERS {
        int customer_id PK "Auto Increment"
        varchar first_name "NOT NULL"
        varchar last_name "NOT NULL"
        varchar email "UNIQUE, NOT NULL"
        varchar phone_number "NOT NULL"
        text address "NOT NULL"
        timestamp created_at "DEFAULT CURRENT_TIMESTAMP"
    }

    CATEGORIES {
        int category_id PK "Auto Increment"
        varchar category_name "NOT NULL"
        text description "NULLABLE"
        timestamp created_at "DEFAULT CURRENT_TIMESTAMP"
    }

    PRODUCTS {
        int product_id PK "Auto Increment"
        int category_id FK "References Categories(category_id)"
        varchar product_name "NOT NULL (Laptop, Mouse, Keyboard, Monitor)"
        decimal price "NOT NULL (10, 2)"
        int stock_quantity "DEFAULT 0"
        varchar image_url "NULLABLE"
        text description "NULLABLE"
        timestamp created_at "DEFAULT CURRENT_TIMESTAMP"
    }

    ORDERS {
        varchar order_id PK "e.g., ORD-0001"
        int customer_id FK "References Customers(customer_id)"
        timestamp order_date "DEFAULT CURRENT_TIMESTAMP"
        varchar shipping_method "Standard / Express / Pickup"
        decimal shipping_cost "DEFAULT 0.00"
        decimal total_amount "NOT NULL"
        varchar order_status "DEFAULT 'Pending'"
    }

    ORDER_ITEMS {
        int order_item_id PK "Auto Increment"
        varchar order_id FK "References Orders(order_id)"
        int product_id FK "References Products(product_id)"
        int quantity "NOT NULL, CHECK (quantity > 0)"
        decimal unit_price "Price at purchase (10, 2)"
        decimal subtotal "quantity * unit_price"
    }
```

---

## 2. Table Relationships Summary

1. **Categories $\rightarrow$ Products (1 : N)**
   - One category can have multiple products.
   - `Products.category_id` references `Categories.category_id`.
2. **Customers $\rightarrow$ Orders (1 : N)**
   - One customer can place many orders over time.
   - `Orders.customer_id` references `Customers.customer_id`.
3. **Orders $\rightarrow$ Order_Items (1 : N)**
   - One order contains one or more line items.
   - `Order_Items.order_id` references `Orders.order_id`.
4. **Products $\rightarrow$ Order_Items (1 : N)**
   - One product can appear in multiple order line items.
   - `Order_Items.product_id` references `Products.product_id`.

---

## 3. Product Catalog (Practical Exercise 1)

| Product Name | Category | Unit Price | Initial Stock |
|---|---|---|---|
| Laptop | Computers | $650.00 | 12 |
| Mouse | Accessories | $15.00 | 45 |
| Keyboard | Accessories | $25.00 | 30 |
| Monitor | Displays | $120.00 | 18 |

---

## 4. How to Run the React.js Application

1. Open terminal inside this folder:
   ```bash
   npm install
   npm run dev
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```
