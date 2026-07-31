const orderItemModel = require("../models/order_items");
/* إضافة عنصر */

exports.create = (req, res) => {

  const {
    order_id,
    product_id,
    quantity,
    price
  } = req.body;

  const subtotal = quantity * price;

  orderItemModel.create(
    [
      order_id,
      product_id,
      quantity,
      price,
      subtotal
    ],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Item Added"
      });

    }
  );
};


/* عرض منتجات طلب */

exports.getOne = (req, res) => {

  orderItemModel.getByOrderId(
    req.params.id,
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

};

/* حذف عنصر */

exports.delete = (req, res) => {

  orderItemModel.deleteItem(
    req.params.id,
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Deleted Successfully"
      });

    }
  );

};