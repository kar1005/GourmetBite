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
        const orders = await Order.find().populate('customer');
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

exports.deleteOrderById = async (req, res) => {
    try {
        console.log('Received ID:', req.params.id); // Log received ID for verification
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            console.log('Order not found');
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message }); // Fix typo from "mesaage" to "message"
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
        const rawOrders = await Order.find({
            customer: req.params.id,
            status: { $ne: 'Payment Pending' }
        })
        .sort({ time: -1 });
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
            time:rawOrders[i].time,
            amount:rawOrders[i].amount
        };
        orders.push(finalobject);
        intemsObjectArray=[];
        finalobject=[];
       }


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

exports.getOrderByDate = async (req, res) => {

    const { date } = req.params; // Get the date from route parameters
    console.log('Received date:', date); // Debug log

    if (!date) {
        return res.status(400).send({ message: 'Date is required' });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        return res.status(400).send({ message: 'Invalid date format' });
    }

    const startDate = new Date(parsedDate);
    const endDate = new Date(parsedDate);
    endDate.setDate(endDate.getDate() + 1); // Exclusive of the next day
    
    console.log('Searching for orders between:', startDate.toISOString(), 'and', endDate.toISOString());

    try {
        const rawOrders = await Order.find({
            time: {
                $gte: startDate,
                $lt: endDate,
            },
            paymentStatus: { $ne: 'Payment Pending' } 
        }).populate('customer');

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
            time:rawOrders[i].time,
            amount:rawOrders[i].amount
        };
        orders.push(finalobject);
        intemsObjectArray=[];
        finalobject=[];
       }

        if(!orders){
            res.status(200).send({message: 'No orders'});
        }

        console.log('Orders found:', orders); // Log found orders

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this date' });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error); // Log the error for debugging
        res.status(500).send({ message: 'Error fetching orders for the given date' });
    }
};


  

exports.NotValidRoute = async(req,res) => {
    res.status(400).json({ message: "Enter Valid Route" });
}
