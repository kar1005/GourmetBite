const TableBooking = require('../models/tableBooking');

exports.getTableBooking = async (req,res)=>{
    try{
        const booking = await TableBooking.find();
        res.status(200).json(booking);
    }catch{
        res.status(500).send({message: 'Error fetching TableBooking'});
    }
};

exports.getTableBookingByID = async (req,res)=>{
    try{
        const  booking = TableBooking.findById(req.params.id);
        if(!booking){
            res.status(404).send({message:'TableBooking not found'});
        }
    }catch{
        res.status(500).send({mesaage:'Error fetching TableBooking'});
    }
}

exports.addTableBooking = async(req,res)=>{
    try{
        const booking = new TableBooking(req.body);
        await booking.save();
        res.status(200).json({message:'TableBooking added sucessfully'});
    }catch(error){
        res.status(400).json({mesaage:error.mesaage});
    }
}

exports.updateTableBookingById = async(req,res)=>{
    try{
        const booking = await TableBooking.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
        });
        if(!booking){
            return res.status(404).json({ message: 'TableBooking not found' });
        }
    }catch(error){
        res.status(400).json({message:error.mesaage});
    }
}

exports.deleteTableBookingById = async(req,res)=>{
    try{
        const booking = await TableBooking.findByIdAndDelete(req.params.id);
        if(!booking){
            res.status(200).json({message:'TableBooking not found'});
        }
    }catch(error){
        res.status(400).json({message:error.mesaage});
    }
}