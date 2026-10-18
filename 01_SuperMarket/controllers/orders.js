const Orders = require("../models/orders");

class OrdersController {
    // ================= CREATE ================= //
    static async create(req, res) {
        try {
            const { user_id, total, payment_method, payment_status, order_status, shipping_address } = req.body;
       
            const order = new Orders(user_id, total, payment_method, payment_status, order_status, shipping_address);
            
            const result = await order.create();
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // ================= FIND ALL ================= //
    static async getAll(req, res) {
        try {
            const orders = await Orders.findAll();
           return res.status(200).json({
                status: 200,
                result: orders
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // ================= FIND BY ID ================= //
    static async getById(req, res) {
        try {
            const order = await Orders.findById(req.params.id);
            res.status(200).json(order);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // ================= UPDATE ================= //
    static async update(req, res) {
        try {
            const { user_id, total, payment_method, payment_status, order_status, shipping_address } = req.body;
            const order = new Orders(user_id, total, payment_method, payment_status, order_status, shipping_address);
            const result = await order.update(req.params.id, user_id, total, payment_method, payment_status, order_status, shipping_address);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // ================= DELETE ================= //
    static async delete(req, res) {
        try {
            const result = await Orders.delete(req.params.id);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
module.exports = OrdersController;