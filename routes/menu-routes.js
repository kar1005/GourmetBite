const express = require("express");
const menuController = require("../controllers/menu-contorller");
const router = express.Router();

//add food item
router.post('/',menuController.creatFoodItem);

//get food item by id
router.get('/:id',menuController.getFoodById);

//get food item by name
router.get('/name/:foodName',menuController.getFoodByName);

//get food item by category
router.get('/category/:category',menuController.getFoodByCategory);

//get all food items
router.get('/',menuController.getAllFoodItems);

//update food item
router.patch('/:id',menuController.updateFoodItem);

//delete food item
router.delete('/:id',menuController.deleteFoodItem);

router.use('/',menuController.error)

module.exports = router;

