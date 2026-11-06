
const mongoose = require("mongoose");

const Products = require("../models/productModel");
const Categories = require("../models/categoryModel");

class ProductsController {

    // ==================== GET ALL ====================
    static async getAll(req, res, next) {
        try {
            const result = await Products.getAll();

            return res.status(200).json({
                success: true,
                result
            });
        } catch (error) {
            next(error);
        }
    }

    // ==================== GET ONE ====================
    static async getById(req, res, next) {
        try {
            const { id } = req.params;

            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({
                    success: false,
                    message: "رقم المنتج غير صالح"
                });
            }

            const result = await Products.getById(id);

            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: "المنتج غير موجود"
                });
            }

            return res.status(200).json({
                success: true,
                result
            });
        } catch (error) {
            next(error);
        }
    }

    // ==================== CREATE ====================
    static async create(req, res, next) {
        try {
            const category_id = req.body.category_id;
            const name = String(req.body.name || "").trim();
            const unit = req.body.unit || "piece";

            const Received = Number(req.body.Received ?? 0);
            const Sale = Number(req.body.Sale ?? 0);

            const validNumber = (value) =>
                Number.isFinite(value) && value >= 0;

            if (!name || name.length > 150) {
                return res.status(400).json({
                    success: false,
                    message: "اسم المنتج مطلوب وبحد أقصى 150 حرفًا"
                });
            }

            if (!mongoose.isValidObjectId(category_id)) {
                return res.status(400).json({
                    success: false,
                    message: "يرجى اختيار تصنيف صحيح"
                });
            }

            if (!["kg", "piece"].includes(unit)) {
                return res.status(400).json({
                    success: false,
                    message: "الوحدة يجب أن تكون kg أو piece"
                });
            }

            if (!validNumber(Received) || !validNumber(Sale)) {
                return res.status(400).json({
                    success: false,
                    message: "الكميات يجب أن تكون أرقامًا صفرًا أو أكثر"
                });
            }

            if (Sale > Received) {
                return res.status(400).json({
                    success: false,
                    message: "الكمية المباعة لا يمكن أن تتجاوز الكمية المستلمة"
                });
            }

            const category = await Categories.findById(category_id);

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: "التصنيف المحدد غير موجود"
                });
            }

            const result = await Products.createProduct({
                category_id,
                name,
                unit,
                Received,
                Sale
            });

            const populatedProduct = await Products.getById(result._id);

            return res.status(201).json({
                success: true,
                message: "تمت إضافة المنتج بنجاح",
                result: populatedProduct
            });

        } catch (error) {
            next(error);
        }
    }

    // ==================== UPDATE ====================
    static async update(req, res, next) {
        try {
            const { id } = req.params;

            const category_id = req.body.category_id;
            const name = String(req.body.name || "").trim();
            const unit = req.body.unit;

            const Received = Number(req.body.Received);
            const Sale = Number(req.body.Sale);

            const validNumber = (value) =>
                Number.isFinite(value) && value >= 0;

            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({
                    success: false,
                    message: "رقم المنتج غير صالح"
                });
            }

            if (!name || name.length > 150) {
                return res.status(400).json({
                    success: false,
                    message: "اسم المنتج مطلوب وبحد أقصى 150 حرفًا"
                });
            }

            if (!mongoose.isValidObjectId(category_id)) {
                return res.status(400).json({
                    success: false,
                    message: "يرجى اختيار تصنيف صحيح"
                });
            }

            if (!["kg", "piece"].includes(unit)) {
                return res.status(400).json({
                    success: false,
                    message: "الوحدة يجب أن تكون kg أو piece"
                });
            }

            if (!validNumber(Received) || !validNumber(Sale)) {
                return res.status(400).json({
                    success: false,
                    message: "الكميات يجب أن تكون أرقامًا صفرًا أو أكثر"
                });
            }

            if (Sale > Received) {
                return res.status(400).json({
                    success: false,
                    message: "الكمية المباعة لا يمكن أن تتجاوز الكمية المستلمة"
                });
            }

            const category = await Categories.findById(category_id);

            if (!category) {
                return res.status(404).json({
                    success: false,
                    message: "التصنيف المحدد غير موجود"
                });
            }

            const result = await Products.updateProduct(id, {
                category_id,
                name,
                unit,
                Received,
                Sale
            });

            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: "المنتج غير موجود"
                });
            }

            const populatedProduct = await Products.getById(id);

            return res.status(200).json({
                success: true,
                message: "تم تحديث المنتج بنجاح",
                result: populatedProduct
            });

        } catch (error) {
            next(error);
        }
    }

    // ==================== DELETE ====================
    static async delete(req, res, next) {
        try {
            const { id } = req.params;

            if (!mongoose.isValidObjectId(id)) {
                return res.status(400).json({
                    success: false,
                    message: "رقم المنتج غير صالح"
                });
            }

            const deleted = await Products.deleteProduct(id);

            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: "المنتج غير موجود"
                });
            }

            return res.status(200).json({
                success: true,
                message: "تم حذف المنتج بنجاح"
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProductsController;
