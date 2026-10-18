const OrderItems = require("../models/order_items");

class OrderItemsController {
    // ================= CREATE ================= //
    static async create(req, res) {
        try {
            const { order_id, product_id, quantity, price , subtotal } = req.body;
            const orderItem = new OrderItems(order_id, product_id, quantity, price , subtotal);
            const result = await orderItem.create();
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // ================= FIND ALL ================= //
    static async getAll(req, res) {
        try {
            const orderItems = await OrderItems.findAll();
            res.status(200).json(orderItems);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // ================= FIND BY ID ================= //
    static async getById(req, res) {
        try {
            const orderItem = await OrderItems.findById(req.params.id);
            res.status(200).json(orderItem);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // ================= UPDATE ================= //
    static async update(req, res) {
        try {
            const { order_id, product_id, quantity, price , subtotal } = req.body;
            const orderItem = new OrderItems(order_id, product_id, quantity, price , subtotal);
            const result = await orderItem.update(req.params.id, order_id, product_id, quantity, price , subtotal);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // ================= DELETE ================= //
    static async delete(req, res) {
        try {
            const result = await OrderItems.delete(req.params.id);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
  
module.exports = OrderItemsController;