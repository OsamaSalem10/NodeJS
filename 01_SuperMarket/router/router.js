const express = require("express");
const UserController = require("../controllers/users")
const CartController = require("../controllers/cart")
const ProductController = require("../controllers/products")
const CategoryController = require("../controllers/categories")
const wishlistController = require("../controllers/wishlist")
const OrdersController = require("../controllers/orders")
const OrderItemsController = require("../controllers/order_items")
const CommentsController = require("../controllers/comments")
const { upload } = require("../middleware/upload");

const router = express.Router();

/* ============================= User ============================= */

router.get("/users", UserController.getAll);
router.get("/users/:id", UserController.getById);
router.post("/users", upload.single("image"), UserController.create);
router.put("/users/:id", upload.single("image"), UserController.update);
router.delete("/users/:id", UserController.delete);

/* ============================= Products ============================= */
router.get("/products", ProductController.getAll);
router.post("/products", upload.single("image"), ProductController.create);
router.get("/products/:id", ProductController.getById);
router.put("/products/:id", upload.single("image"), ProductController.update);
router.delete("/products/:id", ProductController.delete);
/* ============================= categories ============================= */
router.get("/categories", CategoryController.getAll);
router.post("/categories", upload.single("image"), CategoryController.create);
router.put("/categories/:id", upload.single("image"), CategoryController.update);
router.delete("/categories/:id", CategoryController.delete);

/* ============================= Cart ============================= */

router.get("/carts", CartController.getAll)
router.post("/carts", CartController.create)
router.post("/carts/:id", CartController.getById)
router.put("/carts/:id", CartController.edit)
router.delete("/carts/:id", CartController.delete)

/* ============================= Wishlist ============================= */

router.get("/wishlists", wishlistController.getAll);
router.get("/wishlists/:id", wishlistController.getById);
router.post("/wishlists", wishlistController.create);
router.put("/wishlists/:id", wishlistController.update);
router.delete("/wishlists/:id", wishlistController.delete);


/* ============================= Order ============================= */

router.get("/orders", OrdersController.getAll);
router.get("/orders/:id", OrdersController.getById);
router.post("/orders", OrdersController.create);
router.put("/orders/:id", OrdersController.update);
router.delete("/orders/:id", OrdersController.delete);

/* ============================= Order Items ============================= */

router.get("/order-items", OrderItemsController.getAll);
router.get("/order-items/:id", OrderItemsController.getById);
router.post("/order-items", OrderItemsController.create);
router.put("/order-items/:id", OrderItemsController.update);
router.delete("/order-items/:id", OrderItemsController.delete);

/* ============================= Comments ============================= */

router.get("/comments", CommentsController.getAll);
router.get("/comments/:id", CommentsController.getById);
router.post("/comments", CommentsController.create);
router.put("/comments/:id", CommentsController.update);
router.delete("/comments/:id", CommentsController.delete);
module.exports = router;