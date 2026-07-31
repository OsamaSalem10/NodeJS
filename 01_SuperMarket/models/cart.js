const db = require("../config/db");
/* عرض السلة */
const getCart = (userId, cb) => {
  const sql = `
  SELECT
    carts.id AS cart_id,
    carts.quantity,

    users.id AS user_id,
    users.name AS user_name,
    users.email,
    users.phone,

    products.id AS product_id,
    products.name AS product_name,
    products.price,
    products.discount,
    products.image

FROM carts

JOIN users
    ON carts.user_id = users.id

JOIN products
    ON carts.product_id = products.id

WHERE carts.user_id = ?
  `;

  db.query(sql, [userId], cb);
};
/* إضافة منتج */


const addToCart = (data, cb) => {
  const sql = `
    INSERT INTO carts (user_id, product_id, quantity)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE
    quantity = quantity + VALUES(quantity)
  `;

  db.query(sql, data, cb);
};
/* تعديل الكمية */
const updateQuantity = (quantity, id, cb) => {
  db.query(
    "UPDATE carts SET quantity=? WHERE id=?",
    [quantity, id],
    cb
  );
};
/* حذف منتج */
const deleteItem = (id, cb) => {
  db.query(
    "DELETE FROM carts WHERE id=?",
    [id],
    cb
  );
};

/* حذف السلة */
const clearCart = (userId, cb) => {
  db.query(
    "DELETE FROM carts WHERE user_id=?",
    [userId],
    cb
  );
};

module.exports = {
    addToCart,
    clearCart,
    getCart,
    updateQuantity,
    deleteItem
}