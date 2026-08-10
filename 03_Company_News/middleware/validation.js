const { body } = require("express-validator");

exports.createUserValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters"),

  body("phone")
    .notEmpty()
    .withMessage("Phone is required"),

  body("role")
    .notEmpty()
    .withMessage("role is required"),

  body("status")
    .notEmpty()
    .withMessage("status is required"),



    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required");
      }
      return true;
    }),
  ];

exports.createCategoryValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("description")
    .notEmpty()
    .withMessage("Description is required"),


    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required");
      }
      return true;
    }),
  ];
exports.createCompaniesValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("category_id")
    .notEmpty()
    .withMessage("Category is required"),
  body("description")
    .notEmpty()
    .withMessage("Description is required"),
body("website")
  .notEmpty()
  .withMessage("Website is required")
  .isURL()
  .withMessage("Invalid website URL"),
body("email")
  .notEmpty()
  .withMessage("Email is required")
  .isEmail()
  .withMessage("Invalid email"),
body("phone")
  .notEmpty()
  .withMessage("Phone is required")
  .isMobilePhone()
  .withMessage("Invalid phone number"),
body("address")
  .notEmpty()
  .withMessage("Address is required"),
body("city")
  .notEmpty()
  .withMessage("City is required"),
body("country")
  .notEmpty()
  .withMessage("Country is required"),




    body("logo").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Logo is required");
      }
      return true;
    }),
    body("cover").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Cover is required");
      }
      return true;
    }),
  ];


