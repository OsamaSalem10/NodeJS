const categoriesModel = require("../models/categories");
const cloudinary = require("../config/cloudinary");
const { validationResult } = require("express-validator");

exports.getAllCategories = (req, res) => {
    categoriesModel.getCategories((err, data) => {
        if (err) return res.json(err);
        res.json(data);
    });
};

exports.getCategory = (req, res) => {
    categoriesModel.getCategory(req.params.id, (err, data) => {
        if (err) return res.json(err);
        res.json(data);
    });
};

exports.createCategory = async (req, res) => {
    let public_id = "";
    let image = "";
    try {
        const { name, description } = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "03_Company_News/categories",
            });

            image = result.secure_url;
            public_id = result.public_id;
        }
        const data = [name, image, description, public_id];
        categoriesModel.createCategory(data, async (err, result) => {
            if (err) {
                // حذف الصورة إذا فشل الإدخال
                if (public_id) {
                    await cloudinary.uploader.destroy(public_id);
                }
                console.error("Error creating category:", err);
                return res.status(500).json({ error: "Failed to create category" });
            }
            res.status(201).json({ message: "Category created successfully", data: result });
        });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Internal server error" });

    }
}


exports.updateCategory = async (req, res) => {
    let public_id = "";
    let image = "";
    try {
        const id = req.params.id;
        const { name, description } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        categoriesModel.getCategory(id, async (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length === 0) {
                return res.status(404).json({ message: "Category not found" });
            }

            let image = data[0].image;
            let public_id = data[0].image_public_id;

            if (req.file) {
                if (public_id) {
                    await cloudinary.uploader.destroy(public_id);
                }
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "03_Company_News/categories",
                });
                image = result.secure_url;
                public_id = result.public_id;

            }
            const updatedData = [name, image, description, public_id];
            categoriesModel.updateCategory(updatedData, id, async (err, result) => {
                if (err) {
                    console.error("Error updating category:", err);
                    return res.status(500).json({ error: "Failed to update category" });
                }
                res.json({ message: "Category updated successfully", data: result });
            });
        });
    } catch (error) {

        res.status(500).json({ error: "Internal server error" });
    }
}
exports.deleteCategory = async (req, res) => { 
  const id = req.params.id;
  
    categoriesModel.getCategory(id, async (err, data) => {
      if (err) return res.status(500).json(err);
  
      const public_id = data[0].image_public_id;
  
      if (public_id) {
        await cloudinary.uploader.destroy(public_id);
      }
  
      categoriesModel.deleteCategory(id, (err, result) => {
        if (err) return res.status(500).json(err);
  
        res.json({
          message: "category deleted",
        });
      });
    });
    
}