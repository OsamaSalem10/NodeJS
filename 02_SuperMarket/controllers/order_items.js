const orderItemModel = require("../models/order_items");

exports.getAll = (req, res) => {
    orderItemModel.getOrderItems((err, data) => {
        if (err) return res.json(err);
        res.json(data);
    });
};

exports.getOne = (req, res) => {
    orderItemModel.getOrderItem(req.params.id, (err, data) => {
        if (err) return res.json(err);
        res.json(data);
    });
};

exports.create = (req, res) => {
    const { order_id, product_id, quantity, price } = req.body;
    const data = [order_id, product_id, quantity, price];
    orderItemModel.createOrderItem(data, (err, result) => {
        if (err) return res.json(err);
        res.json({
            message: "Order item created successfully"
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const { order_id, product_id, quantity, price } = req.body;
    const data = [order_id, product_id, quantity, price];
    orderItemModel.updateOrderItem(data, id, (err, result) => {
        if (err) return res.json(err);
        res.json({
            message: "Order item updated successfully"
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    orderItemModel.deleteOrderItem(id, (err, result) => {
        if (err) return res.json(err);
        res.json({
            message: "Order item deleted successfully"
        });
    });
};