const mongoose  = require("mongoose");
const schema  = mongoose.Schema;
import {hash} from 'bcrypt';

const customerSchema = new Schema({
    name: { type:String, requirred:true },
    phone_no :{type:Number, required:true, unique: true},
    password: {type:String, required:true},
    dob : { type:Date , required:false},
    gender:{ type:String, required:true},
    profile_pic : {type:String, required:false},
});

customerSchema.path('phone_no'),validate(function validatePhone(){
    return (this.phone_no >999999999);
});

customerSchema.pre('save',async function(next){
    const hashPass  = await hash(this.password,10);
    this.password = hashPass;
    next();
});

module.exports = mongoose.model("Customer", customerSchema);