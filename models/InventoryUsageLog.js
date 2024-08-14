const mongoose  = require("mongoose");
const schema  = mongoose.Schema;

const usageLog = new Schema({
        ingredient : {type:mongoose.Types.ObjectId , require:true, ref:'Inventory'},
        usageQuantity : {type:Number, required:true},
        date : {type:Date, required:true},
    },
    {
        timestamp:true,
    }
);

module.exports = mongoose.model("InventoryUsageLog",usageLog);