const db = require("../config/db");

const getCompanies = (cb) => {
  db.query("SELECT * FROM companies", cb);
};

const getCompany = (id, cb) => {
  db.query("SELECT * FROM companies WHERE id=?", [id], cb);
};
const createCompany = (data, cb) => {
  const sql = `
    INSERT INTO companies (
      user_id,
      category_id,
      name,
      logo,
      cover,
      description,
      website,
      email,
      phone,
      address,
      city,
      country,    
       logo_public_id,
cover_public_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ? , ?)
  `;

  db.query(sql, data, cb);
};

const updateCompany = (data, cb) => {
  const sql = `
    UPDATE companies
    SET
      user_id=?,
      category_id=?,
      name=?,
      logo=?,
      logo_public_id=?,
      cover=?,
      cover_public_id=?,
      description=?,
      website=?,
      email=?,
      phone=?,
      address=?,
      city=?,
      country=?
    WHERE id=?
  `;

  db.query(sql, data, cb);
};
const deleteCompany = (id, cb) => {
  db.query("DELETE FROM companies WHERE id=?", [id], cb);
};

module.exports = {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany
}