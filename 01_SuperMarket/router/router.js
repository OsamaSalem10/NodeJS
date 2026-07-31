const express = require("express");
const router = express.Router();
const {createUserValidation , createCategoryValidation , createProductValidation} = require("../middleware/validation");
const auth = require("../middleware/auth");
const { upload } = require("../middleware/upload");


/* Routes for users */
router.get("/users", require("../controllers/users").getAll);
router.get("/users/:id", require("../controllers/users").getOne);
router.post(
  "/users",
  upload.single("image"),
  createUserValidation,
  require("../controllers/users").create,
);
router.get("/users/:id", require("../controllers/users").getOne);
router.put(
  "/users/:id",
  upload.single("image"),
  createUserValidation,
  require("../controllers/users").update,
);

router.delete("/users/:id", require("../controllers/users").delete);
router.get("/search", require("../controllers/users").search);
router.post("/login", require("../controllers/users").login);

/* categories */
router.get("/categories", require("../controllers/categories").getAll);
router.get("/categories/:id", require("../controllers/categories").getOne);
router.post(
  "/categories",
  upload.single("image"),
  createCategoryValidation,
  require("../controllers/categories").create,
);
router.put(
  "/categories/:id",
  upload.single("image"),
   createUserValidation,
  require("../controllers/categories").update,
);
router.delete("/categories/:id", require("../controllers/categories").delete);

/* products  */
router.get("/products", require("../controllers/products").getAll);
router.get("/products/:id", require("../controllers/products").getOne);
router.post(
  "/products",
  upload.single("image"),
  createProductValidation,
  require("../controllers/products").create,
);
router.put(
  "/products/:id",
  upload.single("image"),
  require("../controllers/products").update,
);
router.delete("/products/:id", require("../controllers/products").delete);
router.get("/search-products", require("../controllers/products").search);
/* orders */
router.post("/orders",require("../controllers/orders").create);
router.get("/orders",require("../controllers/orders").index);
router.get("/orders/:userId",require("../controllers/orders").userOrders);
router.put("/orders/:id",require("../controllers/orders").updateStatus);

/* order items */
router.post("/order-items", require("../controllers/order_items").create);
router.get("/order-items/:id", require("../controllers/order_items").getOne);
router.delete("/order-items/:id", require("../controllers/order_items").delete);


/* reviews */
router.get("/reviews", require("../controllers/reviews").getAll);
router.get("/reviews/:id", require("../controllers/reviews").getOne);
router.post("/reviews", require("../controllers/reviews").create);
router.put("/reviews/:id", require("../controllers/reviews").update);
router.delete("/reviews/:id", require("../controllers/reviews").delete);




/* cart */


router.post("/cart",require("../controllers/cart").create);
router.get("/cart/:userId",require("../controllers/cart").index);
router.put("/cart/:id",require("../controllers/cart").update);
router.delete("/cart/:id",require("../controllers/cart.js").delete);


module.exports = router;
