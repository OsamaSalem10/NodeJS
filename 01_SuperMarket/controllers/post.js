
const cloudinary = require("../config/cloudinary");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const model = require("../models/post");

exports.addUser = async (req, res) => {
  try {
    // =========================
    // Validation
    // =========================

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        errors: errors.array(),
      });
    }

    // =========================
    // Get body data
    // =========================

    const {
      name,
      email,
      password,
      phone,
      location,
      description,
    } = req.body;

    let image = null;
    let image_public_id = null;

    // =========================
    // Upload Image
    // =========================

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "01_supermarket/users",
      });

      image = result.secure_url;
      image_public_id = result.public_id;
    }

    // =========================
    // Hash Password
    // =========================

    const hashedPassword = await bcrypt.hash(password, 10);

    // =========================
    // Database Data
    // =========================

    const data = [
      name,
      email,
      hashedPassword,
      phone,
      image,
      image_public_id,
      location,
      description,
    ];

    // =========================
    // Create User
    // =========================

    model.createUser(data, async (err, result) => {
      if (err) {
        console.error("Create User Error:", err);

        // Delete image from Cloudinary
        if (image_public_id) {
          try {
            await cloudinary.uploader.destroy(image_public_id);
          } catch (cloudinaryError) {
            console.error(
              "Cloudinary Delete Error:",
              cloudinaryError
            );
          }
        }

        // Duplicate Email
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({
            status: 409,
            message: "Email already exists",
          });
        }

        return res.status(500).json({
          status: 500,
          message: "Internal Server Error",
        });
      }

      return res.status(201).json({
        status: 201,
        message: "Successfully created user",
        result: {
          id: result.insertId,
          name,
          email,
          phone,
          image,
          image_public_id,
          location,
          description,
        },
      });
    });
  } catch (error) {
    console.error("Add User Error:", error);

    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
exports.addProduct = async (req, res) => {
  try {
    // =========================
    // 1. Validation
    // =========================

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        errors: errors.array(),
      });
    }

    // =========================
    // 2. Get body data
    // =========================

    const {
      category_id,
      name,
      description,
      price,
      discount,
      status,
    } = req.body;

    // =========================
    // 3. Image
    // =========================

    let image = null;
    let image_public_id = null;

    // =========================
    // 4. Upload Image
    // =========================

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "01_supermarket/products",
        resource_type: "image",
        timeout: 120000,
      });

      image = result.secure_url;
      image_public_id = result.public_id;
    }

    // =========================
    // 5. Database Data
    // =========================

    const data = [
      category_id,
      name,
      description,
      price,
      image,
      image_public_id,
      discount,
      status,
    ];

    // =========================
    // 6. Create Product
    // =========================

    model.createProduct(data, async (err, result) => {
      if (err) {
        console.error("Create Product Error:", err);

        // Delete Cloudinary image if database insert failed
        if (image_public_id) {
          try {
            await cloudinary.uploader.destroy(image_public_id);
          } catch (cloudinaryError) {
            console.error(
              "Cloudinary Delete Error:",
              cloudinaryError
            );
          }
        }

        return res.status(500).json({
          status: 500,
          message: "Internal Server Error",
        });
      }

      return res.status(201).json({
        status: 201,
        message: "Successfully created product",
        result: {
          id: result.insertId,
          category_id,
          name,
          description,
          price,
          discount,
          status,
          image,
          image_public_id,
        },
      });
    });
  } catch (error) {

    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
exports.addCategory = async (req, res) => {
  try {
    // =========================
    // 1. Validation
    // =========================

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        errors: errors.array(),
      });
    }

    // =========================
    // 2. Get body data
    // =========================

    const {
      name,
      status,
    } = req.body;
 // =========================
    // 3. Image
    // =========================

    let image = null;
    let image_public_id = null;
    // =========================
    // 4. Upload Image
    // =========================

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "01_supermarket/categories",
        resource_type: "image",
        timeout: 120000,
      });

      image = result.secure_url;
      image_public_id = result.public_id;
    }
      // =========================
    // 5. Database Data
    // =========================

    const data = [
      name,
      image,
      image_public_id,
      status
    ];
  // =========================
    // 6. Create Product
    // =========================

    model.createCategory(data, async (err, result) => {
      if (err) {
        console.error("Create Category Error:", err);

        // Delete Cloudinary image if database insert failed
        if (image_public_id) {
          try {
            await cloudinary.uploader.destroy(image_public_id);
          } catch (cloudinaryError) {
            console.error(
              "Cloudinary Delete Error:",
              cloudinaryError
            );
          }
        }

        return res.status(500).json({
          status: 500,
          message: "Internal Server Error",
        });
      }

      return res.status(201).json({
        status: 201,
        message: "Successfully created product",
        result: {
          id: result.insertId,
          name,
          status,
          image,
          image_public_id,
        },
      });
    });

  } catch (error) {

    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}