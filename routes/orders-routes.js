const express = require("express");
const ordersController = require('../controllers/orders-controller');
const router = express.Router();

//get all orders
router.get('/',ordersController.getOrders);

//get order which are pending
router.get('/pending',ordersController.getPendingOrders);

//get pending orders by table number
router.get('/pending/:tableno',ordersController.getPendingOrdersByTable);

//get orders by id
router.get('/:id',ordersController.getOrderById);

//get orders by customer 
router.get('/customer/:id',ordersController.getOrdersByCustomer);

//Create Order
router.post('/',ordersController.addOrders);

//Update Order
router.patch('/:id',ordersController.updateOrderById);

//Delete Order
router.delete('/:id',ordersController.deleteOrderById);


module.exports = router;