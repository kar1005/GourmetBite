const Inventory = require('../models/inventory');

exports.getInventory = async (req,res)=>{
    try{
        const items = await Inventory.find();
        res.status(200).json(items);
    }catch{
        res.status(500).send({message: 'Error fetching items'});
    }
};

exports.getInventoryById = async (req,res)=>{
    try{
        const  item = Inventory.findById(req.params.id);
        if(!item){
            res.status(404).send({message:'Inventory not found'});
        }
    }catch{
        res.status(500).send({mesaage:'Error fetching Inventory'});
    }
}

exports.addInventory = async(req,res)=>{
    try{
        const item = new Inventory(req.body);
        await item.save();
        res.status(200).json({message:'Inventory added sucessfully'});
    }catch(error){
        res.status(400).json({mesaage:error.mesaage});
    }
}

exports.updateInventoryById = async(req,res)=>{
    try{
        const item = await Inventory.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
        });
        if(!item){
            return res.status(404).json({ message: 'Inventory not found' });
        }
    }catch(error){
        res.status(400).json({message:error.mesaage});
    }
}

exports.deleteInventoryById = async(req,res)=>{
    try{
        const item = await Inventory.findByIdAndDelete(req.params.id);
        if(!item){
            res.status(200).json({message:'Inventory not found'});
        }
    }catch(error){
        res.status(400).json({message:error.mesaage});
    }
}

exports.NotValidRoute = async(req,res) => {
    res.status(400).json({ message: "Enter Valid Route" });
}