const express = require("express");

const router = express.Router();

const stockController =
    require("../controllers/stockController");


// Current stock

router.get(
    "/stock",
    stockController.getStock
);


// Low stock

router.get(
    "/stock/low",
    stockController.getLowStock
);


// All movements

router.get(
    "/stock/movements",
    stockController.getMovements
);


// Product stock

router.get(
    "/stock/product/:id",
    stockController.getProductStock
);


// Product movements

router.get(
    "/stock/product/:id/movements",
    stockController.getProductMovements
);


// Stock IN

router.post(
    "/stock/in",
    stockController.stockIn
);


// Stock OUT

router.post(
    "/stock/out",
    stockController.stockOut
);


// Adjustment

router.post(
    "/stock/adjustment",
    stockController.adjustment
);


module.exports = router;