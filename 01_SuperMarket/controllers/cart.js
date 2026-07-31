const cartModel = require("../models/cart");
/* إضافة منتج */
exports.create = (req, res) => {

    const { user_id, product_id, quantity } = req.body;

    cartModel.addToCart(
        [user_id, product_id, quantity],
        (err) => {

            if(err){
                return res.status(500).json(err);
            }

            res.status(201).json({
                message:"Added to cart"
            });

        }
    );

};

/* عرض السلة */

exports.index = (req,res)=>{

    cartModel.getCart(
        req.params.userId,
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

};

/* تعديل الكمية */
exports.update = (req,res)=>{

    const {quantity}=req.body;

    cartModel.updateQuantity(
        quantity,
        req.params.id,
        (err)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message:"Quantity Updated"
            });

        }
    );

};

/* حذف منتج */

exports.delete = (req,res)=>{

    cartModel.deleteItem(
        req.params.id,
        (err)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                message:"Deleted Successfully"
            });

        }
    );

};