const express = require('express');
const customerController = require('../controllers/customer-controller');
const router = express.Router();
const multer = require('multer');


// Define the absolute path to the upload directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './profilepic');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });





// Get all customers
router.get('/', customerController.getAllCustomers);

// Get a customer by ID
router.get('/:id', customerController.getCustomerById);

// Create a new customer
router.post('/',upload.single('profilepic'),customerController.createCustomer);

//login user
router.post('/login', customerController.loginCustomer);

// Update a customer by ID
router.patch('/:id',upload.single('profile_pic'),customerController.updateCustomer);

// Delete a customer by ID
router.delete('/:id', customerController.deleteCustomer);

router.get('/phone/:phone',customerController.findByPhone);

router.use('/',customerController.NotValidRoute);

module.exports = router;
