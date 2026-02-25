const db = require('../config/db');

// Book a tour
exports.bookTour = async (req, res) => {
    try {
        const { tour_id, booking_date, people, special_requests } = req.body;
        const user_id = req.user.id;
        if (!tour_id || !booking_date || !people) return res.status(400).json({ error: 'Missing required fields' });
        const [tours] = await db.query('SELECT price FROM tours WHERE id = ?', [tour_id]);
        if (!tours.length) return res.status(404).json({ error: 'Tour not found' });
        const total_amount = parseFloat(tours[0].price) * parseInt(people);
        const [result] = await db.query(
            'INSERT INTO tour_bookings (user_id, tour_id, booking_date, people, total_amount, special_requests) VALUES (?, ?, ?, ?, ?, ?)',
            [user_id, tour_id, booking_date, people, total_amount, special_requests || null]
        );
        res.status(201).json({ message: 'Tour booked successfully', booking_id: result.insertId, total_amount });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// Book a room
exports.bookRoom = async (req, res) => {
    try {
        const { room_id, check_in_date, check_out_date, adults, children, special_requests } = req.body;
        const user_id = req.user.id;
        if (!room_id || !check_in_date || !check_out_date) return res.status(400).json({ error: 'Missing required fields' });
        const [rooms] = await db.query('SELECT price FROM rooms WHERE id = ?', [room_id]);
        if (!rooms.length) return res.status(404).json({ error: 'Room not found' });
        const checkin = new Date(check_in_date);
        const checkout = new Date(check_out_date);
        const total_nights = Math.max(1, Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24)));
        const total_amount = parseFloat(rooms[0].price) * total_nights;
        const [result] = await db.query(
            'INSERT INTO room_bookings (user_id, room_id, check_in_date, check_out_date, adults, children, total_nights, total_amount, special_requests) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [user_id, room_id, check_in_date, check_out_date, adults || 1, children || 0, total_nights, total_amount, special_requests || null]
        );
        res.status(201).json({ message: 'Room booked successfully', booking_id: result.insertId, total_amount, total_nights });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// Book a package
exports.bookPackage = async (req, res) => {
    try {
        const { package_id, booking_date, number_of_guests, special_requests } = req.body;
        const user_id = req.user.id;
        if (!package_id || !booking_date) return res.status(400).json({ error: 'Missing required fields' });
        const [pkgs] = await db.query('SELECT price FROM packages WHERE id = ?', [package_id]);
        if (!pkgs.length) return res.status(404).json({ error: 'Package not found' });
        const total_amount = parseFloat(pkgs[0].price) * parseInt(number_of_guests || 1);
        const [result] = await db.query(
            'INSERT INTO package_bookings (user_id, package_id, booking_date, number_of_guests, total_amount, special_requests) VALUES (?, ?, ?, ?, ?, ?)',
            [user_id, package_id, booking_date, number_of_guests || 1, total_amount, special_requests || null]
        );
        res.status(201).json({ message: 'Package booked successfully', booking_id: result.insertId, total_amount });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// Get my bookings
exports.getMyBookings = async (req, res) => {
    try {
        const user_id = req.user.id;
        const [tours] = await db.query(`SELECT tb.*, t.name as item_name, t.image_path, t.location, 'tour' as type FROM tour_bookings tb JOIN tours t ON tb.tour_id = t.id WHERE tb.user_id = ? ORDER BY tb.created_at DESC`, [user_id]);
        const [rooms] = await db.query(`SELECT rb.*, r.name as item_name, r.image_path, 'room' as type FROM room_bookings rb JOIN rooms r ON rb.room_id = r.id WHERE rb.user_id = ? ORDER BY rb.created_at DESC`, [user_id]);
        const [packages] = await db.query(`SELECT pb.*, p.name as item_name, p.image_path, p.duration, 'package' as type FROM package_bookings pb JOIN packages p ON pb.package_id = p.id WHERE pb.user_id = ? ORDER BY pb.created_at DESC`, [user_id]);
        res.json({ tours, rooms, packages });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
    try {
        const { type, id } = req.params;
        const user_id = req.user.id;
        const tableMap = { tour: 'tour_bookings', room: 'room_bookings', package: 'package_bookings' };
        const table = tableMap[type];
        if (!table) return res.status(400).json({ error: 'Invalid booking type' });
        const [rows] = await db.query(`SELECT id, booking_status FROM ${table} WHERE id = ? AND user_id = ?`, [id, user_id]);
        if (!rows.length) return res.status(404).json({ error: 'Booking not found' });
        if (rows[0].booking_status === 'cancelled') return res.status(400).json({ error: 'Booking already cancelled' });
        await db.query(`UPDATE ${table} SET booking_status = 'cancelled' WHERE id = ?`, [id]);
        res.json({ message: 'Booking cancelled successfully' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// Get booking details
exports.getBookingDetails = async (req, res) => {
    try {
        const { type, id } = req.params;
        const user_id = req.user.id;
        let query, rows;
        if (type === 'tour') {
            [rows] = await db.query(`SELECT tb.*, t.name as tour_name, t.description, t.price, t.duration, t.location, t.image_path, u.name as user_name, u.email, u.phone FROM tour_bookings tb JOIN tours t ON tb.tour_id = t.id JOIN users u ON tb.user_id = u.id WHERE tb.id = ? AND tb.user_id = ?`, [id, user_id]);
        } else if (type === 'room') {
            [rows] = await db.query(`SELECT rb.*, r.name as room_name, r.description, r.price, r.image_path, u.name as user_name, u.email, u.phone FROM room_bookings rb JOIN rooms r ON rb.room_id = r.id JOIN users u ON rb.user_id = u.id WHERE rb.id = ? AND rb.user_id = ?`, [id, user_id]);
        } else if (type === 'package') {
            [rows] = await db.query(`SELECT pb.*, p.name as package_name, p.description, p.price, p.duration, p.image_path, u.name as user_name, u.email, u.phone FROM package_bookings pb JOIN packages p ON pb.package_id = p.id JOIN users u ON pb.user_id = u.id WHERE pb.id = ? AND pb.user_id = ?`, [id, user_id]);
        } else {
            return res.status(400).json({ error: 'Invalid type' });
        }
        if (!rows.length) return res.status(404).json({ error: 'Booking not found' });
        res.json({ ...rows[0], type });
    } catch (err) { res.status(500).json({ error: err.message }); }
};
