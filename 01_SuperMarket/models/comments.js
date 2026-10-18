const db = require("../config/db");

class Comments {
  constructor(user_id, product_id, comment) {
    this.user_id = user_id;
    this.product_id = product_id;
    this.comment = comment;
  }
  // ================= CREATE ================= //
  async create() {
    const sql = `
        INSERT INTO comments
        (
            user_id,
            product_id,
            comment
        )
        VALUES (?, ?, ?)
    `;
    const [result] = await db.promise().query(sql, [
      this.user_id,
      this.product_id,
      this.comment
    ]);
    return result;
  }
  // ================= FIND ALL ================= //
  static async findAll() {
    const sql = `
        SELECT *
        FROM comments
        ORDER BY id DESC
    `;
    const [result] = await db.promise().query(sql);
    return result;
  }
  // ================= FIND BY ID ================= //
  static async findById(id) {
    const sql = `
        SELECT *
        FROM comments
        WHERE id = ?
    `;
    const [result] = await db.promise().query(sql, [id]);
    return result[0];
  }
    // ================= UPDATE ================= //
    async update(id, user_id, product_id, comment) {
        const sql = `
            UPDATE comments
            SET user_id = ?, product_id = ?, comment = ?
            WHERE id = ?
        `;
        const [result] = await db.promise().query(sql, [user_id, product_id, comment, id]);
        return result;
    }
    // ================= DELETE ================= //
    static async delete(id) {
        const sql = `
            DELETE FROM comments
            WHERE id = ?
        `;
        const [result] = await db.promise().query(sql, [id]);
        return result;
    }
}

module.exports = Comments;