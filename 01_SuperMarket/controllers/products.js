const cloudinary = require("../config/cloudinary");
const productModel = require("../models/products");
const { validationResult } = require("express-validator");
exports.getAll = (req, res) => {
  productModel.getProducts((err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
};

exports.getOne = (req, res) => {
  productModel.getProduct(req.params.id, (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
};

exports.create = async (req, res) => {
  try {
    const { name, description, price, category_id  , discount  ,status  } = req.body;
     const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    let image = "";
    let public_id = "";
    
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "01_supermarket/products",
      });
      image = result.secure_url;
      public_id = result.public_id;
    }
    const data = [name, description, price, image, public_id, category_id  , discount  ,status ] ;
    productModel.createProduct(data, (err, result) => {
      if (err) return res.json(err);
      res.json(result);
    });
  } catch (error) {
    res.json(error);
  }
};


exports.update = async (req, res) => {
  try {
    const id = req.params.id;
   const { name, description, price, category_id  , discount ,status  } = req.body;
   
    productModel.getProduct(id, async (err, data) => {
      if (err) return res.json(err);
      let image = data[0].image;
      let public_id = data[0].image_public_id;
      if (req.file) {
        if (public_id) {
          await cloudinary.uploader.destroy(public_id);
        }
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "01_supermarket/products",
        });
        image = result.secure_url;
        public_id = result.public_id;
      }
      const updatedData = [
        name,
        description,
        price,
        image,
        public_id,
        category_id,
        discount,
        status
      ];
      productModel.updateProduct(updatedData, id, (err, result) => {
        if (err) return res.json(err);
        res.json(result);
      });
    });
  } catch (error) {
    res.json(error);
  }
};
exports.delete = (req, res) => {
  const id = req.params.id;
  productModel.getProduct(id, async (err, data) => {
    if (err) return res.json(err);

    const public_id = data[0].image_public_id;

    if (public_id) {
      await cloudinary.uploader.destroy(public_id);
    }

    productModel.deleteProduct(id, (err, result) => {
      if (err) return res.json(err);
      res.json({
        message: "Product deleted",
      });
    });
  });
};
exports.search = (req, res) => {
  const keyword = req.query.keyword;
  productModel.searchProducts(keyword, (err, data) => {
    if (err) return res.json(err);
    res.json(data);
  });
};
