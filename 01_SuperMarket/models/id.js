
const db = require("../config/db");
const getUserById = (id, cb) => {
  const sql = `
    SELECT *
    FROM users
    WHERE id = ?
  `;

  db.query(sql, [id], cb);
};
const getProductById = (id, cb) => {
  const sql = `
    SELECT *
    FROM products
    WHERE id = ?
  `;

  db.query(sql, [id], cb);
};

const getCategoryById = (id, cb) => {
  const sql = `
    SELECT *
    FROM categories
    WHERE id = ?
  `;
  db.query(sql, [id], cb);
}
module.exports = {
  getUserById,
  getProductById,
  getCategoryById
};

