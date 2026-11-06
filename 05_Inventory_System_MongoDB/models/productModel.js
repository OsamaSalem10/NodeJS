
const mongoose = require("mongoose");
const Categories = require("./categoryModel");

const productSchema = new mongoose.Schema(
    {
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150
        },
        unit: {
            type: String,
            enum: ["kg", "piece"],
            default: "piece",
            required: true
        },
        Received: {
            type: Number,
            default: 0,
            min: 0
        },
        Sale: {
            type: Number,
            default: 0,
            min: 0
        },
        Residual: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    { timestamps: true }
);

// VALIDATE + CALCULATE
productSchema.pre("validate", async function () {
    if (this.Sale > this.Received) {
        throw new Error("الكمية المباعة أكبر من الكمية المستلمة");
    }

    this.Residual = this.Received - this.Sale;

    const category = await Categories.findById(this.category_id);

    if (!category) {
        throw new Error("التصنيف غير موجود");
    }
});

// CREATE
productSchema.statics.createProduct = async function (data) {
    const product = new this(data);
    await product.save();
    return product;
};

// READ ALL
productSchema.statics.getAll = async function () {
    return await this.find()
        .populate("category_id", "name")
        .sort({ createdAt: -1 });
};

// READ ONE
productSchema.statics.getById = async function (id) {
    return await this.findById(id)
        .populate("category_id", "name");
};

// UPDATE
productSchema.statics.updateProduct = async function (id, data) {
    const product = await this.findById(id);

    if (!product) return null;

    product.category_id = data.category_id;
    product.name = data.name;
    product.unit = data.unit;
    product.Received = data.Received;
    product.Sale = data.Sale;

    await product.save();

    return product;
};

// DELETE
productSchema.statics.deleteProduct = async function (id) {
    const product = await this.findByIdAndDelete(id);
    return product;
};

const Products = mongoose.model("Product", productSchema);

module.exports = Products;
