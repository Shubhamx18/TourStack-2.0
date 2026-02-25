const router = require('express').Router();
const { getAllRooms, getRoomById, checkAvailability } = require('../controllers/roomController');
router.get('/', getAllRooms);
router.post('/availability', checkAvailability);
router.get('/:id', getRoomById);
module.exports = router;
