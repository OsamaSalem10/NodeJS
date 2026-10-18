const Cart = require("../models/cart");

class CartController {

    // ================= GET ALL ================= //
    static async getAll(req, res) {
        try {

            const carts = await Cart.findAll();

            return res.status(200).json({
                status: 200,
                result: carts
            });

        } catch (error) {

            console.error("Get All Carts Error:", error);

            return res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }


    // ================= GET BY ID ================= //
    static async getById(req, res) {
        try {

            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    status: 400,
                    message: "Invalid cart id"
                });
            }

            const cart = await Cart.findById(id);

            if (!cart) {
                return res.status(404).json({
                    status: 404,
                    message: "Cart not found"
                });
            }

            return res.status(200).json({
                status: 200,
                result: cart
            });

        } catch (error) {

            console.error("Get Cart Error:", error);

            return res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }


    // ================= CREATE ================= //
    static async create(req, res) {
        try {

            const {
                user_id,
                product_id,
                quantity
            } = req.body;


            // Validation
            if (!user_id || !product_id || quantity == null) {
                return res.status(400).json({
                    status: 400,
                    message: "user_id, product_id and quantity are required"
                });
            }


            if (Number(quantity) <= 0) {
                return res.status(400).json({
                    status: 400,
                    message: "Quantity must be greater than 0"
                });
            }


            const cart = new Cart(
                user_id,
                product_id,
                quantity
            );


            const result = await cart.create();


            return res.status(201).json({
                status: 201,
                message: "Cart created successfully",
                result: {
                    id: result.insertId,
                    user_id,
                    product_id,
                    quantity
                }
            });

        } catch (error) {

            console.error("Create Cart Error:", error);

            return res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }


    // ================= UPDATE ================= //
    static async edit(req, res) {
        try {

            const { id } = req.params;

            const {
                user_id,
                product_id,
                quantity
            } = req.body;


            // Validate ID
            if (!id || isNaN(id)) {
                return res.status(400).json({
                    status: 400,
                    message: "Invalid cart id"
                });
            }


            // Validate body
            if (!user_id || !product_id || quantity == null) {
                return res.status(400).json({
                    status: 400,
                    message: "user_id, product_id and quantity are required"
                });
            }


            if (Number(quantity) <= 0) {
                return res.status(400).json({
                    status: 400,
                    message: "Quantity must be greater than 0"
                });
            }


            const cart = new Cart(
                user_id,
                product_id,
                quantity
            );


            const result = await cart.update(id);


            if (result.affectedRows === 0) {
                return res.status(404).json({
                    status: 404,
                    message: "Cart not found"
                });
            }


            return res.status(200).json({
                status: 200,
                message: "Cart updated successfully",
                result: {
                    id: Number(id),
                    user_id,
                    product_id,
                    quantity
                }
            });

        } catch (error) {

            console.error("Update Cart Error:", error);

            return res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }
    // ================= DELETE ================= //

static async delete(req, res) {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid cart id"
      });
    }

    // We only need the id for deleting
    const result = await Cart.delete(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 404,
        message: "Cart not found"
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Cart deleted successfully"
    });

  } catch (error) {
    console.error("Delete Cart Error:", error);

    return res.status(500).json({
      status: 500,
      message: error.message
    });
  }
}
}

module.exports = CartController;