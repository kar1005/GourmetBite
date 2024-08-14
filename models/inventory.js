const mongoose  = require("mongoose");
const schema  = mongoose.Schema;

const inventorySchema = new Schema({
    ingredient : {type:String, require:true},
    quantityInStock : {type:Number, require:true},
    reorderLevel :{type:String, require:true},
    lastOrderDate :{type:Date, require:true},
});

module.exports = mongoose.model("Inventory",inventorySchema);