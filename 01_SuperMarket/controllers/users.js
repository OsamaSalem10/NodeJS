
const bcrypt = require("bcryptjs");

const User = require("../models/users");
const cloudinary = require("../config/cloudinary");

class UserController {

  // ================= CREATE =================

  static async create(req, res) {
    try {
      const {
        name,
        email,
        password,
        phone,
        location,
        description
      } = req.body;
      let image = null;
      let image_public_id = null;

      if (!name || !email || !password) {
        return res.status(400).json({
          message: "Name, email and password are required"
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: "Image is required"
        });
      }

      // Check email
      const existingUser =
        await User.findByEmail(email);

      if (existingUser) {
        return res.status(409).json({
          message: "Email already exists"
        });
      }

      // Hash password
      const hashedPassword =
        await bcrypt.hash(password, 10);

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
      // Create object
      const user = new User(
        name,
        email,
        hashedPassword,
        phone,
        location,
        image,
        image_public_id,
        description
      );

      const result =
        await user.create();

      res.status(201).json({
        status: 201,
        message: "User created successfully",
        result: {
          id: result.insertId,
          name,
          email,
          phone,
          location,
          image,
          image_public_id,
          description
        }
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }


  // ================= READ ALL =================

  static async getAll(req, res) {
    try {

      const users =
        await User.findAll();

      res.status(200).json({
        status: 200,
        result: users
      });

    } catch (error) {

      res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }


  // ================= READ ONE =================

  static async getById(req, res) {
    try {

      const user =
        await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      res.status(200).json({
        status: 200,
        result: user
      });

    } catch (error) {

      res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }


  // ================= UPDATE =================

  static async update(req, res) {
    try {

      const { id } = req.params;

      const {
        name,
        email,
        phone,
        location,
        description
      } = req.body;

      const oldUser =
        await User.findById(id);

      if (!oldUser) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      // Check email only if changed
      if (email !== oldUser.email) {

        const emailUser =
          await User.findByEmail(email);

        if (emailUser) {
          return res.status(409).json({
            message: "Email already exists"
          });
        }
      }

      let image =
        oldUser.image;

      let image_public_id =
        oldUser.image_public_id;


      // New image?
      if (req.file) {

        // Delete old image
        if (oldUser.image_public_id) {
          await cloudinary.uploader.destroy(
            oldUser.image_public_id
          );
        }

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

 
      }


      await User.update(
        id,
        name,
        email,
        phone,
        location,
        image,
        image_public_id,
        description
      );

      res.status(200).json({
        status: 200,
        message: "User updated successfully"
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }


  // ================= DELETE =================

  static async delete(req, res) {
    try {

      const { id } = req.params;

      const user =
        await User.findById(id);

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      // Delete Cloudinary image
      if (user.image_public_id) {

        await cloudinary.uploader.destroy(
          user.image_public_id
        );
      }

      // Delete MySQL user
      await User.delete(id);

      res.status(200).json({
        status: 200,
        message: "User deleted successfully"
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }
}

module.exports = UserController;