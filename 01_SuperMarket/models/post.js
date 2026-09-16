const db = require("../config/db");

const createUser = (data, cb) => {

    const sql = `
 INSERT INTO users
 (name,email,password,phone,image,image_public_id,location,description)
 VALUES (?,?,?,?,?,?,?,?)
 `;

    db.query(sql, data, cb);
};

const createProduct = (data, cb) => {
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

    db.query(sql, data, cb);
};
const createCategory = (data, cb) => {
    const sql = `
 INSERT INTO categories
 (name,image ,image_public_id , status)
 VALUES (?,?,?,?)
 `;
    db.query(sql, data, cb);
}

module.exports = {
    createUser,
    createProduct,
    createCategory
}
