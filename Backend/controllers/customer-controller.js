// const mongoose = require("mongoose");
const Customer = require("../models/customer")
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a customer by ID
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Create a new customer
exports.createCustomer = async (req, res) => {
    // const customer = await Customer.find().where('phone_no').equals(req.body.phone_no);
        try {
            // Access form data
            let { name, phone_no, password, dob, gender } = req.body;
            // if(customer){            
            //     return res.status(404).json({message:'Phone number already registered'});
            // }
            const existingCustomer = await Customer.findOne({ phone_no });
            if (existingCustomer) {
                return res.status(409).json({ message: 'Phone number already registered' });
            }
            password = await bcrypt.hash(req.body.password,10);

            // Create new customer with the profile_pic path
            const newCustomer = new Customer({
                name,
                phone_no,
                password,
                dob,
                gender,
                profile_pic: req.file ? req.file.path : null,
            });

            // Save the customer data to the database
            await newCustomer.save();
            
            // Send a response
            res.status(201).json({ message: 'Customer created successfully', customer: newCustomer });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

exports.loginCustomer = async (req, res) => {
    const customer = await Customer.findOne({ phone_no: req.body.phone_no });
    
    if (customer) {
        const { password } = customer;
        if (password && req.body.password) {
            const isMatch = await bcrypt.compare(req.body.password, password);
            if (isMatch) {
                const token = jwt.sign({ phone_no: customer.phone_no }, 'jingalalaHooHoo');
                return res.json({ token });
            } else {
                return res.status(403).json({ message: 'Login Failed' });
            }
        } else {
            return res.status(403).json({ message: 'Invalid credentials' });
        }
    } else {
        return res.status(404).json({ message: 'Customer not found' });
    }
};
  

// Update a customer
exports.updateCustomer = async (req, res) => {
    try {
        // const customerId = req.params.id;
        
        console.log('Received body:', req.body.data);
        console.log('Received file:', req.file);
        const data = JSON.parse(req.body.data); // Parse the JSON data
        const imagePath = req.file ? req.file.path : null;
        const isMatch = await bcrypt.compare(data.currentPassword, data.ogPass);
        if(!isMatch){
            res.status(400).json({ message:'The current password did not match'});
        }
        pass = data.ogPass;
        if(data.newPassword){
            pass = await bcrypt.hash(data.newPassword,10);
        }
        const updateCustomer ={
            name:data.name,
            phone_no:data.phone_no,
            password:pass,
            dob:data.dob,
            gender:data.gender,
            profile_pic:imagePath
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, updateCustomer, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ message: 'Customer updated successfully' , updatedCustomer});//customer



    } catch (err) {
        console.error('Error updating customer:', err);
        res.status(500).json({ error: 'Failed to update customer' });
    }
};

// Delete a customer
exports.deleteCustomer = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.findByPhone = async(req,res)=>{
    try{
        const customer = await Customer.find().where('phone_no').equals(req.params.phone);
        if(!customer){
            return res.status(404).json({message:'Customer not found'});
        }
        res.status(200).json(customer);
    }catch{
        res.status(400).json({message:'Error in finding the Customer'});
    }
};

exports.NotValidRoute = async(req,res) => {
    res.status(400).json({ message: "Enter Valid Route" });
}

// async function getCustomer(req,res,next) {
//     let cust 
//     try {
//         cust = Customer.findById(req.params.id);
//         if (!cust) {
//             return res.status(404).json({message: "Customer not found"})
//         }
//     } catch (error) {
//         return res.status(500).json({message:error.message})
//     }
//     res.cust = cust
//     next()
// }