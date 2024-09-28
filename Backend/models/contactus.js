const mongoose  = require("mongoose");
const Schema  = mongoose.Schema;

const contactusSchema = new Schema({
    name: {type:String , require:true},
    email: {type:String , require:true},
    message: {type:String , require:true},
});

module.exports = mongoose.model("ContactUs",contactusSchema);