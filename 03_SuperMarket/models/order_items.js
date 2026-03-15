const db = require("../config/db");

const getOrderItems = (cb) => {
  db.query("SELECT * FROM order_items", cb);
};

const getOrderItem = (id, cb) => {
  db.query("SELECT * FROM order_items WHERE id=?", [id], cb);
};

const createOrderItem = (data, cb) => {
  const sql = `
    INSERT INTO order_items (order_id, product_id, quantity, price)
    VALUES (?,?,?,?)
  `;
  db.query(sql, data, cb);
};

const updateOrderItem = (data, id, cb) => {
  const sql = `
    UPDATE order_items  
    SET order_id=?, product_id=?, quantity=?, price=?
    WHERE id=?
  `;
  db.query(sql, [...data, id], cb);
};

const deleteOrderItem = (id, cb) => {
  db.query("DELETE FROM order_items WHERE id=?", [id], cb);
};

module.exports = {
  getOrderItems,
  getOrderItem,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
};