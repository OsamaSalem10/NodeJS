const orderModel = require("../models/orders");
exports.getAll = (req, res) => {
    orderModel.getOrders((err, data) => {
        if (err) return res.json(err);
        res.json(data);
    });
};

exports.getOne = (req, res) => {
    orderModel.getOrder(req.params.id, (err, data) => {
        if (err) return res.json(err);
        res.json(data);
    });
};

exports.create = (req, res) => {
    const { user_id, product_id, status, total } = req.body;
    const data = [user_id, product_id, status, total];
    orderModel.createOrder(data, (err, result) => {
        if (err) return res.json(err);
        res.json({
            message: "Order created successfully"
        });
    });
}
;

exports.update = (req, res) => {
    const id = req.params.id;
    const { user_id, product_id, status, total } = req.body;
    const data = [user_id, product_id, status, total];  
    orderModel.updateOrder(data, id, (err, result) => {
        if (err) return res.json(err);
        res.json({
            message: "Order updated successfully"
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    orderModel.deleteOrder(id, (err, result) => {
        if (err) return res.json(err);
        res.json({
            message: "Order deleted successfully"
        });
    });
};