const router = require('express').Router();
const { bookTour, bookRoom, bookPackage, getMyBookings, cancelBooking, getBookingDetails } = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.post('/tour', bookTour);
router.post('/room', bookRoom);
router.post('/package', bookPackage);
router.get('/my', getMyBookings);
router.get('/details/:type/:id', getBookingDetails);
router.put('/cancel/:type/:id', cancelBooking);

module.exports = router;
