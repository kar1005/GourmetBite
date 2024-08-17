const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partyBookingSchema = new Schema({
    customer : {type:mongoose.Types.ObjectId , require:true, ref:'Customer'},
    noOfPerson: { type:Number, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true},
    demands: { type: String, required: true}

});

module.exports = mongoose.model('PartyBooking', partyBookingSchema);