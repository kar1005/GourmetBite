const mongoose  = require("mongoose");
const Schema  = mongoose.Schema;

const usageLog = new Schema({
        ingredient : {type:mongoose.Types.ObjectId , require:true, ref:'Inventory'},
        usageQuantity : {type:Number, required:true},
        date : {type:Date, required:true,default:Date.now},
    },
    // {
    //     timestamp:true,
    // }
);

module.exports = mongoose.model("InventoryUsageLog",usageLog);