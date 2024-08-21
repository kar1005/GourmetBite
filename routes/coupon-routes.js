const express = require("express");
const couponController = require("../controllers/coupon-controller");
const router = express.Router();

//get all coupons
router.get('/',couponController.getCoupons);

//get coupon by id
router.get('/:id',couponController.getCouponsById);

//get coupons by customer
router.get('/customer/:id',couponController.getCouponsByCustomer);

//Add coupon
router.post('/',couponController.addCoupon);

//update coupon
router.patch('/:id',couponController.updateCouponById);

//delete coupon
router.delete('/:id',couponController.deleteCouponById);


moudle.exports = router;