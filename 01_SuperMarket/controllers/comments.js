const Comments = require("../models/comments");

class CommentsController {
    // ================= CREATE COMMENT ================= //
    static async create(req, res) {
        try {
            const { user_id, product_id, comment } = req.body;
            const newComment = new Comments(user_id, product_id, comment);
            const result = await newComment.create();
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // ================= GET ALL COMMENTS ================= //
    static async getAll(req, res) {
        try {
            const comments = await Comments.findAll();
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // ================= GET COMMENT BY ID ================= //
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const comment = await Comments.findById(id);
            res.status(200).json(comment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // ================= UPDATE COMMENT ================= //
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { user_id, product_id, comment } = req.body;
            const updatedComment = new Comments(user_id, product_id, comment);
            const result = await updatedComment.update(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // ================= DELETE COMMENT ================= //
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await Comments.delete(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CommentsController;