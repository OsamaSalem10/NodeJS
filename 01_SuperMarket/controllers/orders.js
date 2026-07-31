const orderModel = require("../models/orders");


/* إنشاء Order */
exports.create=(req,res)=>{

    const {

        user_id,
        total,
        payment_method,
        payment_status,
        order_status,
        shipping_address,
        notes

    }=req.body;

    const data=[

        user_id,
        total,
        payment_method,
        payment_status,
        order_status,
        shipping_address,
        notes

    ];

    orderModel.createOrder(data,(err,result)=>{

        if(err){

            return res.status(500).json(err);

        }

        res.status(201).json({

            message:"Order Created",
            orderId:result.insertId

        });

    });

};
/* جميع الطلبات */
exports.index=(req,res)=>{

    orderModel.getOrders((err,result)=>{

        if(err){

            return res.status(500).json(err);

        }

        res.json(result);

    });

};
/* طلبات مستخدم */
exports.userOrders=(req,res)=>{

    orderModel.getUserOrders(

        req.params.userId,

        (err,result)=>{

            if(err){

                return res.status(500).json(err);

            }

            res.json(result);

        }

    );

};
/* تغيير حالة الطلب */
exports.updateStatus=(req,res)=>{

    orderModel.updateStatus(

        req.body.order_status,

        req.params.id,

        (err)=>{

            if(err){

                return res.status(500).json(err);

            }

            res.json({

                message:"Status Updated"

            });

        }

    );

};