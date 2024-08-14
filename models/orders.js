const mongoose  = require("mongoose");
const schema  = mongoose.Schema;

const orderSchema = new Schema({
        customer : {type:mongoose.Types.ObjectId , require:true, ref:'Customer'},
        items : {type:mongoose.Types.DocumentArray , require:true , ref:'FoodItems'},
        notes : {type:String , require:true},
        status : {type:String , require:true},
        time : {type:Date , require:true},
        completionTime : {type:Date , require:false},
        paymentMode :{type:String , require:true},
    },
    { 
        timestamp : true,
    }
);

module.exports = mongoose.model("Orders",orderSchema);