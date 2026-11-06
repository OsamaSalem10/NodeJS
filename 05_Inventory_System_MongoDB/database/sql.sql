create database 05_Inventory_System

use 05_Inventory_System


CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  unit ENUM('kg', 'piece') NOT NULL,
  Received DECIMAL(12,3) NOT NULL DEFAULT 0,
  Sale DECIMAL(12,3) NOT NULL DEFAULT 0,
  Residual DECIMAL(12,3) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_products_category
    FOREIGN KEY (category_id)
    REFERENCES categories(id)
    ON DELETE RESTRICT
  
);





INSERT INTO categories (name) VALUES
('دجاج طازج'),
('مواد غذائية'),
('مجمدات'),
('فحم'),


INSERT INTO products
(category_id, name, unit, quantity, min_quantity)
VALUES
(2, 'أرز', 'kg', 50, 10),
(2, 'عدس', 'kg', 20, 5),
(1, 'سكر', 'kg', 30, 10),
(5, 'مياه', 'piece', 100, 20);