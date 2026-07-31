const express = require("express");
const { upload } = require("../middleware/upload");
const { createUserValidation } = require("../middleware/validation")
const router = express.Router();
/* users */
router.get("/users", require("../controllers/users").getAllUsers)
router.get("/users/:id", require("../controllers/users").getOne)
router.post("/users", createUserValidation, upload.single("image"), require("../controllers/users").create)
router.put("/users/:id",  upload.single("image"), require("../controllers/users").update)
router.delete("/users/:id",  require("../controllers/users").delete);
router.post("/login",  require("../controllers/users").login);
module.exports = router;