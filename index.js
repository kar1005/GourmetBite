const express = require("express")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())
const PORT = 5000
const Database_url = 'mongodb+srv://gourmetdevelopers:itsATprojectkk@cluster0.ksb38.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const customerRoutes = require('./routes/customer-routes');
const menuRoutes = require('./routes/menu-routes');
const feedbackRoutes = require('./routes/feedback-routes');
// const orderRoutes = require('./routes/order-routes');
// const inventoryRoutes = require('./routes/inventory-routes');
// const inventoryLogRoute = require('./routes/inventoryLog-route');

app.use("/customers", customerRoutes);
app.use("/menu",menuRoutes);
app.use("/feedback",feedbackRoutes);
// app.use("/orders",orderRoutes);
// app.use("/inventory",inventoryRoutes);
// app.use("/inventoryLog",inventoryLogRoute);

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