const stockModel =
    require("../models/stockModel");


// =====================================================
// GET STOCK
// =====================================================

exports.getStock = async (req, res) => {

    try {

        const data =
            await stockModel.getAllStock();

        res.json(data);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to get stock"
        });

    }
};


// =====================================================
// GET PRODUCT
// =====================================================

exports.getProductStock = async (
    req,
    res
) => {

    try {

        const { id } =
            req.params;


        const data =
            await stockModel
                .getProductStock(id);


        if (!data) {

            return res.status(404).json({
                message: "Product not found"
            });

        }


        res.json(data);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Failed to get product stock"
        });

    }
};


// =====================================================
// LOW STOCK
// =====================================================

exports.getLowStock = async (
    req,
    res
) => {

    try {

        const data =
            await stockModel.getLowStock();

        res.json(data);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Failed to get low stock"
        });

    }
};


// =====================================================
// MOVEMENTS
// =====================================================

exports.getMovements = async (
    req,
    res
) => {

    try {

        const data =
            await stockModel.getMovements();

        res.json(data);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                "Failed to get movements"
        });

    }
};


// =====================================================
// PRODUCT MOVEMENTS
// =====================================================

exports.getProductMovements =
    async (req, res) => {

        try {

            const { id } =
                req.params;


            const data =
                await stockModel
                    .getProductMovements(id);


            res.json(data);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                message:
                    "Failed to get product movements"
            });

        }
    };


// =====================================================
// STOCK IN
// =====================================================

exports.stockIn = async (
    req,
    res
) => {

    try {

        const {
            product_id,
            quantity,
            note
        } = req.body;


        if (
            !product_id ||
            quantity === undefined ||
            Number(quantity) <= 0
        ) {

            return res.status(400).json({
                message:
                    "Product and valid quantity are required"
            });

        }


        await stockModel.stockIn(
            product_id,
            Number(quantity),
            note
        );


        const product =
            await stockModel
                .getProductStock(
                    product_id
                );


        res.json({

            message:
                "Stock added successfully",

            data: product

        });

    } catch (error) {

        console.error(error);

        res.status(400).json({
            message: error.message
        });

    }
};


// =====================================================
// STOCK OUT
// =====================================================

exports.stockOut = async (
    req,
    res
) => {

    try {

        const {
            product_id,
            quantity,
            note
        } = req.body;


        if (
            !product_id ||
            quantity === undefined ||
            Number(quantity) <= 0
        ) {

            return res.status(400).json({
                message:
                    "Product and valid quantity are required"
            });

        }


        await stockModel.stockOut(
            product_id,
            Number(quantity),
            note
        );


        const product =
            await stockModel
                .getProductStock(
                    product_id
                );


        res.json({

            message:
                "Stock removed successfully",

            data: product

        });

    } catch (error) {

        console.error(error);

        res.status(400).json({
            message: error.message
        });

    }
};


// =====================================================
// ADJUSTMENT
// =====================================================

exports.adjustment = async (
    req,
    res
) => {

    try {

        const {
            product_id,
            quantity,
            note
        } = req.body;


        if (
            !product_id ||
            quantity === undefined ||
            Number(quantity) < 0
        ) {

            return res.status(400).json({
                message:
                    "Product and valid quantity are required"
            });

        }


        await stockModel.adjustment(
            product_id,
            Number(quantity),
            note
        );


        const product =
            await stockModel
                .getProductStock(
                    product_id
                );


        res.json({

            message:
                "Stock adjusted successfully",

            data: product

        });

    } catch (error) {

        console.error(error);

        res.status(400).json({
            message: error.message
        });

    }
};