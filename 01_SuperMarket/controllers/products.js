const Products = require("../models/products");
const cloudinary = require("../config/cloudinary");

class ProductController {

  // ================= CREATE =================

  static async create(req, res) {
    try {
      const {
        name,
        category_id,
        description,
        price,
        discount,
        status
      } = req.body;

      if (!name || !category_id || !price || !status) {
        return res.status(400).json({
          status: 400,
          message: "Name, category_id, price and status are required"
        });
      }

      if (!req.file) {
        return res.status(400).json({
          status: 400,
          message: "Image is required"
        });
      }

      let image = null;
      let image_public_id = null;

      // ================= Upload Image =================

      const uploadResult = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "01_supermarket/products",
          resource_type: "image",
          timeout: 120000
        }
      );

      image = uploadResult.secure_url;
      image_public_id = uploadResult.public_id;

      // ================= Create Product =================

      const product = new Products(
        name,
        category_id,
        description,
        price,
        discount || 0,
        image,
        image_public_id,
        status
      );

      try {

        const result = await product.create();

        return res.status(201).json({
          status: 201,
          message: "Product created successfully",
          result: {
            id: result.insertId,
            name,
            category_id,
            description,
            price,
            discount: discount || 0,
            image,
            image_public_id,
            status
          }
        });

      } catch (dbError) {

        // Database failed → remove uploaded image
        if (image_public_id) {
          await cloudinary.uploader.destroy(image_public_id);
        }

        throw dbError;
      }

    } catch (error) {

      console.error("Create Product Error:", error);

      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }


  // ================= READ ALL =================

  static async getAll(req, res) {
    try {

      const products = await Products.findAll();

      return res.status(200).json({
        status: 200,
        result: products
      });

    } catch (error) {

      console.error("Get Products Error:", error);

      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }


  // ================= READ ONE =================

  static async getById(req, res) {
    try {

      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({
          status: 400,
          message: "Invalid product id"
        });
      }

      const product = await Products.findById(id);

      if (!product) {
        return res.status(404).json({
          status: 404,
          message: "Product not found"
        });
      }

      return res.status(200).json({
        status: 200,
        result: product
      });

    } catch (error) {

      console.error("Get Product Error:", error);

      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }


  // ================= UPDATE =================

  static async update(req, res) {
    try {

      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({
          status: 400,
          message: "Invalid product id"
        });
      }

      const {
        name,
        category_id,
        description,
        price,
        discount,
        status
      } = req.body;

      // ================= Get Old Product =================

      const oldProduct = await Products.findById(id);

      if (!oldProduct) {
        return res.status(404).json({
          status: 404,
          message: "Product not found"
        });
      }

      // ================= Keep Old Image =================

      let image = oldProduct.image;
      let image_public_id = oldProduct.image_public_id;

      let newImagePublicId = null;

      // ================= New Image =================

      if (req.file) {

        const uploadResult = await cloudinary.uploader.upload(
          req.file.path,
          {
            folder: "01_supermarket/products",
            resource_type: "image",
            timeout: 120000
          }
        );

        image = uploadResult.secure_url;
        image_public_id = uploadResult.public_id;

        newImagePublicId = uploadResult.public_id;
      }

      // ================= Update Database =================

      try {

        const result = await Products.update(
          id,
          name,
          category_id,
          description,
          price,
          image,
          image_public_id,
          discount || 0,
          status
        );

        if (result.affectedRows === 0) {
          return res.status(404).json({
            status: 404,
            message: "Product not found"
          });
        }

      } catch (dbError) {

        // Database failed → delete NEW image
        if (newImagePublicId) {
          await cloudinary.uploader.destroy(
            newImagePublicId
          );
        }

        throw dbError;
      }

      // ================= Delete Old Image =================

      if (
        req.file &&
        oldProduct.image_public_id
      ) {
        await cloudinary.uploader.destroy(
          oldProduct.image_public_id
        );
      }

      return res.status(200).json({
        status: 200,
        message: "Product updated successfully",
        result: {
          id,
          name,
          category_id,
          description,
          price,
          discount: discount || 0,
          image,
          image_public_id,
          status
        }
      });

    } catch (error) {

      console.error("Update Product Error:", error);

      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }


  // ================= DELETE =================

  static async delete(req, res) {
    try {

      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({
          status: 400,
          message: "Invalid product id"
        });
      }

      // ================= Get Product =================

      const product = await Products.findById(id);

      if (!product) {
        return res.status(404).json({
          status: 404,
          message: "Product not found"
        });
      }

      // ================= Delete Database =================

      const result = await Products.delete(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: 404,
          message: "Product not found"
        });
      }

      // ================= Delete Cloudinary Image =================

      if (product.image_public_id) {
        await cloudinary.uploader.destroy(
          product.image_public_id
        );
      }

      return res.status(200).json({
        status: 200,
        message: "Product deleted successfully"
      });

    } catch (error) {

      console.error("Delete Product Error:", error);

      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }
}

module.exports = ProductController;