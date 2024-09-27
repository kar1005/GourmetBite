const mongoose  = require("mongoose");
const Schema  = mongoose.Schema;

const orderSchema = new Schema({
        customer : {type:mongoose.Types.ObjectId , require:true, ref:'Customer'},
        items : [{type:String , require:true}],
        notes : {type:String , require:true},
        status : {type:String , require:true},
        time : {type:Date , require:true ,default: Date.now},
        completionTime : {type:Date , require:false},
        paymentMode :{type:String , require:false},
        tableNo  : {type:Number , require:true},

        amount: { type: Number, required: true },
        paymentId: { type: String },
        Paymentstatus: { type: String, required: true },
    },
);

module.exports = mongoose.model("Orders",orderSchema);