const express = require("express");
const contactController = require("../controllers/contactus-controller");
const router = express.Router();

//get all coupons
router.get('/',contactController.getContactUs);

//get coupon by id
router.get('/:id',contactController.getContactUsByID);

//Add coupon
router.post('/',contactController.addContactUs);

//update coupon
router.patch('/:id',contactController.updateContactUs);

//delete coupon
router.delete('/:id',contactController.deleteById);

router.use('/',contactController.NotValidRoute);

module.exports = router;
// moudle.exports = router;