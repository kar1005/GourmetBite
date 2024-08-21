const Order = require('../models/orders.js');

exports.addOrder = async(req,res)=>{
    try{
        const  order = new Order(req.body);
        await order.save();
        res.status(200).json({message:'Order added successfully',order:order});
    }catch{
        res.status(400).json({message:'Error adding order'});
    }
}

exports.getOrders = async (req,res)=>{
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    }catch{
        res.status(500).send({message: 'Error fetching orders'});
    }
};

exports.getOrderByID = async (req,res)=>{
    try{
        const  order = Order.findById(req.params.id);
        if(!order){
            res.status(404).send({message:'Order not found'});
        }
    }catch{
        res.status(500).send({mesaage:'Error fetching order'});
    }
}

exports.updateOrderById = async(req,res)=>{
    try{
        const order = await Order.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
        });
        if(!order){
            return res.status(404).json({ message: 'Order not found' });
        }
    }catch(error){
        res.status(400).json({message:error.mesaage});
    }
}

exports.deleteOrderById = async(req,res)=>{
    try{
        const order = await findByIdAndDelete(req.params.id);
        if(!order){
            res.status(200).json({message:'Order not found'});
        }
    }catch(error){
        res.status(400).json({message:error.mesaage});
    }
}

exports.getPendingOrders = async(req,res)=>{
    try{
        const orders = await Order.find().where('status').equals('pending');
        if(!orders){
            res.status(200).send({message: 'No pending orders'});
        }
        res.status(200).json({orders,message: 'Pending orders'});
    }catch{
        res.status(500).send({message: 'Error fetching orders'});
    }
}

// exports.getPendingOrdersByTable = async(req,res)=>{
//     try{
//         const orders = await Order.find().where('status').equals('pending');
//         if(!orders){
//             res.status(200).send({message: 'No pending orders'});
//         }
//         res.status(200).json({orders,message: 'Pending orders'});
//     }catch{
//         res.status(500).send({message: 'Error fetching orders'});
//     }
// }