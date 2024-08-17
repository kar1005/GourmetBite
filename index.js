const express = require("express")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())
const PORT = 5000
const Database_url = 'mongodb+srv://gourmetdevelopers:itsATprojectkk@cluster0.ksb38.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

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