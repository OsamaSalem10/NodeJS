const db = require("../config/db");

class Orders {
    constructor(user_id, total, payment_method, payment_status, order_status, shipping_address) {
        this.user_id = user_id;
        this.total = total;
        this.payment_method = payment_method;
        this.payment_status = payment_status;
        this.order_status = order_status;
        this.shipping_address = shipping_address;
    }
   // ================= CREATE ================= //
    async create() {
        const sql = `
            INSERT INTO orders
            (
                user_id,
                total,
                payment_method,
                payment_status,
                order_status,
                shipping_address
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.promise().query(sql, [
            this.user_id,
            this.total,
            this.payment_method,
            this.payment_status,
            this.order_status,
            this.shipping_address
        ]);
        return result;
    }
    // ================= FIND ALL ================= //
    static async findAll() {
        const sql = `
            SELECT *
            FROM orders
            ORDER BY id DESC
        `;
        const [result] = await db.promise().query(sql);
        return result;
    }
    // ================= FIND BY ID ================= //
    static async findById(id) {
        const sql = `
            SELECT *
            FROM orders
            WHERE id = ?
        `;
        const [result] = await db.promise().query(sql, [id]);
        return result[0];
    }
    // ================= UPDATE ================= //
    async update(id, user_id, total, payment_method, payment_status, order_status, shipping_address) {
        const sql = `
            UPDATE orders
            SET user_id = ?, total = ?, payment_method = ?, payment_status = ?, order_status = ?, shipping_address = ?
            WHERE id = ?
        `;
        const [result] = await db.promise().query(sql, [user_id, total, payment_method, payment_status, order_status, shipping_address, id]);
        return result;
    }
    // ================= DELETE ================= //
    static async delete(id) {
        const sql = `
            DELETE FROM orders
            WHERE id = ?
        `;
        const [result] = await db.promise().query(sql, [id]);
        return result;
    }

}

module.exports = Orders;