const mongoose  = require("mongoose");
const schema  = mongoose.Schema;

const hallBookSchema = new Schema({
    customer : {type:mongoose.Types.ObjectId , require:true, ref:'Customer'},
   
});

module.exports = mongoose.model("HallBooking", hallBookSchema);