const db = require("../config/db");

class OrderItems {
  constructor(order_id, product_id, quantity, price , subtotal ) {
    this.order_id = order_id;
    this.product_id = product_id;
    this.quantity = quantity;
    this.price = price;
    this.subtotal = subtotal;
  }
  // ================= CREATE ================= //
  async create() {
    const sql = `
      INSERT INTO order_items
      (
        order_id,
        product_id,
        quantity,
        price,
        subtotal
      )
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.promise().query(sql, [
      this.order_id,
      this.product_id,
      this.quantity,
      this.price,
      this.subtotal
    ]);
    return result;
  }
  // ================= FIND ALL ================= //
  static async findAll() {
    const sql = `
      SELECT *
      FROM order_items
      ORDER BY id DESC
    `;
    const [result] = await db.promise().query(sql);
    return result;
  }
  // ================= FIND BY ID ================= //
  static async findById(id) {
    const sql = `
      SELECT *
      FROM order_items
      WHERE id = ?
    `;
    const [result] = await db.promise().query(sql, [id]);
    return result[0];
  }
  // ================= UPDATE ================= //
  async update(id, order_id, product_id, quantity, price , subtotal ) {
    const sql = `
      UPDATE order_items
      SET order_id = ?, product_id = ?, quantity = ?, price = ?, subtotal = ?
      WHERE id = ?
    `;
    const [result] = await db.promise().query(sql, [order_id, product_id, quantity, price , subtotal , id]);
    return result;
  }
  // ================= DELETE ================= //
  static async delete(id) {
    const sql = `
      DELETE FROM order_items
      WHERE id = ?
    `;
    const [result] = await db.promise().query(sql, [id]);
    return result;
  }
}

module.exports = OrderItems;