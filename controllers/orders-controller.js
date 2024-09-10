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

exports.getOrders = async (req,res)=>{
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    }catch{
        res.status(500).send({message: 'Error fetching orders'});
    }
};

exports.getOrderById = async (req,res)=>{
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

exports.getOrdersByCustomer = async (req,res)=> {
    try {
        const orders = await Order.find().where('customer').equals(req.params.id);
        if(!orders){
            res.status(200).send({message: 'No orders placed by this customer till date'});
        }
        res.status(200).json({orders,message: 'Orders of the given customer'});
    }catch{
        res.status(500).send({message: 'Error fetching orders for given customer'});
    }
}

exports.getPendingOrdersByTable = async(req,res)=>{
    try{
        const orders = await Order.find({
            tableNo : req.params.tableno,
            status : 'pending'
        });
        if(!orders){
            req.status(200).send({message: 'No Pending orders for given table number'});
        }
        res.status(200).send({orders,message:'Pending orders of the given table'});
    }catch{
        res.status(500).send({message: 'Error fetching orders for given table'});
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