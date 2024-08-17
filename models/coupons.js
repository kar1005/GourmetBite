const mongoose  = require("mongoose");
const Schema  = mongoose.Schema;

const couponSchema = new Schema({
    couponCode: {type:String , require:true},
    discountPercentage :{type:Number , require:true},
    validFrom : {type:Date , require:true},
    validTo : {type:Date , require:true},
    status : {type:String , require:true},
    validFor : [{type:mongoose.Types.ObjectId , require:true, ref:'Customer'} ],
});

module.exports = mongoose.model("Coupons",couponSchema);