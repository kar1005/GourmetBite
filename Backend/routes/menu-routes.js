const express = require("express");
const menuController = require("../controllers/menu-contorller");
const router = express.Router();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,'./uploads');
    },
    filename : function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({ storage }); // Specify your upload destination





//add food item
router.post('/', upload.single('image'),menuController.creatFoodItem);

//get food item by id
router.get('/:id',menuController.getFoodById);

//get food item by name
router.get('/name/:foodName',menuController.getFoodByName);


//get food item by category
router.get('/category/:category',menuController.getFoodByCategory);

//get list of category
router.get('/categories/list', menuController.getCategories);  

//get all food items
router.get('/',menuController.getAllFoodItems);

//update food item
router.patch('/:id', upload.single('image'),menuController.updateFoodItem);

//delete food item
router.delete('/:id',menuController.deleteFoodItem);

// router.use('/',menuController.NotValidRoute);

module.exports = router;

