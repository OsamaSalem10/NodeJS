const express = require("express");
const { upload } = require("../middleware/upload");
const { createUserValidation  ,createCategoryValidation , createCompaniesValidation} = require("../middleware/validation")
const router = express.Router();
/* users */
router.get("/users", require("../controllers/users").getAllUsers)
router.get("/users/:id", require("../controllers/users").getOne)
router.post(
  "/users",
  upload.single("image"),
  createUserValidation,
  require("../controllers/users").create
);
router.put("/users/:id",  upload.single("image"), require("../controllers/users").update)
router.delete("/users/:id",  require("../controllers/users").delete);
router.post("/login",  require("../controllers/users").login);




/* categories */
router.get("/categories",createCategoryValidation,require("../controllers/categories").getAllCategories);
router.get("/categories/:id", createCategoryValidation, require("../controllers/categories").getCategory);
router.post("/categories", upload.single("image"), createCategoryValidation, require("../controllers/categories").createCategory);
router.put("/categories/:id", upload.single("image"), require("../controllers/categories").updateCategory);
router.delete("/categories/:id", createCategoryValidation, require("../controllers/categories").deleteCategory);



/* companies */
router.get("/companies", require("../controllers/companies").getAllCompanies);
router.post(
  "/companies",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  createCompaniesValidation,
  require("../controllers/companies").create
);

router.put(
  "/companies/:id",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  require("../controllers/companies").update
);

module.exports = router;