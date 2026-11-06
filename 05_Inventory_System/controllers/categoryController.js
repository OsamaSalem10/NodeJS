const Categories = require("../models/categoryModel")


class CategoriesController {
    static async getAll(req, res, next) {
        try {
            res.json({ result: await Categories.findAll() });
        } catch (error) {
            next(error);
        }
    };
    // ================= CREATE ================= //
    static async create(req, res, next) {
        try {
            const name = String(req.body.name || "").trim();

            if (!name || name.length > 100) {
                return res.status(400).json({
                    message: "اسم التصنيف مطلوب وبحد أقصى 100 حرف"
                });
            }
            const category = new Categories(name);
            const id = await category.create();

            res.status(201).json({
                message: "تم إنشاء التصنيف بنجاح",
                result: { id, name }
            });
        } catch (error) {
            next(error);
        }
    }
    // ================= update ================= //
    static async update(req, res, next) {
        try {
            const id = Number(req.params.id);
            const name = String(req.body.name || "").trim();

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    message: "رقم التصنيف غير صالح",
                });
            }

            if (!name || name.length > 100) {
                return res.status(400).json({
                    message: "اسم التصنيف مطلوب وبحد أقصى 100 حرف",
                });
            }

            const affectedRows = await Categories.update(id, name);

            if (affectedRows === 0) {
                return res.status(404).json({
                    message: "التصنيف غير موجود أو لم يتغير اسمه",
                });
            }

            return res.status(200).json({
                success: true,
                message: "تم تحديث التصنيف بنجاح",
            });
        } catch (error) {
            next(error);
        }
    }

    //==================== Delete ===========================//
   static async delete(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "رقم التصنيف غير صالح"
            });
        }

        const affectedRows = await Categories.delete(id);

        if (affectedRows === 0) {
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


module.exports = CategoriesController