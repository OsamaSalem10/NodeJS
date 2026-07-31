const userModel = require("../models/users");
const cloudinary = require("../config/cloudinary");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
exports.getAll = (req, res) => {
  userModel.getUsers((err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
};

exports.getOne = (req, res) => {
  userModel.getUser(req.params.id, (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
};

exports.create = async (req, res) => {
  try {
    const { name, email, password, phone, location, description } = req.body;
    const validationErrors = [];

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const hash = await bcrypt.hash(password, 10);

    let image = "";
    let public_id = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "01_supermarket/users",
      });

      image = result.secure_url;
      public_id = result.public_id;
    }

    const data = [
      name,
      email,
      hash,
      phone,
      image,
      public_id,
      location,
      description,
    ];

    userModel.createUser(data, async (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          if (public_id) {
            await cloudinary.uploader.destroy(public_id);
          }
          return res.status(400).json({
            message: "Email already exists",
          });
        }

        return res.status(500).json({
          message: "Database error",
        });
      }

      return res.status(201).json({
        message: "User created successfully",
        image,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, location, description } = req.body;

    userModel.findById(id, async (err, users) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      if (users.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const user = users[0];

      let image = user.image;
      let image_public_id = user.image_public_id;

      // رفع صورة جديدة
      if (req.file) {
        // حذف الصورة القديمة
        if (user.image_public_id) {
          await cloudinary.uploader.destroy(
            user.image_public_id
          );
        }

        const upload = await cloudinary.uploader.upload(
          req.file.path,
          {
            folder: "01_supermarket/users",
          }
        );

        image = upload.secure_url;
        image_public_id = upload.public_id;
      }

      userModel.emailExists(email, id, (err, rows) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }

        // الإيميل مستخدم من مستخدم آخر
        if (rows.length > 0) {
          return res.status(400).json({
            message: "Email already exists",
          });
        }

        const data = [
          name,
          email,
          phone,
          location,
          description,
          image,
          image_public_id,
        ];

        userModel.updateUser(data, id, (err) => {
          if (err) {
            return res.status(500).json({
              message: err.message,
            });
          }

          return res.status(200).json({
            message: "User updated successfully",
            image,
          });
        });
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
exports.delete = (req, res) => {
  const id = req.params.id;

  userModel.getUserById(id, async (err, data) => {
    if (err) return res.status(500).json(err);

    const public_id = data[0].image_public_id;

    if (public_id) {
      await cloudinary.uploader.destroy(public_id);
    }

    userModel.deleteUser(id, (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "user deleted",
      });
    });
  });
};
exports.search = (req, res) => {
  const keyword = req.query.q;

  userModel.searchUsers(keyword, (err, data) => {
    if (err) return res.status(500).json(err);

    res.json(data);
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  userModel.getUserByEmail(email, async (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.json({ message: "User not found" });
    }

    const user = data[0];

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ message: "Wrong password" });
    }

    res.json({
      message: "Login success",
      user: user,
    });
  });
};
