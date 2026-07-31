const db = require("../config/db");

exports.getReviews = (cb) => {
  db.query("SELECT * FROM reviews", cb);
};

exports.getReview = (id, cb) => {
  db.query("SELECT * FROM reviews WHERE id=?", [id], cb);
};

exports.createReview = (data, cb) => {
  const sql = `
    INSERT INTO reviews (user_id, product_id, rating, comment)
    VALUES (?,?,?,?)
  `;
  db.query(sql, data, cb);
};

exports.updateReview = (data, id, cb) => {
  const sql = `
    UPDATE reviews  
    SET user_id=?, product_id=?, rating=?, comment=?
    WHERE id=?
  `;
  db.query(sql, [...data, id], cb);
};

exports.deleteReview = (id, cb) => {
  db.query("DELETE FROM reviews WHERE id=?", [id], cb);
};