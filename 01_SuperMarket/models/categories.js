const db = require("../config/db");

class Category {
  constructor(name, image, image_public_id, status) {
    this.name = name;
    this.image = image;
    this.image_public_id = image_public_id;
    this.status = status;
  }

  // ==================== CREATE ====================
  async create() {
    const sql = `
      INSERT INTO categories
      (
        name,
        image,
        image_public_id,
        status
      )
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.promise().query(sql, [
      this.name,
      this.image,
      this.image_public_id,
      this.status
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
  async update(id) {
    const sql = `
      UPDATE categories
      SET
        name = ?,
        image = ?,
        image_public_id = ?,
        status = ?
      WHERE id = ?
    `;

    const [result] = await db.promise().query(sql, [
      this.name,
      this.image,
      this.image_public_id,
      this.status,
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

module.exports = Category;