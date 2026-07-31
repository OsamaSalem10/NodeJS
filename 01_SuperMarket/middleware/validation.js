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

  body("location")
    .notEmpty()
    .withMessage("Location is required"),

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

exports.createCategoryValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("status")
    .notEmpty()
    .withMessage("Status is required"),


    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required");
      }
      return true;
    }),
  ];
exports.createProductValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("category_id")
    .notEmpty()
    .withMessage("Category is required"),
  body("description")
    .notEmpty()
    .withMessage("Description is required"),
body("price")
  .notEmpty()
  .withMessage("Price is required")
  .isFloat({ min: 0 })
  .withMessage("Price must be a valid positive number"),

body("discount")
  .optional({ values: "falsy" }) 
  .isFloat({ min: 0, max: 100 })
  .withMessage("Discount must be between 0 and 100"),
  body("status")
    .notEmpty()
    .withMessage("Status is required"),


    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required");
      }
      return true;
    }),
  ];


