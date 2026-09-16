const db = require("../config/db");


/* =========================================================
   CREATE ORDER / CHECKOUT
========================================================= */

const checkout = (
    userId,
    {
        payment_method,
        shipping_address,
        notes
    },
    cb
) => {

    db.getConnection((err, connection) => {

        if (err) {
            return cb(err);
        }


        /* =====================================================
           BEGIN TRANSACTION
        ===================================================== */

        connection.beginTransaction((err) => {

            if (err) {
                connection.release();
                return cb(err);
            }


            /* =================================================
               1. GET CART
            ================================================= */

            const cartSql = `
                SELECT
                    carts.id AS cart_id,
                    carts.product_id,
                    carts.quantity,

                    products.name,
                    products.price,
                    products.discount,
                    products.quantity AS stock,
                    products.status

                FROM carts

                INNER JOIN products
                    ON products.id = carts.product_id

                WHERE carts.user_id = ?

                FOR UPDATE
            `;


            connection.query(
                cartSql,
                [userId],
                (err, cart) => {

                    if (err) {
                        return rollback(
                            connection,
                            cb,
                            err
                        );
                    }


                    /* =============================================
                       EMPTY CART
                    ============================================= */

                    if (cart.length === 0) {

                        return rollback(
                            connection,
                            cb,
                            new Error("Cart is empty")
                        );
                    }


                    /* =============================================
                       2. CHECK PRODUCTS + STOCK
                    ============================================= */

                    let total = 0;

                    const orderItems = [];


                    for (const item of cart) {

                        /* Product inactive */

                        if (item.status !== "Active") {

                            return rollback(
                                connection,
                                cb,
                                new Error(
                                    `Product "${item.name}" is not available`
                                )
                            );
                        }


                        /* Invalid quantity */

                        if (
                            !Number.isInteger(
                                item.quantity
                            ) ||
                            item.quantity <= 0
                        ) {

                            return rollback(
                                connection,
                                cb,
                                new Error(
                                    `Invalid quantity for "${item.name}"`
                                )
                            );
                        }


                        /* Stock */

                        if (
                            item.quantity >
                            item.stock
                        ) {

                            return rollback(
                                connection,
                                cb,
                                new Error(
                                    `Not enough stock for "${item.name}". Available: ${item.stock}`
                                )
                            );
                        }


                        /* =========================================
                           PRICE
                        ========================================= */

                        const price =
                            Number(item.price);

                        const discount =
                            Number(item.discount || 0);


                        const finalPrice =
                            price -
                            (
                                price *
                                discount /
                                100
                            );


                        const itemTotal =
                            finalPrice *
                            item.quantity;


                        total += itemTotal;


                        /* =========================================
                           SAVE ORDER ITEM
                        ========================================= */

                        orderItems.push({
                            product_id:
                                item.product_id,

                            quantity:
                                item.quantity,

                            price:
                                Number(
                                    finalPrice.toFixed(2)
                                )
                        });
                    }


                    total =
                        Number(
                            total.toFixed(2)
                        );


                    /* =============================================
                       3. CREATE ORDER
                    ============================================= */

                    const orderSql = `
                        INSERT INTO orders
                        (
                            user_id,
                            total,
                            payment_method,
                            payment_status,
                            order_status,
                            shipping_address,
                            notes
                        )
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                    `;


                    connection.query(
                        orderSql,
                        [
                            userId,
                            total,
                            payment_method,
                            "Pending",
                            "Pending",
                            shipping_address,
                            notes || null
                        ],
                        (err, orderResult) => {

                            if (err) {

                                return rollback(
                                    connection,
                                    cb,
                                    err
                                );
                            }


                            const orderId =
                                orderResult.insertId;


                            /* =====================================
                               4. CREATE ORDER ITEMS
                            ===================================== */

                            createOrderItems(
                                connection,
                                orderId,
                                orderItems,
                                (err) => {

                                    if (err) {

                                        return rollback(
                                            connection,
                                            cb,
                                            err
                                        );
                                    }


                                    /* =============================
                                       5. UPDATE STOCK
                                    ============================= */

                                    decreaseStock(
                                        connection,
                                        orderItems,
                                        (err) => {

                                            if (err) {

                                                return rollback(
                                                    connection,
                                                    cb,
                                                    err
                                                );
                                            }


                                            /* =========================
                                               6. CLEAR CART
                                            ========================= */

                                            const deleteCartSql = `
                                                DELETE FROM carts
                                                WHERE user_id = ?
                                            `;


                                            connection.query(
                                                deleteCartSql,
                                                [userId],
                                                (err) => {

                                                    if (err) {

                                                        return rollback(
                                                            connection,
                                                            cb,
                                                            err
                                                        );
                                                    }


                                                    /* =================
                                                       7. COMMIT
                                                    ================= */

                                                    connection.commit(
                                                        (err) => {

                                                            if (err) {

                                                                return rollback(
                                                                    connection,
                                                                    cb,
                                                                    err
                                                                );
                                                            }


                                                            connection.release();


                                                            /* ==============
                                                               SUCCESS
                                                            ============== */

                                                            cb(
                                                                null,
                                                                {
                                                                    order_id:
                                                                        orderId,

                                                                    total:
                                                                        total
                                                                }
                                                            );
                                                        }
                                                    );
                                                }
                                            );
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        });
    });
};


/* =========================================================
   CREATE ORDER ITEMS
========================================================= */

const createOrderItems = (
    connection,
    orderId,
    items,
    cb
) => {

    if (items.length === 0) {
        return cb(null);
    }


    let completed = 0;


    for (const item of items) {

        const sql = `
            INSERT INTO order_items
            (
                order_id,
                product_id,
                quantity,
                price
            )
            VALUES (?, ?, ?, ?)
        `;


        connection.query(
            sql,
            [
                orderId,
                item.product_id,
                item.quantity,
                item.price
            ],
            (err) => {

                if (err) {
                    return cb(err);
                }


                completed++;


                if (
                    completed ===
                    items.length
                ) {
                    cb(null);
                }
            }
        );
    }
};


/* =========================================================
   DECREASE STOCK
========================================================= */

const decreaseStock = (
    connection,
    items,
    cb
) => {

    let completed = 0;


    for (const item of items) {

        const sql = `
            UPDATE products
            SET quantity = quantity - ?
            WHERE id = ?
            AND quantity >= ?
        `;


        connection.query(
            sql,
            [
                item.quantity,
                item.product_id,
                item.quantity
            ],
            (err, result) => {

                if (err) {
                    return cb(err);
                }


                if (
                    result.affectedRows === 0
                ) {

                    return cb(
                        new Error(
                            "Stock changed. Please try again."
                        )
                    );
                }


                completed++;


                if (
                    completed ===
                    items.length
                ) {
                    cb(null);
                }
            }
        );
    }
};


/* =========================================================
   ROLLBACK
========================================================= */

const rollback = (
    connection,
    cb,
    error
) => {

    connection.rollback(() => {

        connection.release();

        cb(error);
    });
};


/* =========================================================
   GET ALL ORDERS
========================================================= */

const getOrders = (cb) => {

    const sql = `
        SELECT
            orders.*,
            users.name,
            users.email

        FROM orders

        INNER JOIN users
            ON users.id = orders.user_id

        ORDER BY orders.id DESC
    `;


    db.query(
        sql,
        cb
    );
};


/* =========================================================
   GET USER ORDERS
========================================================= */

const getUserOrders = (
    userId,
    cb
) => {

    const sql = `
        SELECT *
        FROM orders

        WHERE user_id = ?

        ORDER BY id DESC
    `;


    db.query(
        sql,
        [userId],
        cb
    );
};


/* =========================================================
   GET ORDER BY ID
========================================================= */

const findById = (
    id,
    cb
) => {

    const sql = `
        SELECT *
        FROM orders
        WHERE id = ?
    `;


    db.query(
        sql,
        [id],
        cb
    );
};


/* =========================================================
   UPDATE ORDER STATUS
========================================================= */

const updateStatus = (
    status,
    id,
    cb
) => {

    const sql = `
        UPDATE orders

        SET order_status = ?

        WHERE id = ?
    `;


    db.query(
        sql,
        [
            status,
            id
        ],
        cb
    );
};


module.exports = {

    checkout,

    getOrders,

    getUserOrders,

    findById,

    updateStatus

};