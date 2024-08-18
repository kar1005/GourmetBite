const Order = require('../models/orders.js');

exports.addOrders = async(req,res)=>{
    try{
        const  order = new Order(req.body);
        await order.save();
        res.status(200).json({message:'Order added successfully',order:order});
    }catch{
        res.status(400).json({message:'Error adding order'});
    }
}