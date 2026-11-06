
const Products = require("../models/productModel");
const Categories = require("../models/categoryModel");

class ProductsController {

    // ==================== GET ALL ====================
    static async getAll(req, res, next) {
        try {
            const result = await Products.findAll();

            res.status(200).json({
                success: true,
                result,
            });

        } catch (error) {
            next(error);
        }
    }

    // ==================== GET ONE ====================
    static async getById(req, res, next) {
        try {
            const id = Number(req.params.id);

            if (!Number.isSafeInteger(id) || id <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "رقم المنتج غير صالح",
                });
            }

            const result = await Products.findById(id);

            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: "المنتج غير موجود",
                });
            }

            res.status(200).json({
                success: true,
                result,
            });

        } catch (error) {
            next(error);
        }
    }

    // ==================== CREATE ====================
    static async create(req, res, next) {
        try {
            const category_id = Number(req.body.category_id);
            const name = String(req.body.name || "").trim();
            const unit = req.body.unit;

            const Received = Number(req.body.Received ?? 0);
            const Sale = Number(req.body.Sale ?? 0);

            const validNumber = (value) =>
                Number.isFinite(value) && value >= 0;

            // Validate name
            if (!name || name.length > 150) {
                return res.status(400).json({
                    success: false,
                    message: "اسم المنتج مطلوب وبحد أقصى 150 حرفًا",
                });
            }

            // Validate category ID
            if (
                !Number.isSafeInteger(category_id) ||
                category_id <= 0
            ) {
                return res.status(400).json({
                    success: false,
                    message: "يرجى اختيار تصنيف صحيح",
                });
            }

            // Validate unit
            if (!["kg", "piece"].includes(unit)) {
                return res.status(400).json({
                    success: false,
                    message: "الوحدة يجب أن تكون kg أو piece",
                });
            }

            // Validate quantities
            if (
                !validNumber(Received) ||
                !validNumber(Sale)
            ) {
                return res.status(400).json({
                    success: false,
                    message: "الكميات يجب أن تكون أرقامًا صحيحة أو عشرية صفرًا أو أكثر",
                });
            }

            // Check category
            const category = await Categories.findById(category_id);

            if (!category) {
                return res.status(400).json({
                    success: false,
                    message: "التصنيف المحدد غير موجود",
                });
            }

            // Create product
            // Residual calculated automatically in Model
            const product = new Products({
                category_id,
                name,
                unit,
                Received,
                Sale,
            });

            const id = await product.create();

            const result = await Products.findById(id);

            res.status(201).json({
                success: true,
                message: "تمت إضافة المنتج بنجاح",
                result,
            });

        } catch (error) {
            next(error);
        }
    }

    // ==================== UPDATE ====================
    static async update(req, res, next) {
        try {
            const id = Number(req.params.id);
            const category_id = Number(req.body.category_id);
            const name = String(req.body.name || "").trim();
            const unit = req.body.unit;

            const Received = Number(req.body.Received);
            const Sale = Number(req.body.Sale);

            const validNumber = (value) =>
                Number.isFinite(value) && value >= 0;

            // Validate product ID
            if (!Number.isSafeInteger(id) || id <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "رقم المنتج غير صالح",
                });
            }

            // Validate name
            if (!name || name.length > 150) {
                return res.status(400).json({
                    success: false,
                    message: "اسم المنتج مطلوب وبحد أقصى 150 حرفًا",
                });
            }

            // Validate category
            if (
                !Number.isSafeInteger(category_id) ||
                category_id <= 0
            ) {
                return res.status(400).json({
                    success: false,
                    message: "يرجى اختيار تصنيف صحيح",
                });
            }

            // Validate unit
            if (!["kg", "piece"].includes(unit)) {
                return res.status(400).json({
                    success: false,
                    message: "الوحدة يجب أن تكون kg أو piece",
                });
            }

            // Validate quantities
            if (
                !validNumber(Received) ||
                !validNumber(Sale)
            ) {
                return res.status(400).json({
                    success: false,
                    message: "الكميات يجب أن تكون صفرًا أو أكثر",
                });
            }

            // Check product
            const existing = await Products.findById(id);

            if (!existing) {
                return res.status(404).json({
                    success: false,
                    message: "المنتج غير موجود",
                });
            }

            // Check category
            const category = await Categories.findById(category_id);

            if (!category) {
                return res.status(400).json({
                    success: false,
                    message: "التصنيف المحدد غير موجود",
                });
            }

            // Update product
            // Residual calculated automatically in Model
            const product = new Products({
                category_id,
                name,
                unit,
                Received,
                Sale,
            });

            await product.update(id);

            const result = await Products.findById(id);

            res.status(200).json({
                success: true,
                message: "تم تحديث المنتج بنجاح",
                result,
            });

        } catch (error) {
            next(error);
        }
    }

    // ==================== DELETE ====================
    static async delete(req, res, next) {
        try {
            const id = Number(req.params.id);

            if (!Number.isSafeInteger(id) || id <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "رقم المنتج غير صالح",
                });
            }

            const existing = await Products.findById(id);

            if (!existing) {
                return res.status(404).json({
                    success: false,
                    message: "المنتج غير موجود",
                });
            }

            const affectedRows = await Products.delete(id);

            if (affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "لم يتم حذف المنتج",
                });
            }

            res.status(200).json({
                success: true,
                message: "تم حذف المنتج بنجاح",
            });

        } catch (error) {

            if (error.code === "ER_ROW_IS_REFERENCED_2") {
                return res.status(409).json({
                    success: false,
                    message: "لا يمكن حذف المنتج لأنه مرتبط بحركات مخزون",
                });
            }

            next(error);
        }
    }
}

module.exports = ProductsController;
