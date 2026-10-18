const db = require("../config/db");

class Cart {
  constructor(user_id, product_id, quantity) {
    this.user_id = user_id;
    this.product_id = product_id;
    this.quantity = quantity;
  }

  // ================= CREATE ================= //

  async create() {
    const sql = `
      INSERT INTO carts
      (
        user_id,
        product_id,
        quantity
      )
      VALUES (?, ?, ?)
    `;

    const [result] = await db.promise().query(sql, [
      this.user_id,
      this.product_id,
      this.quantity
    ]);

    return result;
  }

  // ================= FIND ALL ================= //

  static async findAll() {
    const sql = `
      SELECT *
      FROM carts
      ORDER BY id DESC
    `;

    const [result] = await db.promise().query(sql);

    return result;
  }

  // ================= FIND BY ID ================= //

  static async findById(id) {
    const sql = `
      SELECT *
      FROM carts
      WHERE id = ?
    `;

    const [result] = await db.promise().query(sql, [id]);

    return result[0];
  }

  // ================= UPDATE ================= //

  async update(id) {
    const sql = `
      UPDATE carts
      SET
        user_id = ?,
        product_id = ?,
        quantity = ?
      WHERE id = ?
    `;

    const [result] = await db.promise().query(sql, [
      this.user_id,
      this.product_id,
      this.quantity,
      id
    ]);

    return result;
  }
    // DELETE
  static async delete(id) {
    const sql = `
      DELETE FROM carts
      WHERE id = ?
    `;

    const [result] = await db.promise().query(sql, [id]);

    return result;
  }
}

module.exports = Cart;