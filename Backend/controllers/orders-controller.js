const Order = require('../models/orders.js');
const Menu = require('./menu-contorller.js');

exports.addOrders = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(200).json({ message: 'Order added successfully', order: order });
    } catch (error) {
        console.error('Error adding order:', error);
        res.status(400).json({ message: 'Error adding order', error: error.message });
    }
};

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
        res.status(200).json(order);

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
        res.status(200).json(order);
    }catch(error){
        res.status(400).json({message:error.mesaage});
    }
}

exports.deleteOrderById = async(req,res)=>{
    try{
        const order = await findByIdAndDelete(req.params.id);
        if(!order){
            res.status(404).json({message:'Order not found'});
        }
    }catch(error){
        res.status(400).json({message:error.mesaage});
    }
}

exports.getreceivedOrders = async (req,res)=>{
    try{
        const rawOrders = await Order.find().where('status').equals('Order Received');        
        let intemsObjectArray=[];
        let orders=[];
        let temp;

       for (let i = 0; i < rawOrders.length ; i++) {
           console.log(rawOrders);            
        for (let j = 0; j < rawOrders[i].items.length ; j++)
        {
            id = rawOrders[i].items[j].itemId;
            const item = await Menu.getFoodByIdOrders(id);
            temp = {
                itemName:item.foodName,
                quantity:rawOrders[i].items[j].qty
            }
            intemsObjectArray.push(temp);
        } 
        let finalobject = {
            id: rawOrders[i]._id,
            status:rawOrders[i].status,
            tableNo :rawOrders[i].tableNo,
            items : intemsObjectArray,
            notes:rawOrders[i].notes,
            time:rawOrders[i].time
        };
        orders.push(finalobject);
        intemsObjectArray=[];
        finalobject=[];
       }

        if(!orders){
            res.status(200).send({message: 'No pending orders'});
        }
        res.status(200).json(orders);
    }catch{
        res.status(500).send({message: 'Error fetching orders'});
    }
}

exports.getacceptedOrders = async (req,res)=>{
    try{
        const rawOrders = await Order.find().where('status').equals('Order Accepted');        
        let intemsObjectArray=[];
        let orders=[];
        let temp;

       for (let i = 0; i < rawOrders.length ; i++) {
           console.log(rawOrders);            
        for (let j = 0; j < rawOrders[i].items.length ; j++)
        {
            id = rawOrders[i].items[j].itemId;
            const item = await Menu.getFoodByIdOrders(id);
            temp = {
                itemName:item.foodName,
                quantity:rawOrders[i].items[j].qty
            }
            intemsObjectArray.push(temp);
        } 
        let finalobject = {
            id: rawOrders[i]._id,
            status:rawOrders[i].status,
            tableNo :rawOrders[i].tableNo,
            items : intemsObjectArray,
            notes:rawOrders[i].notes,
            time:rawOrders[i].time
        };
        orders.push(finalobject);
        intemsObjectArray=[];
        finalobject=[];
       }      
        if(!orders){
            res.status(200).send({message: 'No Accepted orders'});
        }
        res.status(200).json(orders);
    }catch{
        res.status(500).send({message: 'Error fetching orders'});
    }
}

exports.updateOrderFromkitchen = async (req,res)=> {
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
            status : 'Order Received'
        });
        if(!orders){
            req.status(200).send({message: 'No Pending orders for given table number'});
        }
        res.status(200).send({orders,message:'Pending orders of the given table'});
    }catch{
        res.status(500).send({message: 'Error fetching orders for given table'});
    }
}

exports.NotValidRoute = async(req,res) => {
    res.status(400).json({ message: "Enter Valid Route" });
}
