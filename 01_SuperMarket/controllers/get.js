const cloudinary = require("../config/cloudinary");
const getModels = require("../models/get")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.getAllUsers = (req, res) => {
    getModels.getUsers((err, result) => {
        if (err) {
            res.json({ err: err, status: 500, error: "Internal Server Error" });
        } else if (result.length === 0) {
            res.json({ status: 201, massage: "No Users Found" });
        } else {
            res.json({ status: 200, massage: "Successfully", result: result });
        }
    })
}



exports.getAllProducts = (req, res) => {
    getModels.getProducts((err, result) => {
        if (err) {
            res.json({ err: err, status: 500, error: "Internal Server Error" });
        } else if (result.length === 0) {
            res.json({ status: 201, massage: "No Products Found" });
        } else {
            res.json({ status: 200, massage: "Successfully", result: result });
        }
    })
}
exports.getAllCategories = (req, res) => {
    getModels.getCategories((err, result) => {
        if (err) {
            res.json({ err: err, status: 500, error: "Internal Server Error" });
        } else if (result.length === 0) {
            res.json({ status: 201, massage: "No Categories Found" });
        } else {
            res.json({ status: 200, massage: "Successfully", result: result });
        }
    })
}
exports.getAllWishlist = (req, res) => {
    getModels.getWishlist((err, result) => {
        if (err) {
            res.json({ err: err, status: 500, error: "Internal Server Error" });
        } else if (result.length === 0) {
            res.json({ status: 201, massage: "No Wishlist Found" });
        } else {
            res.json({ status: 200, massage: "Successfully", result: result });
        }
    })
}
exports.getAllCarts = (req, res) => {
    getModels.getCarts((err, result) => {
        if (err) {
            res.json({ err: err, status: 500, error: "Internal Server Error" });
        } else if (result.length === 0) {
            res.json({ status: 201, massage: "No Carts Found" });
        } else {
            res.json({ status: 200, massage: "Successfully", result: result });
        }
    })
}
exports.getAllOrders = (req, res) => {
    getModels.getOrder((err, result) => {
        if (err) {
            res.json({ err: err, status: 500, error: "Internal Server Error" });
        } else if (result.length === 0) {
            res.json({ status: 201, massage: "No Orders Found" });
        } else {
            res.json({ status: 200, massage: "Successfully", result: result });
        }
    })
}
exports.getAllOrderItems = (req, res) => {
    getModels.getOrderItems((err, result) => {
        if (err) {
            res.json({ err: err, status: 500, error: "Internal Server Error" });
        } else if (result.length === 0) {
            res.json({ status: 201, massage: "No Order Items Found" });
        } else {
            res.json({ status: 200, massage: "Successfully", result: result });
        }
    })
}
exports.getAllComments = (req, res) => {
    getModels.getComments((err, result) => {
        if (err) {
            res.json({ err: err, status: 500, error: "Internal Server Error" });
        } else if (result.length === 0) {
            res.json({ status: 201, massage: "No Comments Found" });
        } else {
            res.json({ status: 200, massage: "Successfully", result: result });
        }
    })
}