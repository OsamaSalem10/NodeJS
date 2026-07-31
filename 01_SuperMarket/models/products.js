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
    (
      name,
      description,
      price,
      image,
      image_public_id,
      category_id,
      discount,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, data, cb);
};

const updateProduct = (data, id, cb) => {
  const sql = `
 UPDATE products
    SET name=?, description=?, price=?, image=?, image_public_id=?, category_id=?, discount=? ,status=?   
    WHERE id=?
`;
  db.query(sql, [...data, id], cb);
};

const deleteProduct = (id, cb) => {
  db.query("DELETE FROM products WHERE id=?", [id], cb);
};
const searchProducts = (keyword, cb) => {
  const sql = `
    SELECT * FROM products WHERE name LIKE ? OR description LIKE ?
  `;
  db.query(sql, [`%${keyword}%`, `%${keyword}%`], cb);
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
};
