const Coupon = require('../models/coupons');
const { findByIdAndDelete } = require('../models/orders');

exports.getCoupons = async (req,res)=>{
    try{
        const coupons = await Coupon.find();
        res.status(200).json(coupons);
    }catch{
        res.status(500).send({message: 'Error fetching coupons'});
    }
};

exports.getCouponByID = async (req,res)=>{
    try{
        const  coupon = Coupon.findById(req.params.id);
        if(!coupon){
            res.status(404).send({message:'Coupon not found'});
        }
    }catch{
        res.status(500).send({mesaage:'Error fetching coupon'});
    }
}

exports.addCoupon = async(req,res)=>{
    try{
        const coupon = new Coupon(req.body);
        await coupon.save();
        res.status(200).json({message:'Coupon added sucessfully'});
    }catch(error){
        res.status(400).json({mesaage:error.mesaage});
    }
}

exports.updateCoupon = async(req,res)=>{
    try{
        const coupon = await Coupon.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
        });
        if(!coupon){
            return res.status(404).json({ message: 'Coupon not found' });
        }
    }catch(error){
        res.status(400).json({message:error.mesaage});
    }
}

exports.deleteById = async(req,res)=>{
    try{
        const coupon = await Coupon.findByIdAndDelete(req.params.id);
        if(!coupon){
            res.status(200).json({message:'Coupon not found'});
        }
    }catch(error){
        res.status(400).json({message:error.mesaage});
    }
}

exports.getCouponsByCustomer = async(req,res)=>{
    try{
        const  coupon = Coupon.find().where('validFor').equals(req.params.id);
        if(!coupon){
            res.status(404).send({message:'Coupon not found for particular customer'});
        }
    }catch{
        res.status(500).send({mesaage:'Error fetching coupon'});
    }
}

exports.NotValidRoute = async(req,res) => {
    res.status(400).json({ message: "Enter Valid Route" });
}