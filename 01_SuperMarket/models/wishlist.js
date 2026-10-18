const db =require("../config/db");

class Wishlist {
    constructor(user_id, product_id) {
        this.user_id = user_id;
        this.product_id = product_id;
    }
    // ================= CREATE ================= //
    async create() {
        const sql = `
            INSERT INTO wishlist
            (
                user_id,
                product_id
            )
            VALUES (?, ?)
        `;
        const [result] = await db.promise().query(sql, [
            this.user_id,
            this.product_id
        ]);
        return result;
    }
    // ================= FIND ALL ================= //
    static async findAll() {
        const sql = `
            SELECT *
            FROM wishlist
            ORDER BY id DESC
        `;
        const [result] = await db.promise().query(sql);
        return result;
    }
    // ================= FIND BY ID ================= //
    static async findById(id) {
        const sql = `
            SELECT *
            FROM wishlist
            WHERE id = ?
        `;
        const [result] = await db.promise().query(sql, [id]);
        return result[0];
    }
    // ================= UPDATE ================= //
    async update(id, user_id, product_id) {
        const sql = `
            UPDATE wishlist
            SET user_id = ?, product_id = ?
            WHERE id = ?
        `;
        const [result] = await db.promise().query(sql, [user_id, product_id, id]);
        return result;
    }
    // ================= DELETE ================= //
    static async delete(id) {
        const sql = `
            DELETE FROM wishlist
            WHERE id = ?
        `;
        const [result] = await db.promise().query(sql, [id]);
        return result;
    }
}
module.exports = Wishlist;