const db = require("../config/db");

const updateUser = (data, id, cb) => {
  const sql = `
    UPDATE users
    SET
      name = ?,
      email = ?,
      image = ?,
      phone = ?,
      location = ?,
      description = ?,
      image_public_id = ?
    WHERE id = ?
  `;

  const values = [
    data.name,
    data.email,
    data.image,
    data.phone,
    data.location,
    data.description,
    data.image_public_id,
    id,
  ];

  db.query(sql, values, cb);
};

const updateProduct = (data, id, cb) => {
  const sql = `
 UPDATE products
    SET name=?, description=?, price=?, image=?, image_public_id=?, category_id=?, discount=? ,status=?   
    WHERE id=?
`;
  db.query(sql, [...data, id], cb);
};

const updateCategory = (data, id, cb) => {
  const sql = `
 UPDATE categories
    SET name=?, image=?, image_public_id=?, status=?
    WHERE id=?
  `;
  db.query(sql, [...data, id], cb);
};

module.exports = {
  updateUser,
  updateProduct,
  updateCategory
};