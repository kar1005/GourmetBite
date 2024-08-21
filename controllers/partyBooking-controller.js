const PartyBooking = require('../models/partyBooking');

exports.getPartyBooking = async (req,res)=>{
    try{
        const booking = await PartyBooking.find();
        res.status(200).json(booking);
    }catch{
        res.status(500).send({message: 'Error fetching PartyBooking'});
    }
};

exports.getPartyBookingByID = async (req,res)=>{
    try{
        const  booking = PartyBooking.findById(req.params.id);
        if(!booking){
            res.status(404).send({message:'PartyBooking not found'});
        }
    }catch{
        res.status(500).send({mesaage:'Error fetching PartyBooking'});
    }
}

exports.addPartyBooking = async(req,res)=>{
    try{
        const booking = new PartyBooking(req.body);
        await booking.save();
        res.status(200).json({message:'PartyBooking added sucessfully'});
    }catch(error){
        res.status(400).json({mesaage:error.mesaage});
    }
}

exports.updatePartyBookingById = async(req,res)=>{
    try{
        const booking = await PartyBooking.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
        });
        if(!booking){
            return res.status(404).json({ message: 'PartyBooking not found' });
        }
    }catch(error){
        res.status(400).json({message:error.mesaage});
    }
}

exports.deletePartyBookingById = async(req,res)=>{
    try{
        const booking = await PartyBooking.findByIdAndDelete(req.params.id);
        if(!booking){
            res.status(200).json({message:'PartyBooking not found'});
        }
    }catch(error){
        res.status(400).json({message:error.mesaage});
    }
}