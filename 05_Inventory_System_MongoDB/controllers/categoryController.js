
const Categories = require("../models/categoryModel");
const mongoose = require("mongoose");

class CategoriesController {

    // ================= GET ALL =================
    static async getAll(req, res, next) {
        try {
            const categories = await Categories.findAll();

            return res.status(200).json({
                success: true,
                result: categories
            });

        } catch (error) {
            next(error);
        }
    }

    // ================= CREATE =================
    static async create(req, res, next) {
        try {
            const name = String(req.body.name || "").trim();

            if (!name || name.length > 100) {
                return res.status(400).json({
                    message: "اسم التصنيف مطلوب وبحد أقصى 100 حرف"
                });
            }

            const category = new Categories(name);
            const result = await category.create();

            return res.status(201).json({
                success: true,
                message: "تم إنشاء التصنيف بنجاح",
                result
            });

        } catch (error) {
            next(error);
        }
    }

    // ================= UPDATE =================
    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const name = String(req.body.name || "").trim();

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    message: "رقم التصنيف غير صالح"
                });
            }

            if (!name || name.length > 100) {
                return res.status(400).json({
                    message: "اسم التصنيف مطلوب وبحد أقصى 100 حرف"
                });
            }

            const category = await Categories.update(id, name);

            if (!category) {
                return res.status(404).json({
                    message: "التصنيف غير موجود"
                });
            }

            return res.status(200).json({
                success: true,
                message: "تم تحديث التصنيف بنجاح",
                result: category
            });

        } catch (error) {
            next(error);
        }
    }

    // ================= DELETE =================
    static async delete(req, res, next) {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    message: "رقم التصنيف غير صالح"
                });
            }

            const category = await Categories.delete(id);

            if (!category) {
                return res.status(404).json({
                    message: "التصنيف غير موجود"
                });
            }

            return res.status(200).json({
                success: true,
                message: "تم حذف التصنيف بنجاح"
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = CategoriesController;
