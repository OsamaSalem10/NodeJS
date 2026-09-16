const express = require("express");
const { createUserValidation ,updateUserValidation , createProductValidation ,createCategoryValidation} = require("../middleware/validation");

const { upload } = require("../middleware/upload");

const router = express.Router();

/* ============================= Get ============================= */

router.get(
  "/users",
  require("../controllers/get").getAllUsers
);

router.get(
  "/products",
  require("../controllers/get").getAllProducts
);

router.get(
  "/categories",
  require("../controllers/get").getAllCategories
);

router.get(
  "/carts",
  require("../controllers/get").getAllCarts
);

router.get(
  "/orders",
  require("../controllers/get").getAllOrders
);

router.get(
  "/order-items",
  require("../controllers/get").getAllOrderItems
);

router.get(
  "/comments",
  require("../controllers/get").getAllComments
);

router.get(
  "/wishlist",
  require("../controllers/get").getAllWishlist
);

/* ============================= Post ============================= */

router.post(
  "/users",
  upload.single("image"),
  createUserValidation,
  require("../controllers/post").addUser
);

router.post(
  "/products",
  upload.single("image"),
    createProductValidation,
  require("../controllers/post").addProduct
);
router.post(
  "/categories",
  upload.single("image"),
  createCategoryValidation,
  require("../controllers/post").addCategory
);

/* ============================= Update ============================= */

router.put(
  "/users/:id",
  upload.single("image"),
  updateUserValidation,
  require("../controllers/edit").updateUser
);

router.put(
  "/products/:id",
  upload.single("image"),
  require("../controllers/edit").updateProduct
);

router.put(
  "/categories/:id",
  upload.single("image"),
  require("../controllers/edit").updateCategory
);
/* ============================= Delete ============================= */

router.delete(
  "/users/:id",
  require("../controllers/delete").deleteUser
);

router.delete(
  "/products/:id",
  require("../controllers/delete").deleteProduct
);
router.delete(
  "/categories/:id",
  require("../controllers/delete").deleteCategory
);
module.exports = router;