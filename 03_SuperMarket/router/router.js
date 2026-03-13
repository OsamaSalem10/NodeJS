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
module.exports = router;