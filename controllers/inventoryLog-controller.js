const InventoryLog = require('../models/InventoryUsageLog');

exports.getInventoryLog = async (req,res)=>{
    try{
        const ilog = await InventoryLog.find();
        res.status(200).json(ilog);
    }catch{
        res.status(500).send({message: 'Error fetching InventoryLog'});
    }
};

exports.getInventoryLogByID = async (req,res)=>{
    try{
        const  ilog = InventoryLog.findById(req.params.id);
        if(!ilog){
            res.status(404).send({message:'InventoryLog not found'});
        }
    }catch{
        res.status(500).send({mesaage:'Error fetching InventoryLog'});
    }
}

exports.addInventoryLog = async(req,res)=>{
    try{
        const ilog = new InventoryLog(req.body);
        await ilog.save();
        res.status(200).json({message:'InventoryLog added sucessfully'});
    }catch(error){
        res.status(400).json({mesaage:error.mesaage});
    }
}

exports.updateInventoryLogById = async(req,res)=>{
    try{
        const ilog = await InventoryLog.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
        });
        if(!ilog){
            return res.status(404).json({ message: 'InventoryLog not found' });
        }
    }catch(error){
        res.status(400).json({message:error.mesaage});
    }
}

exports.deleteInventoryLogById = async(req,res)=>{
    try{
        const ilog = await InventoryLog.findByIdAndDelete(req.params.id);
        if(!ilog){
            res.status(200).json({message:'InventoryLog not found'});
        }
    }catch(error){
        res.status(400).json({message:error.mesaage});
    }
}