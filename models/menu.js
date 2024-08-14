const mongoose  = require("mongoose");
const schema  = mongoose.Schema;

const menuSchema = new Schema({
    category : {type:String, required:true},
    foodName : {type:String, required:true},
    image : {type:String, required:false},
    price : {type:Number, required:true},
    description: {type:String, required:true},
    rating : {type:Number, required:false},
    allergyIngredients :{type:String, required:false},
    availability : {type:Boolean, required:true},
});

module.exports = mongoose.model("Menu",menuSchema);
