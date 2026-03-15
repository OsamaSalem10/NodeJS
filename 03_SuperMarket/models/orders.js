const db = require("../config/db");

const getOrders = (cb) => {
  db.query("SELECT * FROM orders", cb);
};

const getOrder = (id, cb) => {
  db.query("SELECT * FROM orders WHERE id=?", [id], cb);
};

const createOrder = (data, cb) => {
 const sql = `
INSERT INTO orders (user_id, product_id, status, total)
VALUES (?,?,?,?)
`;
  db.query(sql, data, cb);
};

const updateOrder = (data, id, cb) => {
  const sql = `
    UPDATE orders
    SET user_id=?, product_id=?, status=?, total=?
    WHERE id=?
    `;
  db.query(sql, [...data, id], cb);
};

const deleteOrder = (id, cb) => {
  db.query("DELETE FROM orders WHERE id=?", [id], cb);
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
