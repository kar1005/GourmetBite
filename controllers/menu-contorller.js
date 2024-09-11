const Menu = require('../models/menu');


exports.creatFoodItem = async(req,res) => {
    try {
        const {category,foodName,image,price,description,rating,allergyIngredients,availability} = req.body;
        const newItem = new Menu({category,foodName,image,price,description,rating,allergyIngredients,availability})
        await newItem.save();
        res.status(201).json({message:"Item Added" , item:newItem})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.getFoodById = async(req,res) => {
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
exports.updateFoodItem = async(req,res) => {
    try {
        const updatedMenuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, {
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