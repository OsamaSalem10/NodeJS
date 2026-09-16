const db = require("../config/db");
const deleteUser = (id, cb) => {
  db.query("DELETE FROM users WHERE id=?", [id], cb);
};
const deleteProduct = (id, cb) => {
  db.query("DELETE FROM products WHERE id=?", [id], cb);
};
const deleteCategory = (id, cb) => {
  db.query("DELETE FROM categories WHERE id=?", [id], cb);
}

module.exports = {
  deleteUser,
  deleteProduct,
  deleteCategory
};
