const express = require("express")
const cors = require('cors');
const mongoose = require("mongoose")

const app = express();

app.use(cors());
const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static('uploads'));

const PORT = 5000
const Database_url = 'mongodb+srv://gourmetdevelopers:itsATprojectkk@cluster0.ksb38.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const customerRoutes = require('./routes/customer-routes');
const menuRoutes = require('./routes/menu-routes');
const feedbackRoutes = require('./routes/feedback-routes');
const billRoutes = require('./routes/bill-routes');
const ordersRoutes = require('./routes/orders-routes');
const inventoryRoutes = require('./routes/inventory-routes');
const inventoryLogRoute = require('./routes/inventoryLog-routes');
const couponRoutes = require('./routes/coupon-routes');
const partyBookingRoutes = require('./routes/partyBooking-routes');
const tableBookingRoutes = require('./routes/tableBooking-routes');
const contactusRoutes = require('./routes/contactus-routes')
const paymentRoutes = require('./payment/payment-routes');


app.use("/customers", customerRoutes);
app.use("/menu",menuRoutes);
app.use("/feedback",feedbackRoutes);
app.use("/bill",billRoutes)
app.use("/orders",ordersRoutes);
app.use("/inventory",inventoryRoutes);
app.use("/inventoryLog",inventoryLogRoute);
app.use("/coupon",couponRoutes);
app.use("/partyBooking",partyBookingRoutes);
app.use("/tableBooking",tableBookingRoutes);
app.use("/contactus",contactusRoutes);
app.use("/paymentroutes",paymentRoutes);

app.get('/',(req,res) => {
    res.send("Hello")
})

mongoose.connect(Database_url)
.then(() => {
    app.listen(PORT,() => {
        console.log("Server Started at port: "+PORT);
    })
    console.log("Database Connected");
})
.catch(() => {
    console.log("Database Connection Failed");
})