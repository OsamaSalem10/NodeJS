const express = require("express");
const CategoriesController = require("../controllers/categoryController")
const ProductsController = require("../controllers/productController");
const router = express.Router();
router.get("/categories", CategoriesController.getAll);
router.post("/categories", CategoriesController.create);
router.put("/categories/:id", CategoriesController.update);
router.delete("/categories/:id", CategoriesController.delete);


router.get("/products", ProductsController.getAll);
router.get("/products/:id", ProductsController.getById);
router.post("/products/", ProductsController.create);
router.put("/products/:id", ProductsController.update);
router.delete("/products/:id", ProductsController.delete);

module.exports = router;