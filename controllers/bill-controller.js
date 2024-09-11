const Bill = require('../models/bill');
const { findByIdAndDelete } = require('../models/orders');

exports.getBills = async (req,res)=>{
    try{
        const bills = await Bill.find();
        res.status(200).json(bills);
    }catch{
        res.status(500).send({message: 'Error fetching bills'});
    }
};

exports.getBillByID = async (req,res)=>{
    try{
        const  bill = Bill.findById(req.params.id);
        if(!bill){
            res.status(404).send({message:'Bill not found'});
        }
    }catch{
        res.status(500).send({mesaage:'Error fetching bill'});
    }
}

exports.addBill = async(req,res)=>{
    try{
        const bill = new Bill(req.body);
        await bill.save();
        res.status(200).json({message:'Bill added sucessfully'});
    }catch(error){
        res.status(400).json({mesaage:error.mesaage});
    }
}

exports.updateBillById = async(req,res)=>{
    try{
        const bill = await Bill.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
        });
        if(!bill){
            return res.status(404).json({ message: 'Bill not found' });
        }
    }catch(error){
        res.status(400).json({message:error.mesaage});
    }
}

exports.deleteBillById = async(req,res)=>{
    try{
        const bill = await Bill.findByIdAndDelete(req.params.id);
        if(!bill){
            res.status(200).json({message:'Bill not found'});
        }
    }catch(error){
        res.status(400).json({message:error.mesaage});
    }
}

exports.getBillByCustomer = async(req,res)=> {
    try{
        const bill = Bill.find().where('customer').equals(req.params.id);
        if(!bill){
            res.status(400).json({message:'No bills for given customer'});
        }
    }catch(error){
        res.status(400).json({message:error.mesaage});
    }
}

exports.NotValidRoute = async(req,res) => {
    res.status(400).json({ message: "Enter Valid Route" });
}