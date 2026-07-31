const { login } = require("../../02_SuperMarket/controllers/users");
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
 (name,email,password,phone,image,role,status,image_public_id)
 VALUES (?,?,?,?,?,?,?,?)
 `;

    db.query(sql, data, cb);
};
const updateUser = (data, id, cb) => {
    const sql = `
 UPDATE users
 SET name=?,email=?,phone=?,image=?,role=?,status=?,image_public_id=?
 WHERE id=?
 `;
    db.query(sql, [...data, id], cb);
};

const deleteUser = (id, cb) => {
  db.query("DELETE FROM users WHERE id=?", [id], cb);
};

const getUserByEmail = (email, cb) => {
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], cb);
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail
}