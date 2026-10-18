const Category = require("../models/categories");
const cloudinary = require("../config/cloudinary");

class CategoryController {

  // ================= CREATE ================= //
  static async create(req, res) {
    try {
      const { name, status } = req.body;

      // Validation
      if (!name || !status) {
        return res.status(400).json({
          status: 400,
          message: "Name and status are required"
        });
      }

      // Image required for CREATE
      if (!req.file) {
        return res.status(400).json({
          status: 400,
          message: "Image is required"
        });
      }

      // Upload image
      const uploadResult = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "01_supermarket/categories",
          resource_type: "image",
          timeout: 120000
        }
      );

      const image = uploadResult.secure_url;
      const image_public_id = uploadResult.public_id;

      try {
        // IMPORTANT:
        // constructor(name, image, image_public_id, status)
        const category = new Category(
          name,
          image,
          image_public_id,
          status
        );

        const result = await category.create();

        return res.status(201).json({
          status: 201,
          message: "Category created successfully",
          category: {
            id: result.insertId,
            name,
            image,
            image_public_id,
            status
          }
        });

      } catch (dbError) {

        // DB failed -> remove uploaded image
        if (image_public_id) {
          await cloudinary.uploader.destroy(image_public_id);
        }

        throw dbError;
      }

    } catch (error) {
      console.error("Create Category Error:", error);

      return res.status(500).json({
        status: 500,
        message: "Error creating category",
        error: error.message
      });
    }
  }


  // ================= READ ALL ================= //
  static async getAll(req, res) {
    try {

      const categories = await Category.findAll();

      return res.status(200).json({
        status: 200,
        message: "Categories retrieved successfully",
        result: categories
      });

    } catch (error) {

      console.error("Get Categories Error:", error);

      return res.status(500).json({
        status: 500,
        message: "Error retrieving categories",
        error: error.message
      });
    }
  }


  // ================= READ ONE ================= //
  static async getOne(req, res) {
    try {

      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({
          status: 400,
          message: "Invalid category id"
        });
      }

      const category = await Category.findById(id);

      if (!category) {
        return res.status(404).json({
          status: 404,
          message: "Category not found"
        });
      }

      return res.status(200).json({
        status: 200,
        message: "Category retrieved successfully",
        category
      });

    } catch (error) {

      console.error("Get Category Error:", error);

      return res.status(500).json({
        status: 500,
        message: "Error retrieving category",
        error: error.message
      });
    }
  }


  // ================= UPDATE ================= //
  static async update(req, res) {
    try {

      const { id } = req.params;
      const { name, status } = req.body;

      if (!id || isNaN(id)) {
        return res.status(400).json({
          status: 400,
          message: "Invalid category id"
        });
      }

      if (!name || !status) {
        return res.status(400).json({
          status: 400,
          message: "Name and status are required"
        });
      }

      // Get old category
      const oldCategory = await Category.findById(id);

      if (!oldCategory) {
        return res.status(404).json({
          status: 404,
          message: "Category not found"
        });
      }

      // Keep old image by default
      let image = oldCategory.image;
      let image_public_id = oldCategory.image_public_id;

      // Used if a new image was uploaded
      let newImagePublicId = null;


      // ================= NEW IMAGE ================= //

      if (req.file) {

        const uploadResult = await cloudinary.uploader.upload(
          req.file.path,
          {
            folder: "01_supermarket/categories",
            resource_type: "image",
            timeout: 120000
          }
        );

        image = uploadResult.secure_url;
        image_public_id = uploadResult.public_id;

        newImagePublicId = uploadResult.public_id;
      }


      try {

        // IMPORTANT:
        // constructor(name, image, image_public_id, status)

        const category = new Category(
          name,
          image,
          image_public_id,
          status
        );

        const result = await category.update(id);

        if (result.affectedRows === 0) {

          // DB didn't update
          if (newImagePublicId) {
            await cloudinary.uploader.destroy(newImagePublicId);
          }

          return res.status(404).json({
            status: 404,
            message: "Category not found"
          });
        }

      } catch (dbError) {

        // DB failed -> remove NEW image
        if (newImagePublicId) {
          await cloudinary.uploader.destroy(newImagePublicId);
        }

        throw dbError;
      }


      // ================= DELETE OLD IMAGE ================= //

      // Only delete old image if a NEW image was uploaded
      if (
        req.file &&
        oldCategory.image_public_id
      ) {
        await cloudinary.uploader.destroy(
          oldCategory.image_public_id
        );
      }


      return res.status(200).json({
        status: 200,
        message: "Category updated successfully",
        category: {
          id: Number(id),
          name,
          image,
          image_public_id,
          status
        }
      });

    } catch (error) {

      console.error("Update Category Error:", error);

      return res.status(500).json({
        status: 500,
        message: "Error updating category",
        error: error.message
      });
    }
  }


  // ================= DELETE ================= //
  static async delete(req, res) {
    try {

      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({
          status: 400,
          message: "Invalid category id"
        });
      }

      // Get category first
      const category = await Category.findById(id);

      if (!category) {
        return res.status(404).json({
          status: 404,
          message: "Category not found"
        });
      }

      // Delete from database first
      const result = await Category.delete(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: 404,
          message: "Category not found"
        });
      }

      // Delete image from Cloudinary
      if (category.image_public_id) {
        await cloudinary.uploader.destroy(
          category.image_public_id
        );
      }

      return res.status(200).json({
        status: 200,
        message: "Category deleted successfully"
      });

    } catch (error) {

      console.error("Delete Category Error:", error);

      return res.status(500).json({
        status: 500,
        message: "Error deleting category",
        error: error.message
      });
    }
  }
}

module.exports = CategoryController;