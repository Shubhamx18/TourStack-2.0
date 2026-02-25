const router = require('express').Router();
const { adminProtect } = require('../middleware/auth');
const admin = require('../controllers/adminController');

router.use(adminProtect);

router.get('/stats', admin.getStats);
router.get('/bookings', admin.getAllBookings);
router.put('/bookings/:type/:id', admin.updateBookingStatus);

router.get('/tours', admin.getAdminTours);
router.post('/tours', admin.createTour);
router.put('/tours/:id', admin.updateTour);
router.delete('/tours/:id', admin.deleteTour);

router.get('/rooms', admin.getAdminRooms);
router.post('/rooms', admin.createRoom);
router.put('/rooms/:id', admin.updateRoom);
router.delete('/rooms/:id', admin.deleteRoom);

router.get('/packages', admin.getAdminPackages);
router.post('/packages', admin.createPackage);
router.put('/packages/:id', admin.updatePackage);
router.delete('/packages/:id', admin.deletePackage);

router.get('/users', admin.getUsers);
router.delete('/users/:id', admin.deleteUser);

router.get('/customers', admin.getCustomers);
router.post('/customers', admin.createCustomer);
router.put('/customers/:id', admin.updateCustomer);
router.delete('/customers/:id', admin.deleteCustomer);

module.exports = router;
