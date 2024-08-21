const express = require("express");
const partyBookingController = require("../controllers/partyBooking-controller");
const router = express.Router();

//get all party bookings
router.get('/',partyBookingController.getPartyBooking);

//get party by id 
router.get('/:id',partyBookingController.getPartyBookingById);

//add party
router.post('/',partyBookingController.addPartyBooking);

//update party
router.patch('/:id',partyBookingController.updatepPartyBookingById);

//delete party
router.post('/:id',partyBookingController.deletePartyBookingById);

module.exports = router;