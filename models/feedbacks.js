const mongoose  = require("mongoose");
const schema  = mongoose.Schema;

const feedbackSchema = new Schema({
    customer : {type:mongoose.Types.ObjectId , require:true, ref:'Customer'},
    menuItem : {type:mongoose.Types.ObjectId , require:true, ref:'Menu'},
    rating :{type:Number , require:true},
    comment : {type:String , require:true},
});

module.exports = mongoose.model("Feedback",feedbackSchema);