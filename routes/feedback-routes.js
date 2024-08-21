const express = require('express');
const feedbackController = require('../controllers/feedback-controller')
const router = express.Router();

// Add feedback
router.post('/', feedbackController.addFeedback);

// Get feedback by user
router.get('/user/:customerId', feedbackController.getFeedbackByUser);

// Get feedback by food item 
router.get('/food/:menuItemId', feedbackController.getFeedbackByFoodItem);

// Get all feedback 
router.get('/', feedbackController.getAllFeedbacks);

// Update feedback by ID
router.patch('/:id', feedbackController.updateFeedback);

// Delete feedback by ID
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router