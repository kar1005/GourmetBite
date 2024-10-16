const Menu = require('../models/menu');
const multer = require('multer');
// const bodyParser = require('body-parser');

exports.getCategories = async(req,res) =>{
    try {
        const categories = await Menu.distinct('category');
        if(!categories){
            res.status(404).json({message:"categories not found"})
        }
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.creatFoodItem = async(req,res) => {
    try {
        console.log("Here in create food:",req.body.data);
        const data = JSON.parse(req.body.data); // Parse the JSON data
        
        const imagePath = req.file ? req.file.path : null;
        const newItem = new Menu({
            category: data.category,
            foodName: data.foodName,
            price: data.price,
            description: data.description,
            rating: data.rating,
            allergyIngredients: data.allergyIngredients,
            availability: data.availability,
            image: imagePath // Use the uploaded file path if it exists
        });
        await newItem.save();
        res.status(201).json({message:"Item Added", item:newItem})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


exports.updateFoodItem = async(req,res) => {
    try {
        const data = JSON.parse(req.body.data); // Parse the JSON data
        const imagePath = req.file ? req.file.path : null;

        console.log(data);
        console.log(req.file);
        
        const updatedItem = {
            category: data.category,
            foodName: data.foodName,
            price: data.price,
            description: data.description,
            rating: data.rating,
            allergyIngredients: data.allergyIngredients,
            availability: data.availability,
            image: imagePath // Use the uploaded file path if it exists
          };

        const updatedMenuItem = await Menu.findByIdAndUpdate(req.params.id, updatedItem, {
            new: true,
            runValidators: true,
        });

        if (!updatedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        res.status(200).json({ message: 'Menu item updated successfully', menuItem: updatedMenuItem });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getFoodById = async(req,res) => {
    console.log("in menu getFoodById");
    
    try {
        const item = await Menu.findById(req.params.id);
        if(!item){
            res.status(404).json({message:"Item not found"})
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// menu-controller.js
exports.getFoodByIdOrders = async (id) => {
    try {
      const item = await Menu.findById(id);
      if (!item) {
        throw new Error('Item not found');
      }
      return item; // Return the item directly
    } catch (error) {
      throw new Error(error.message); // Handle error by throwing it
    }
  };




exports.getFoodByName = async(req,res) => {
    try {
        const menuItems = await Menu.find({ foodName: { $regex: req.params.foodName, $options: 'i'} });
        //$options: 'i' : used for case insensitve search
        if (!menuItems.length) {
            return res.status(404).json({ message: 'No menu items found with that name' });
        }
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.getFoodByCategory = async(req,res) => {
    try {
        const menuItems = await Menu.find({ category: req.params.category });
        if (!menuItems.length) {
            return res.status(404).json({ message: 'No menu items found in that category' });
        }
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}
exports.getAllFoodItems = async(req,res) => {
    try {
        const menuItems = await Menu.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteFoodItem = async(req,res) => {
    try {
        const deletedMenuItem = await Menu.findByIdAndDelete(req.params.id);
        if (!deletedMenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.NotValidRoute = async(req,res) => {
    res.status(400).json({ message: "Enter Valid Route" });
}