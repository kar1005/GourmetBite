const express = require("express");
const inventoryLogController = require("../controllers/inventoryLog-controller");
const router = express.Router();

//get all ingredient
router.get('/',inventoryLogController.getInventoryLog);

//get ingredients by id 
router.get('/:id',inventoryLogController.getInventoryLogById);

//add ingredient
router.post('/',inventoryLogController.addInventoryLog);

//update ingredient
router.patch('/:id',inventoryLogController.updateInventoryLogById);

//deleteingredient
router.post('/:id',inventoryLogController.deleteInventoryLogById);

router.use('/',inventoryLogController.NotValidRoute);

module.exports = router;