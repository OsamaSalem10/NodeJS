const deleteModel = require("../models/delete");
const cloudinary = require("../config/cloudinary");
const models = require("../models/id");
exports.deleteUser = (req, res) => {
  const id = req.params.id;
  models.getUserById(id, async (err, data) => {
    if (err) return res.json(err);

    const public_id = data[0].image_public_id;

    if (public_id) {
      await cloudinary.uploader.destroy(public_id);
    }

    deleteModel.deleteUser(id, (err, result) => {
      if (err) return res.json(err);
      res.json({
        message: "User deleted",
      });
    });
  });
};
exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  models.getProductById(id, async (err, data) => {
    if (err) return res.json(err);

    const public_id = data[0].image_public_id;

    if (public_id) {
      await cloudinary.uploader.destroy(public_id);
    }

    deleteModel.deleteProduct(id, (err, result) => {
      if (err) return res.json(err);
      res.json({
        message: "Product deleted",
      });
    });
  });
};
exports.deleteCategory = (req, res) => {
  const id = req.params.id;
  models.getCategoryById(id, async (err, data) => {
    if (err) return res.json(err);

    const public_id = data[0].image_public_id;

    if (public_id) {
      await cloudinary.uploader.destroy(public_id);
    }

    deleteModel.deleteCategory(id, (err, result) => {
      if (err) return res.json(err);
      res.json({
        message: "Category deleted",
      });
    });
  });
};