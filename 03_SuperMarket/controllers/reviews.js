const reviewModel = require("../models/reviews");

exports.getAll = (req, res) => {
    reviewModel.getReviews((err, data) => {
        if (err) return res.json(err);
        res.json(data);
    });
};

exports.getOne = (req, res) => {
    const { id } = req.params;
    reviewModel.getReview(id, (err, data) => {
        if (err) return res.json(err);
        res.json(data);
    });
};

exports.create = (req, res) => {
    const { user_id, product_id, rating, comment } = req.body;
    const data = [user_id, product_id, rating, comment];
    reviewModel.createReview(data, (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { user_id, product_id, rating, comment } = req.body;
    const data = [user_id, product_id, rating, comment];
    reviewModel.updateReview(data, id, (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
};

exports.delete = (req, res) => {
    const { id } = req.params;
    reviewModel.deleteReview(id, (err, result) => {
        if (err) return res.json(err);
        res.json(result);
    });
};
