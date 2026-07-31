const db = require("../config/db");

const getUsers = (cb) => {
  db.query("SELECT * FROM users", cb);
};
const getUser = (id, cb) => {
  db.query("SELECT * FROM users WHERE id=?", [id], cb);
};
const createUser = (data, cb) => {

  const sql = `
 INSERT INTO users
 (name,email,password,phone,image,image_public_id,location,description)
 VALUES (?,?,?,?,?,?,?,?)
 `;

  db.query(sql, data, cb);
};

const getUserById = (id, cb) => {
  db.query("SELECT * FROM users WHERE id=?", [id], cb);
};



const deleteUser = (id, cb) => {
  db.query("DELETE FROM users WHERE id=?", [id], cb);
};
const searchUsers = (keyword, cb) => {
  const sql = `
 SELECT * FROM users
 WHERE name LIKE ?
 OR email LIKE ?
 OR phone LIKE ?
 OR location LIKE ?
 OR id LIKE ?
 `;

 
  const value = "%" + keyword + "%";

  db.query(sql, [value, value, value, value, value], cb);
};

const getUserByEmail = (email, cb) => {

  const sql = "SELECT * FROM users WHERE email=?"

  db.query(sql, [email], cb)

}
/* email with update */
const updateUser = (data, id, cb) => {
  const sql = `
    UPDATE users
    SET
      name=?,
      email=?,
      phone=?,
      location=?,
      description=?,
      image=?,
      image_public_id=?
    WHERE id=?
  `;

  db.query(sql, [...data, id], cb);
};
/* email not update */
const updateWithoutEmail = (data, id, cb) => {
  const sql = `
    UPDATE users
    SET
      name=?,
      phone=?,
      location=?,
      description=?,
      image=?,
      image_public_id=?
    WHERE id=?
  `;

  db.query(sql, [...data, id], cb);
};
/* التحقق من الإيميل */
const emailExists = (email, id, callback) => {
  db.query(
    "SELECT id FROM users WHERE email = ? AND id != ?",
    [email, id],
    callback
  );
};
const findById = (id, callback) => {
  db.query(
    "SELECT * FROM users WHERE id = ?",
    [id],
    callback
  );
};
module.exports = {
  getUsers,
  getUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  searchUsers,
  getUserByEmail,
  emailExists,
  updateWithoutEmail,
  findById
};
