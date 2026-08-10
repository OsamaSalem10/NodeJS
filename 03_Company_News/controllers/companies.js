const companiesModel = require("../models/companies");
const cloudinary = require("../config/cloudinary");
const { validationResult } = require("express-validator");


exports.getAllCompanies = (req, res) => {
    companiesModel.getCompanies((err, data) => {
        if (err) return res.json(err);
        res.json(data);
    });
};


exports.create = async (req, res) => {
  try {
    const {
      user_id,
      category_id,
      name,
      description,
      website,
      email,
      phone,
      address,
      city,
      country,
    } = req.body;

    let logo = "";
    let logo_public_id =""
    let cover_public_id =""
    let cover = "";

    if (req.files?.logo) {
      const result = await cloudinary.uploader.upload(req.files.logo[0].path, {
        folder: "03_Company_News/companies/logo",
      });

      logo = result.secure_url;
      logo_public_id =result.public_id
    }

    if (req.files?.cover) {
      const result = await cloudinary.uploader.upload(req.files.cover[0].path, {
        folder: "03_Company_News/companies/cover",
      });

      cover = result.secure_url;
      cover_public_id =result.public_id
    }

    const data = [
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
    ];

    companiesModel.createCompany(data, (err) => {
      if (err) {
        return res.status(500).json({
          message: "Database Error",
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Company created successfully",
      });
    });
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};



exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const {
      user_id,
      category_id,
      name,
      description,
      website,
      email,
      phone,
      address,
      city,
      country,
    } = req.body;

    companiesModel.getCompany(id, async (err, company) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }

      let logo = company.logo;
      let logo_public_id = company.logo_public_id;

      let cover = company.cover;
      let cover_public_id = company.cover_public_id;

      // تحديث الشعار
      if (req.files?.logo) {
        if (logo_public_id) {
          await cloudinary.uploader.destroy(logo_public_id);
        }

        const result = await cloudinary.uploader.upload(
          req.files.logo[0].path,
          {
            folder: "03_Company_News/companies/logo",
          }
        );

        logo = result.secure_url;
        logo_public_id = result.public_id;
      }

      // تحديث الغلاف
      if (req.files?.cover) {
        if (cover_public_id) {
          await cloudinary.uploader.destroy(cover_public_id);
        }

        const result = await cloudinary.uploader.upload(
          req.files.cover[0].path,
          {
            folder: "03_Company_News/companies/cover",
          }
        );

        cover = result.secure_url;
        cover_public_id = result.public_id;
      }

      const data = [
        user_id,
        category_id,
        name,
        logo,
        logo_public_id,
        cover,
        cover_public_id,
        description,
        website,
        email,
        phone,
        address,
        city,
        country,
        id,
      ];

      companiesModel.updateCompany(data, (err) => {
        if (err) {
          return res.status(500).json({
            message: "Database error",
            error: err.message,
          });
        }

        res.json({
          message: "Company updated successfully",
        });
      });
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  companiesModel.getCompany(id, async (err, company) => {
    if (err) return res.status(500).json(err);

    const public_id = company.logo_public_id || company.cover_public_id;

    if (public_id) {
      await cloudinary.uploader.destroy(public_id);
    }

    companiesModel.deleteCompany(id, (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Company deleted",
      });
    });
  });
};