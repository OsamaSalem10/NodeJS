const db = require("../config/db");

class Products {
  constructor(
    name,
    category_id,
    description,
    price,
    discount,
    image,
    image_public_id,
    status
  ) {
    this.name = name;
    this.category_id = category_id;
    this.description = description;
    this.price = price;
    this.discount = discount;
    this.image = image;
    this.image_public_id = image_public_id;
    this.status = status;
  }

  // CREATE
  async create() {
    const sql = `
      INSERT INTO products
      (
        category_id,
        name,
        description,
        price,
        image,
        image_public_id,
        discount,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.promise().query(sql, [
      this.category_id,
      this.name,
      this.description,
      this.price,
      this.image,
      this.image_public_id,
      this.discount,
      this.status
    ]);

    return result;
  }

  // READ ALL
  static async findAll() {
    const sql = `
      SELECT *
      FROM products
      ORDER BY id DESC
    `;

    const [result] = await db.promise().query(sql);
    return result;
  }

  // READ ONE
  static async findById(id) {
    const sql = `
      SELECT *
      FROM products
      WHERE id = ?
    `;

    const [result] = await db.promise().query(sql, [id]);
    return result[0];
  }

  // UPDATE
  static async update(
    id,
    name,
    category_id,
    description,
    price,
    image,
    image_public_id,
    discount,
    status
  ) {
    const sql = `
      UPDATE products
      SET
        name = ?,
        category_id = ?,
        description = ?,
        price = ?,
        image = ?,
        image_public_id = ?,
        discount = ?,
        status = ?
      WHERE id = ?
    `;

    const [result] = await db.promise().query(sql, [
      name,
      category_id,
      description,
      price,
      image,
      image_public_id,
      discount,
      status,
      id
    ]);

    return result;
  }

  // DELETE
  static async delete(id) {
    const sql = `
      DELETE FROM products
      WHERE id = ?
    `;

    const [result] = await db.promise().query(sql, [id]);
    return result;
  }
}

module.exports = Products;