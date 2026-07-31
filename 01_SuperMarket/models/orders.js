const db = require("../config/db");

/* إنشاء طلب */
const createOrder = (data, cb) => {

    const sql = `
        INSERT INTO orders
        (
            user_id,
            total,
            payment_method,
            payment_status,
            order_status,
            shipping_address,
            notes
        )
        VALUES (?,?,?,?,?,?,?)
    `;

    db.query(sql, data, cb);

};
/* جميع الطلبات */
const getOrders = (cb)=>{

    db.query(
        `
        SELECT
            orders.*,
            users.name,
            users.email
        FROM orders
        JOIN users
        ON users.id=orders.user_id
        ORDER BY orders.id DESC
        `,
        cb
    );

};

/* طلبات مستخدم */
const getUserOrders = (userId,cb)=>{

    db.query(
        `
        SELECT *
        FROM orders
        WHERE user_id=?
        ORDER BY id DESC
        `,
        [userId],
        cb
    );

};
/* طلب واحد */
const findById = (id,cb)=>{

    db.query(
        "SELECT * FROM orders WHERE id=?",
        [id],
        cb
    );

};
/* تحديث حالة الطلب */


const updateStatus = (status,id,cb)=>{

    db.query(
        "UPDATE orders SET order_status=? WHERE id=?",
        [status,id],
        cb
    );

};

module.exports = {
  getOrders,
getUserOrders,
  createOrder,
  findById,
  updateStatus,
};
