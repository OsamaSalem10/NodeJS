const db = require("../config/db");

const getProducts = (cb) => {
  db.query("SELECT * FROM products", cb);
};

const getProduct = (id, cb) => {
  db.query("SELECT * FROM products WHERE id=?", [id], cb);
};

const createProduct = (data, cb) => {
  const sql = `
 INSERT INTO products   
    (name, description, price, image, image_public_id, category_id) VALUES (?, ?, ?, ?, ?, ?)
`;
  db.query(sql, data, cb);
};

const updateProduct = (data, id, cb) => {
  const sql = `
 UPDATE products
    SET name=?, description=?, price=?, image=?, image_public_id=?, category_id=?   
    WHERE id=?
`;
  db.query(sql, [...data, id], cb);
};

const deleteProduct = (id, cb) => {
  db.query("DELETE FROM products WHERE id=?", [id], cb);
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
