const express = require("express");
const billController = require("../controllers/bill-controller");
const router = express.Router();

//get all bill
router.get('/', billController.getBills);

//get bill by id
router.get('/:id', billController.getBillByID);

//get bill by customer
router.get('/customer/:id', billController.getBillByCustomer);

//create bill
router.post('/',billController.addBill);

//update  bill
router.patch('/:id',billController.updateBillById);

//delete bill
router.delete('/:id',billController.deleteBillById);

module.exports = router