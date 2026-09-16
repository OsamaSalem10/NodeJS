const db = require("../config/db");


// =====================================================
// GET ALL STOCK
// =====================================================

exports.getAllStock = async () => {

    const [rows] = await db.query(`
        SELECT

            p.id,
            p.name,
            p.price,
            p.quantity,
            p.min_quantity,
            p.unit,
            p.category_id,

            c.name AS category_name

        FROM products p

        LEFT JOIN categories c
            ON c.id = p.category_id

        ORDER BY p.id DESC
    `);

    return rows;
};


// =====================================================
// GET PRODUCT STOCK
// =====================================================

exports.getProductStock = async (id) => {

    const [rows] = await db.query(`
        SELECT

            p.id,
            p.name,
            p.price,
            p.quantity,
            p.min_quantity,
            p.unit,
            p.category_id,

            c.name AS category_name

        FROM products p

        LEFT JOIN categories c
            ON c.id = p.category_id

        WHERE p.id = ?

        LIMIT 1
    `, [id]);

    return rows[0];
};


// =====================================================
// GET LOW STOCK
// =====================================================

exports.getLowStock = async () => {

    const [rows] = await db.query(`
        SELECT

            p.id,
            p.name,
            p.quantity,
            p.min_quantity,
            p.unit,

            c.name AS category_name

        FROM products p

        LEFT JOIN categories c
            ON c.id = p.category_id

        WHERE p.quantity <= p.min_quantity

        ORDER BY p.quantity ASC
    `);

    return rows;
};


// =====================================================
// GET ALL MOVEMENTS
// =====================================================

exports.getMovements = async () => {

    const [rows] = await db.query(`
        SELECT

            sm.id,
            sm.product_id,

            p.name AS product_name,

            sm.type,
            sm.quantity,

            p.unit,

            sm.note,
            sm.created_at

        FROM stock_movements sm

        INNER JOIN products p
            ON p.id = sm.product_id

        ORDER BY sm.id DESC
    `);

    return rows;
};


// =====================================================
// GET PRODUCT MOVEMENTS
// =====================================================

exports.getProductMovements = async (productId) => {

    const [rows] = await db.query(`
        SELECT

            sm.id,
            sm.product_id,

            p.name AS product_name,

            sm.type,
            sm.quantity,

            p.unit,

            sm.note,
            sm.created_at

        FROM stock_movements sm

        INNER JOIN products p
            ON p.id = sm.product_id

        WHERE sm.product_id = ?

        ORDER BY sm.id DESC
    `, [productId]);

    return rows;
};


// =====================================================
// STOCK IN
// =====================================================

exports.stockIn = async (
    productId,
    quantity,
    note
) => {

    const connection =
        await db.getConnection();

    try {

        await connection.beginTransaction();


        // Lock product

        const [products] =
            await connection.query(`
                SELECT quantity

                FROM products

                WHERE id = ?

                FOR UPDATE
            `, [productId]);


        if (products.length === 0) {

            throw new Error(
                "Product not found"
            );

        }


        // Update stock

        await connection.query(`
            UPDATE products

            SET quantity =
                quantity + ?

            WHERE id = ?
        `, [
            quantity,
            productId
        ]);


        // Movement

        await connection.query(`
            INSERT INTO stock_movements
            (
                product_id,
                type,
                quantity,
                note
            )

            VALUES
            (?, 'IN', ?, ?)
        `, [
            productId,
            quantity,
            note || null
        ]);


        await connection.commit();


    } catch (error) {

        await connection.rollback();

        throw error;


    } finally {

        connection.release();

    }
};


// =====================================================
// STOCK OUT
// =====================================================

exports.stockOut = async (
    productId,
    quantity,
    note
) => {

    const connection =
        await db.getConnection();

    try {

        await connection.beginTransaction();


        // Lock product

        const [products] =
            await connection.query(`
                SELECT quantity

                FROM products

                WHERE id = ?

                FOR UPDATE
            `, [productId]);


        if (products.length === 0) {

            throw new Error(
                "Product not found"
            );

        }


        const currentStock =
            Number(products[0].quantity);


        // Check stock

        if (
            currentStock <
            Number(quantity)
        ) {

            throw new Error(
                "Insufficient stock"
            );

        }


        // Update

        await connection.query(`
            UPDATE products

            SET quantity =
                quantity - ?

            WHERE id = ?
        `, [
            quantity,
            productId
        ]);


        // Movement

        await connection.query(`
            INSERT INTO stock_movements
            (
                product_id,
                type,
                quantity,
                note
            )

            VALUES
            (?, 'OUT', ?, ?)
        `, [
            productId,
            quantity,
            note || null
        ]);


        await connection.commit();


    } catch (error) {

        await connection.rollback();

        throw error;


    } finally {

        connection.release();

    }
};


// =====================================================
// ADJUSTMENT
// =====================================================

exports.adjustment = async (
    productId,
    quantity,
    note
) => {

    const connection =
        await db.getConnection();

    try {

        await connection.beginTransaction();


        const [products] =
            await connection.query(`
                SELECT quantity

                FROM products

                WHERE id = ?

                FOR UPDATE
            `, [productId]);


        if (products.length === 0) {

            throw new Error(
                "Product not found"
            );

        }


        // Set exact quantity

        await connection.query(`
            UPDATE products

            SET quantity = ?

            WHERE id = ?
        `, [
            quantity,
            productId
        ]);


        // Movement

        await connection.query(`
            INSERT INTO stock_movements
            (
                product_id,
                type,
                quantity,
                note
            )

            VALUES
            (?, 'ADJUSTMENT', ?, ?)
        `, [
            productId,
            quantity,
            note || null
        ]);


        await connection.commit();


    } catch (error) {

        await connection.rollback();

        throw error;


    } finally {

        connection.release();

    }
};