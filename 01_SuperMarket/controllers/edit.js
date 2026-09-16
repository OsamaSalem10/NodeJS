const cloudinary = require("../config/cloudinary");
const editModels = require("../models/edit");
const { validationResult } = require("express-validator");
const models = require("../models/id");

exports.updateUser = async (req, res) => {
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

    const userId = req.params.id;

    // =========================
    // Get old user
    // =========================
    models.getUserById(userId, async (err, users) => {
      if (err) {
        console.error("Get User Error:", err);

        return res.status(500).json({
          status: 500,
          message: "Internal Server Error",
        });
      }

      if (users.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }

      const oldUser = users[0];

      // =========================
      // Data
      // =========================
      const {
        name,
        email,
        phone,
        location,
        description,
      } = req.body;

      let image = oldUser.image;
      let image_public_id = oldUser.image_public_id;

      // =========================
      // Upload new image
      // =========================
      if (req.file) {
        const result = await cloudinary.uploader.upload(
          req.file.path,
          {
            folder: "01_supermarket/users",
          }
        );

        image = result.secure_url;
        image_public_id = result.public_id;
      }

      // =========================
      // Updated data
      // =========================
      const updatedData = {
        name,
        email,
        phone,
        location,
        description,
        image,
        image_public_id,
      };

      // =========================
      // Update MySQL
      // =========================
      editModels.updateUser(
        updatedData,
        userId,
        async (err, result) => {
          if (err) {
            console.error("Update User Error:", err);

            // Delete NEW image if database update failed
            if (
              req.file &&
              image_public_id
            ) {
              try {
                await cloudinary.uploader.destroy(
                  image_public_id
                );
              } catch (cloudinaryError) {
                console.error(
                  "Cloudinary Delete Error:",
                  cloudinaryError
                );
              }
            }

            // Duplicate email
            if (err.code === "ER_DUP_ENTRY") {
              return res.status(409).json({
                status: 409,
                message: "Email already exists",
              });
            }

            return res.status(500).json({
              status: 500,
              message: "Error updating user",
            });
          }

          // =========================
          // Delete OLD image
          // =========================
          if (
            req.file &&
            oldUser.image_public_id &&
            oldUser.image_public_id !== image_public_id
          ) {
            try {
              await cloudinary.uploader.destroy(
                oldUser.image_public_id
              );
            } catch (cloudinaryError) {
              console.error(
                "Old Cloudinary Image Delete Error:",
                cloudinaryError
              );
            }
          }

          // =========================
          // Response
          // =========================
          return res.status(200).json({
            status: 200,
            message: "User updated successfully",
            result: {
              id: userId,
              name,
              email,
              phone,
              location,
              description,
              image,
              image_public_id,
            },
          });
        }
      );
    });
  } catch (error) {
    console.error("Update User Error:", error);

    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
exports.updateProduct = async (req, res) => {
  try {
 
    const id = req.params.id;
    const { name, description, price, category_id, discount, status } = req.body;
    models.getProductById(id, async (err, data) => {
      if (err) return res.json(err);
      let image = data[0].image;
      let public_id = data[0].image_public_id;
      if (req.file) {
        if (public_id) {
          await cloudinary.uploader.destroy(public_id);
        }
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "01_supermarket/products",
        });
        image = result.secure_url;
        public_id = result.public_id;
      }
      const updatedData = [
        name,
        description,
        price,
        image,
        public_id,
        category_id,
        discount,
        status,
        id
      ];
      editModels.updateProduct(updatedData, id, (err, result) => {
        if (err) {
          console.error("Update Product Error:", err);
          return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
          });
        }
        return res.status(200).json({
          status: 200,
          message: "Product updated successfully",
          result: {
            id,
            name,
            description,
            price,
            image,
            image_public_id: public_id,
            category_id,
            discount,
            status,
          },
        });
      });
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    
      const id = req.params.id;
    const { name, status } = req.body;
    models.getCategoryById(id, async (err, data) => {
       if (err) return res.json(err);
      let image = data[0].image;
      let public_id = data[0].image_public_id;
      if (req.file) {
        if (public_id) {
          await cloudinary.uploader.destroy(public_id);
        }
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "01_supermarket/categories",
        });
        image = result.secure_url;
        public_id = result.public_id;
      }
      const updatedData = [
        name,
        image,
        public_id,
        status,
        id
      ];
      editModels.updateCategory(updatedData, id, (err, result) => {
        if (err) {
          console.error("Update Category Error:", err);
          return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
          });
        }
        return res.status(200).json({
          status: 200,
          message: "Category updated successfully",
          result: {
            id,
            name,
            image,
            image_public_id: public_id,
            status,
          },
        });
      });
    });
  } catch (error) {
    console.error("Update Category Error:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};
