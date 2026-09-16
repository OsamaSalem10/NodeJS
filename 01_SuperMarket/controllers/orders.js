const orderModel =
    require("../models/orders");


/* =========================================================
   CREATE ORDER / CHECKOUT
========================================================= */

const create = (
    req,
    res
) => {

    const {
        user_id,
        payment_method,
        shipping_address,
        notes
    } = req.body;


    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!user_id) {

        return res.status(400).json({
            message: "user_id is required"
        });
    }


    if (!payment_method) {

        return res.status(400).json({
            message:
                "payment_method is required"
        });
    }


    if (
        ![
            "Cash",
            "Visa",
            "MasterCard"
        ].includes(payment_method)
    ) {

        return res.status(400).json({
            message:
                "Invalid payment method"
        });
    }


    if (!shipping_address) {

        return res.status(400).json({
            message:
                "shipping_address is required"
        });
    }


    /* =====================================================
       CHECKOUT
    ===================================================== */

    orderModel.checkout(
        user_id,
        {
            payment_method,
            shipping_address,
            notes
        },
        (err, result) => {

            if (err) {

                console.error(
                    "CREATE ORDER ERROR:",
                    err
                );


                return res.status(400).json({
                    message:
                        err.message ||
                        "Failed to create order"
                });
            }


            return res.status(201).json({

                message:
                    "Order created successfully",

                order_id:
                    result.order_id,

                total:
                    result.total
            });
        }
    );
};


/* =========================================================
   GET ALL ORDERS
========================================================= */

const index = (
    req,
    res
) => {

    orderModel.getOrders(
        (err, result) => {

            if (err) {

                console.error(
                    "GET ORDERS ERROR:",
                    err
                );


                return res.status(500).json({
                    message:
                        "Failed to get orders"
                });
            }


            return res.status(200).json(
                result
            );
        }
    );
};


/* =========================================================
   GET USER ORDERS
========================================================= */

const userOrders = (
    req,
    res
) => {

    const userId =
        req.params.userId;


    if (!userId) {

        return res.status(400).json({
            message:
                "User ID is required"
        });
    }


    orderModel.getUserOrders(
        userId,
        (err, result) => {

            if (err) {

                console.error(
                    "GET USER ORDERS ERROR:",
                    err
                );


                return res.status(500).json({
                    message:
                        "Failed to get user orders"
                });
            }


            return res.status(200).json(
                result
            );
        }
    );
};


/* =========================================================
   GET ONE ORDER
========================================================= */

const findById = (
    req,
    res
) => {

    const id =
        req.params.id;


    orderModel.findById(
        id,
        (err, result) => {

            if (err) {

                return res.status(500).json({
                    message:
                        "Failed to get order"
                });
            }


            if (result.length === 0) {

                return res.status(404).json({
                    message:
                        "Order not found"
                });
            }


            return res.status(200).json(
                result[0]
            );
        }
    );
};


/* =========================================================
   UPDATE ORDER STATUS
========================================================= */

const updateStatus = (
    req,
    res
) => {

    const id =
        req.params.id;


    const {
        status
    } = req.body;


    const allowedStatuses = [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled"
    ];


    if (!allowedStatuses.includes(status)) {

        return res.status(400).json({
            message:
                "Invalid order status"
        });
    }


    orderModel.updateStatus(
        status,
        id,
        (err, result) => {

            if (err) {

                console.error(
                    "UPDATE STATUS ERROR:",
                    err
                );


                return res.status(500).json({
                    message:
                        "Failed to update order status"
                });
            }


            if (
                result.affectedRows === 0
            ) {

                return res.status(404).json({
                    message:
                        "Order not found"
                });
            }


            return res.status(200).json({

                message:
                    "Order status updated successfully"
            });
        }
    );
};


module.exports = {

    create,

    index,

    userOrders,

    findById,

    updateStatus

};