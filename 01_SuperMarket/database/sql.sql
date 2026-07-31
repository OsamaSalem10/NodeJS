CREATE DATABASE 01_supermarket;

USE 01_supermarket;

CREATE TABLE users (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100),
 email VARCHAR(100) unique,
 password VARCHAR(100),
 phone VARCHAR(20),
 image VARCHAR(255),
 location VARCHAR(255),
 image_public_id VARCHAR(255), 
 description varchar(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE categories (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(100),
 image VARCHAR(255),
 image_public_id VARCHAR(255),
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);  
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    discount DECIMAL(10,2) DEFAULT 0,
    image VARCHAR(255),
     image_public_id VARCHAR(255),
    status ENUM('Active','Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id)
    REFERENCES categories(id)
    ON DELETE CASCADE
);

CREATE TABLE carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,

    UNIQUE(user_id, product_id)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    total DECIMAL(10,2) NOT NULL,

    payment_method ENUM(
        'Cash',
        'Visa',
        'MasterCard'
    ) DEFAULT 'Cash',

    payment_status ENUM(
        'Pending',
        'Paid'
    ) DEFAULT 'Pending',

    order_status ENUM(
        'Pending',
        'Processing',
        'Shipped',
        'Delivered',
        'Cancelled'
    ) DEFAULT 'Pending',

    shipping_address VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);
CREATE TABLE order_items (

    id INT AUTO_INCREMENT PRIMARY KEY,

    order_id INT NOT NULL,

    product_id INT NOT NULL,

    quantity INT NOT NULL,

    price DECIMAL(10,2) NOT NULL,

    subtotal DECIMAL(10,2) NOT NULL,

    FOREIGN KEY(order_id)
    REFERENCES orders(id)
    ON DELETE CASCADE,

    FOREIGN KEY(product_id)
    REFERENCES products(id)
);
CREATE TABLE reviews (
 id INT AUTO_INCREMENT PRIMARY KEY,
 user_id INT,
 product_id INT,
 rating INT,
 comment TEXT,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (user_id) REFERENCES users(id),
 FOREIGN KEY (product_id) REFERENCES products(id)
);


