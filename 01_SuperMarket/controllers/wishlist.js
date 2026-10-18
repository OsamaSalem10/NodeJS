const Wishlist = require("../models/wishlist");

class WishlistController {
  // ================= CREATE WISHLIST ================= //
  static async create(req, res) {
    try {
      const { user_id, product_id } = req.body;
      const wishlist = new Wishlist(user_id, product_id);
      const result = await wishlist.create();
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // ================= GET ALL WISHLISTS ================= //
  static async getAll(req, res) {
    try {
      const wishlists = await Wishlist.findAll();
 res.status(200).json({
        status: 200,
        result: wishlists
      });
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
  // ================= GET WISHLIST BY ID ================= //
  static async getById(req, res) {
    try {
        const wishlist = await Wishlist.findById(req.params.id);
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }
    // ================= UPDATE WISHLIST ================= //
    static async update(req, res) {
        try {
            const { user_id, product_id } = req.body;
            const wishlist = new Wishlist(user_id, product_id);
            const result = await wishlist.update(req.params.id, user_id, product_id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // ================= DELETE WISHLIST ================= //
    static async delete(req, res) {
        try {
            const result = await Wishlist.delete(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = WishlistController;