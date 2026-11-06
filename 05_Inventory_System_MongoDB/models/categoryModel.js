
const mongoose = require("mongoose");

// ==================== SCHEMA ====================
const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
            unique: true
        }
    },
    {
        timestamps: true
    }
);

const Category = mongoose.models.Category ||
    mongoose.model("Category", categorySchema);


// ==================== OOP MODEL ====================
class Categories {

    constructor(name) {
        this.name = name;
    }

    // ================= CREATE ====================
    async create() {
        return await Category.create({
            name: this.name
        });
    }

    // ================= READ ALL ====================
    static async findAll() {
        return await Category.find()
            .sort({ _id: -1 });
    }

    // ================= READ ONE ====================
    static async findById(id) {
        return await Category.findById(id);
    }

    // ================= UPDATE ====================
    static async update(id, name) {
        return await Category.findByIdAndUpdate(
            id,
            { name },
            {
                new: true,
                runValidators: true
            }
        );
    }

    // ================= DELETE ====================
    static async delete(id) {
        return await Category.findByIdAndDelete(id);
    }
}

module.exports = Categories;
