const express = require('express');
const customerController = require('../controllers/customer-controller');
const router = express.Router();

// Get all customers
router.get('/', customerController.getAllCustomers);

// Get a customer by ID
router.get('/:id', customerController.getCustomerById);

// Create a new customer
router.post('/', customerController.createCustomer);

// Update a customer by ID
router.patch('/:id',customerController.updateCustomer);

// Delete a customer by ID
router.delete('/:id', customerController.deleteCustomer);

router.get('/phone/:phone',customerController.findByPhone);

module.exports = router;
