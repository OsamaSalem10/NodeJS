const db = require("../config/db");

const getCategories = (cb) => {
  db.query("SELECT * FROM categories", cb);
};

const getCategory = (id, cb) => {
  db.query("SELECT * FROM categories WHERE id=?", [id], cb);
};

const createCategory = (data, cb) => {
  const sql = `
 INSERT INTO categories
 (name , image, image_public_id)
 VALUES (?, ?, ?)
 `; 
    db.query(sql, data, cb);
};

const updateCategory = (data, id, cb) => {
  const sql = `
 UPDATE categories
 SET name=?, image=?, image_public_id=?
 WHERE id=?
 `;
  db.query(sql, [...data, id], cb);
};  

const deleteCategory = (id, cb) => {
  db.query("DELETE FROM categories WHERE id=?", [id], cb);
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
};  

