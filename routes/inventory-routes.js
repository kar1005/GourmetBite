const express = require("express");
const inventoryController = require("../controllers/inventory-controller");
const router = express.Router();

//get all ingredient
router.get('/',inventoryController.getInventory);

//get ingredients by id 
router.get('/:id',inventoryController.getInventoryById);

//add ingredient
router.post('/',inventoryController.addInventory);

//update ingredient
router.patch('/:id',inventoryController.updateInventoryById);

//deleteingredient
router.post('/:id',inventoryController.deleteInventoryById);

router.use('/',inventoryController.NotValidRoute);

module.exports = router;