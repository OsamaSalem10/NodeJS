const db = require("../config/db");

class Categories {
    constructor(name) {
        this.name = name
    }
    // ==================== CREATE ====================
    async create() {
        const sql = `
      INSERT INTO categories
      (name) VALUES (?)`;

        const [result] = await db.promise().query(sql, [
            this.name
        ]);

        return result;
    }
    // ==================== READ ALL ====================
    static async findAll() {
        const sql = `
      SELECT *
      FROM categories
      ORDER BY id DESC
    `;

        const [result] = await db.promise().query(sql);

        return result;
    }
    // ==================== READ ONE ====================
    static async findById(id) {
        const sql = `
      SELECT *
      FROM categories
      WHERE id = ?
      LIMIT 1
    `;

        const [result] = await db.promise().query(sql, [id]);

        return result[0];
    }
    // ==================== UPDATE ====================
    static async update(id, name) {
        const sql = `
      UPDATE categories
      SET name = ? WHERE id = ?
    `;

        const [result] = await db.promise().query(sql, [
            name,
            id
        ]);

        return result;
    }
    // ==================== DELETE ====================
    static async delete(id) {
        const sql = `
      DELETE FROM categories
      WHERE id = ?
    `;

        const [result] = await db.promise().query(sql, [id]);

        return result;
    }
}

module.exports = Categories