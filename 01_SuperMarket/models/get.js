const connection = require("../config/db")

const getUsers = (cb) => {
  connection.query("SELECT * FROM users", cb);
};

const getProducts = (cb) => {
  connection.query("SELECT * FROM products", cb);
};

const getCategories = (cb) => {
  connection.query("SELECT * FROM categories", cb);
};
const getWishlist = (cb) => {
  connection.query("SELECT * FROM wishlist", cb);
};
const getCarts = (cb) => {
  connection.query("SELECT * FROM carts", cb);
};
const getOrder = (cb) => {
  connection.query("SELECT * FROM orders", cb);
};
const getOrderItems = (cb) => {
  connection.query("SELECT * FROM order_items", cb);
};
const getComments = (cb) => {
  connection.query("SELECT * FROM comments", cb);
};


module.exports = {
  getProducts,
  getCarts,
  getUsers,
  getCategories,
  getComments,
  getWishlist,
  getOrder,
  getOrderItems
};
