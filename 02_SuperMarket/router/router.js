const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const { upload } = require("../middleware/upload");

router.get("/users", require("../controllers/users").getAll);
router.get("/users/:id", require("../controllers/users").getOne);
router.post("/users",upload.single("image"),  require("../controllers/users").create);
router.get("/users/:id",  require("../controllers/users").getOne);
router.put("/users/:id",upload.single("image"),  require("../controllers/users").update);
router.delete("/users/:id",  require("../controllers/users").delete);
router.get("/search",  require("../controllers/users").search);
router.post("/login",  require("../controllers/users").login);

/* categories */
router.get("/categories", require("../controllers/categories").getAll);
router.get("/categories/:id", require("../controllers/categories").getOne);
router.post("/categories", upload.single("image"), require("../controllers/categories").create);
router.put("/categories/:id", upload.single("image"), require("../controllers/categories").update);
router.delete("/categories/:id", require("../controllers/categories").delete);

/* products  */
router.get("/products", require("../controllers/products").getAll);
router.get("/products/:id", require("../controllers/products").getOne);
router.post("/products", upload.single("image"), require("../controllers/products").create);
router.put("/products/:id", upload.single("image"), require("../controllers/products").update);
router.delete("/products/:id", require("../controllers/products").delete);

/* orders */
router.get("/orders", require("../controllers/orders").getAll);
router.get("/orders/:id", require("../controllers/orders").getOne);
router.post("/orders", require("../controllers/orders").create);
router.put("/orders/:id", require("../controllers/orders").update);
router.delete("/orders/:id", require("../controllers/orders").delete);

/* order items */
router.get("/order-items", require("../controllers/order_items").getAll);
router.get("/order-items/:id", require("../controllers/order_items").getOne);
router.post("/order-items", require("../controllers/order_items").create);
router.put("/order-items/:id", require("../controllers/order_items").update);
router.delete("/order-items/:id", require("../controllers/order_items").delete);

/* reviews */
router.get("/reviews", require("../controllers/reviews").getAll);
router.get("/reviews/:id", require("../controllers/reviews").getOne);
router.post("/reviews", require("../controllers/reviews").create);
router.put("/reviews/:id", require("../controllers/reviews").update);
router.delete("/reviews/:id", require("../controllers/reviews").delete);
module.exports = router;