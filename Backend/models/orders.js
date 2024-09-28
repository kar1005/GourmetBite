const mongoose  = require("mongoose");
const Schema  = mongoose.Schema;


const orderSchema = new Schema({
    customer: { type: mongoose.Types.ObjectId, required: true, ref: 'Customer' },
    items: [{
        itemId: { type: mongoose.Types.ObjectId, required: true, ref: 'MenuItem' },
        qty: { type: Number, required: true }
    }],
    notes: { type: String, required: false },
    status: { type: String, required: true },
    tableNo: { type: Number, required: true }, // Changed to String to match your input
    amount: { type: Number, required: true },
    
    paymentMode: { type: String, required: false },
    paymentId: { type: String, required: false },
    // Paymentstatus: { type: String, required: false },
    
    completionTime: { type: Date, required: false },
    time: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model("Orders",orderSchema);