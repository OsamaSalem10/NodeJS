const db = require("../config/db");

/* إنشاء عنصر داخل الطلب */
const create = (data, cb) => {
  const sql = `
    INSERT INTO order_items
    (order_id, product_id, quantity, price, subtotal)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, data, cb);
};

/* جميع عناصر الطلب */

const getByOrderId = (orderId, cb) => {
  const sql = `
    SELECT
      oi.id,
      oi.quantity,
      oi.price,
      oi.subtotal,

      p.id AS product_id,
      p.name,
      p.image

    FROM order_items oi

    JOIN products p
      ON oi.product_id = p.id

    WHERE oi.order_id = ?
  `;

  db.query(sql, [orderId], cb);
};


/* حذف عنصر */
const  deleteItem = (id, cb) => {
  db.query(
    "DELETE FROM order_items WHERE id=?",
    [id],
    cb
  );
};
module.exports = {
  create,
  getByOrderId,
deleteItem
};