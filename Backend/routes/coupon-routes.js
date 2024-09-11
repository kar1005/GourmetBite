const express = require("express");
const couponController = require("../controllers/coupon-controller");
const router = express.Router();

//get all coupons
router.get('/',couponController.getCoupons);

//get coupon by id
router.get('/:id',couponController.getCouponByID);

//get coupons by customer
router.get('/customer/:id',couponController.getCouponsByCustomer);

//Add coupon
router.post('/',couponController.addCoupon);

//update coupon
router.patch('/:id',couponController.updateCoupon);

//delete coupon
router.delete('/:id',couponController.deleteById);

router.use('/',couponController.NotValidRoute);

module.exports = router;
// moudle.exports = router;