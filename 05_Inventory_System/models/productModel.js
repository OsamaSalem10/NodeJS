
const db = require("../config/db");

class Products {
    constructor({
        category_id,
        name,
        unit = "piece",
        Received = 0,
        Sale = 0,
        Residual = 0
    }) {
        this.category_id = category_id;
        this.name = name;
        this.unit = unit;
        this.Received = Received;
        this.Sale = Sale;

        // حساب المتبقي تلقائياً
        this.Residual = Received - Sale;
    }

    // CREATE
    async create() {
        const sql = `
            INSERT INTO products
            (category_id, name, unit, Received, Sale, Residual)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.promise().query(sql, [
            this.category_id,
            this.name,
            this.unit,
            this.Received,
            this.Sale,
            this.Residual
        ]);

        return result.insertId;
    }

    // READ ALL
    static async findAll() {
        const sql = `
            SELECT
                p.id,
                p.category_id,
                c.name AS category_name,
                p.name,
                p.unit,
                p.Received,
                p.Sale,
                p.Residual
            FROM products p
            INNER JOIN categories c
                ON c.id = p.category_id
            ORDER BY p.id DESC
        `;

        const [rows] = await db.promise().query(sql);
        return rows;
    }

    // READ ONE
    static async findById(id) {
        const sql = `
            SELECT
                p.id,
                p.category_id,
                c.name AS category_name,
                p.name,
                p.unit,
                p.Received,
                p.Sale,
                p.Residual
            FROM products p
            INNER JOIN categories c
                ON c.id = p.category_id
            WHERE p.id = ?
            LIMIT 1
        `;

        const [rows] = await db.promise().query(sql, [id]);

        return rows[0] || null;
    }

    // UPDATE
    async update(id) {
        const sql = `
            UPDATE products
            SET category_id = ?,
                name = ?,
                unit = ?,
                Received = ?,
                Sale = ?,
                Residual = ?
            WHERE id = ?
        `;

        const [result] = await db.promise().query(sql, [
            this.category_id,
            this.name,
            this.unit,
            this.Received,
            this.Sale,
            this.Residual,
            id
        ]);

        return result.affectedRows;
    }

    // DELETE
    static async delete(id) {
        const sql = `
            DELETE FROM products
            WHERE id = ?
        `;

        const [result] = await db.promise().query(sql, [id]);

        return result.affectedRows;
    }
}

module.exports = Products;
