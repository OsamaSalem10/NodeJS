CREATE DATABASE IF NOT EXISTS 04_Stock;

USE 04_Stock;


-- =========================================
-- CATEGORIES
-- =========================================

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================
-- PRODUCTS
-- =========================================

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    price DECIMAL(10,2) NOT NULL DEFAULT 0,

    quantity DECIMAL(10,3) NOT NULL DEFAULT 0,

    min_quantity DECIMAL(10,3) NOT NULL DEFAULT 0,

    unit ENUM(
        'piece',
        'kg',
        'g',
        'liter',
        'ml'
    ) NOT NULL DEFAULT 'piece',

    category_id INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE SET NULL
);


-- =========================================
-- STOCK MOVEMENTS
-- =========================================

CREATE TABLE stock_movements (
    id INT AUTO_INCREMENT PRIMARY KEY,

    product_id INT NOT NULL,

    type ENUM(
        'IN',
        'OUT',
        'ADJUSTMENT'
    ) NOT NULL,

    quantity DECIMAL(10,3) NOT NULL,

    note VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);


-- =========================================
-- INDEX
-- =========================================

CREATE INDEX idx_stock_product
ON stock_movements(product_id);