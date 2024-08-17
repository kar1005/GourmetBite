const Feedback = require('../models/feedbacks');

// Add feedback
exports.addFeedback = async (req, res) => {
    try {
        const newFeedback = new Feedback(req.body);
        await newFeedback.save();
        res.status(201).json({ message: 'Feedback added successfully', feedback: newFeedback });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get feedback by user (customer)
exports.getFeedbackByUser = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ customer: req.params.customerId }).populate('menuItem');
        if (!feedbacks.length) {
            return res.status(404).json({ message: 'No feedback found for this user' });
        }
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get feedback by food item
exports.getFeedbackByFoodItem = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ menuItem: req.params.menuItemId }).populate('customer');
        if (!feedbacks.length) {
            return res.status(404).json({ message: 'No feedback found for this food item' });
        }
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all feedbacks
exports.getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate('customer menuItem');
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update feedback
exports.updateFeedback = async (req, res) => {
    try {
        const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedFeedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        res.status(200).json({ message: 'Feedback updated successfully', feedback: updatedFeedback });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
    try {
        const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!deletedFeedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};