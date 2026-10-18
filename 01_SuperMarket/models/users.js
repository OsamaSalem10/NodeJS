// models/User.js

const db = require("../config/db");

class User {
  constructor(
    name,
    email,
    password,
    phone,
    location,
    image,
    image_public_id,
    description
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.location = location;
    this.image = image;
    this.image_public_id = image_public_id;
    this.description = description;
  }

  // CREATE
  async create() {
    const sql = `
      INSERT INTO users
      (
        name,
        email,
        password,
        phone,
        location,
        image,
        image_public_id,
        description
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.promise().query(sql, [
      this.name,
      this.email,
      this.password,
      this.phone,
      this.location,
      this.image,
      this.image_public_id,
      this.description
    ]);

    return result;
  }

  // READ ALL
  static async findAll() {
    const sql = `
      SELECT
        id,
        name,
        email,
        phone,
        location,
        image,
        image_public_id,
        description,
        created_at
      FROM users
      ORDER BY id DESC
    `;

    const [result] = await db.promise().query(sql);

    return result;
  }

  // READ ONE
  static async findById(id) {
    const sql = `
      SELECT
        id,
        name,
        email,
        phone,
        location,
        image,
        image_public_id,
        description,
        created_at
      FROM users
      WHERE id = ?
    `;

    const [result] = await db.promise().query(sql, [id]);

    return result[0];
  }

  // Find by email
  static async findByEmail(email) {
    const sql = `
      SELECT *
      FROM users
      WHERE email = ?
    `;

    const [result] = await db.promise().query(sql, [email]);

    return result[0];
  }

  // UPDATE
  static async update(
    id,
    name,
    email,
    phone,
    location,
    image,
    image_public_id,
    description
  ) {
    const sql = `
      UPDATE users
      SET
        name = ?,
        email = ?,
        phone = ?,
        location = ?,
        image = ?,
        image_public_id = ?,
        description = ?
      WHERE id = ?
    `;

    const [result] = await db.promise().query(sql, [
      name,
      email,
      phone,
      location,
      image,
      image_public_id,
      description,
      id
    ]);

    return result;
  }

  // DELETE
  static async delete(id) {
    const sql = `
      DELETE FROM users
      WHERE id = ?
    `;

    const [result] = await db.promise().query(sql, [id]);

    return result;
  }
}

module.exports = User;