const mongoose  = require("mongoose");
const schema  = mongoose.Schema;

const billSchema = new Schema({
    customer : {type:mongoose.Types.ObjectId , require:true, ref:'Customer'},
    order  : [{type:mongoose.Types.ObjectId, require:true, ref:'Orders'}],
    totalAmount : {type:Number, require:true},
});

module.exports = mongoose.model("Bill",billSchema);