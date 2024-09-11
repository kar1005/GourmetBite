// const mongoose = require("mongoose");
const Customer = require("../models/customer")


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
    try {
        const { name, phone_no, password, dob, gender, profile_pic } = req.body;
        
        const newCustomer = new Customer({
            name,
            phone_no,
            password,
            dob,
            gender,
            profile_pic
        });

        await newCustomer.save();
        res.status(201).json({ message: 'Customer created successfully', customer: newCustomer });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }  
        res.status(200).json({ message: 'Customer updated successfully', customer: updatedCustomer });
    } catch (error) {
        res.status(400).json({ message: error.message });
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