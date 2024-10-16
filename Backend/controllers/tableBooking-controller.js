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

exports.getTableBookingByCustomerID = async (req,res)=>{
    try{
        const  booking = TableBooking.find().where('customer').equals(req.params.id);
        if(!booking){
            res.status(404).send({message:'TableBooking not found'});
        }
    }catch{
        res.status(500).send({mesaage:'Error fetching TableBooking'});
    }
}

exports.addTableBooking = async (req, res) => {
    try {
        const { date, time, noOfPerson,customer_id } = req.body; // Extract date and number of people from request
        const numberOfGuests = parseInt(noOfPerson, 10);
        // console.log(date,time,noOfPerson);

        const existingBookings = await TableBooking.find({ date });
        const totalPersons = existingBookings.reduce((total, booking) => total + booking.numberOfGuests, 0);

        const maxCapacity = 50; 
        if (totalPersons + numberOfGuests > maxCapacity) {
            return res.status(400).json({ message: 'Cannot book. Max capacity exceeded for the given date.' });
        }

        // Step 4: Save the new booking
        const booking = new TableBooking(req.body);
        booking.customer=customer_id;
        booking.noOfPerson=numberOfGuests;
        booking.date=date;
        booking.time=time;        
        await booking.save();

        res.status(200).json({ message: 'TableBooking added successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


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

exports.NotValidRoute = async(req,res) => {
    res.status(400).json({ message: "Enter Valid Route" });
}