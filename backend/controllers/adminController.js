const db = require('../config/db');

// Admin dashboard stats
exports.getStats = async (req, res) => {
    try {
        const [[users]] = await db.query('SELECT COUNT(*) as count FROM users');
        const [[tourBookings]] = await db.query("SELECT COUNT(*) as count FROM tour_bookings WHERE booking_status != 'cancelled'");
        const [[roomBookings]] = await db.query("SELECT COUNT(*) as count FROM room_bookings WHERE booking_status != 'cancelled'");
        const [[packageBookings]] = await db.query("SELECT COUNT(*) as count FROM package_bookings WHERE booking_status != 'cancelled'");
        const [[tourRevenue]] = await db.query("SELECT COALESCE(SUM(total_amount),0) as total FROM tour_bookings WHERE payment_status = 'paid'");
        const [[roomRevenue]] = await db.query("SELECT COALESCE(SUM(total_amount),0) as total FROM room_bookings WHERE payment_status = 'paid'");
        const [[packageRevenue]] = await db.query("SELECT COALESCE(SUM(total_amount),0) as total FROM package_bookings WHERE payment_status = 'paid'");
        const [[pending]] = await db.query("SELECT (SELECT COUNT(*) FROM tour_bookings WHERE booking_status='pending') + (SELECT COUNT(*) FROM room_bookings WHERE booking_status='pending') + (SELECT COUNT(*) FROM package_bookings WHERE booking_status='pending') as count");

        // Monthly bookings (last 12 months)
        const [monthly] = await db.query(`
      SELECT MONTH(created_at) as month, YEAR(created_at) as year, COUNT(*) as count
      FROM (
        SELECT created_at FROM tour_bookings WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
        UNION ALL SELECT created_at FROM room_bookings WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
        UNION ALL SELECT created_at FROM package_bookings WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
      ) all_bookings GROUP BY year, month ORDER BY year, month`);

        // Booking status distribution
        const [statusDist] = await db.query(`
      SELECT booking_status, COUNT(*) as count FROM (
        SELECT booking_status FROM tour_bookings
        UNION ALL SELECT booking_status FROM room_bookings
        UNION ALL SELECT booking_status FROM package_bookings
      ) all_bookings GROUP BY booking_status`);

        // Recent bookings
        const [recentBookings] = await db.query(`
      SELECT tb.id, u.name as user_name, t.name as item_name, tb.booking_date, tb.total_amount, tb.booking_status, 'tour' as type, tb.created_at FROM tour_bookings tb JOIN users u ON tb.user_id = u.id JOIN tours t ON tb.tour_id = t.id
      UNION ALL
      SELECT rb.id, u.name, r.name, rb.check_in_date, rb.total_amount, rb.booking_status, 'room', rb.created_at FROM room_bookings rb JOIN users u ON rb.user_id = u.id JOIN rooms r ON rb.room_id = r.id
      UNION ALL
      SELECT pb.id, u.name, p.name, pb.booking_date, pb.total_amount, pb.booking_status, 'package', pb.created_at FROM package_bookings pb JOIN users u ON pb.user_id = u.id JOIN packages p ON pb.package_id = p.id
      ORDER BY created_at DESC LIMIT 10`);

        res.json({
            stats: { users: users.count, totalBookings: tourBookings.count + roomBookings.count + packageBookings.count, revenue: parseFloat(tourRevenue.total) + parseFloat(roomRevenue.total) + parseFloat(packageRevenue.total), pending: pending.count },
            monthly, statusDist, recentBookings
        });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const [tour] = await db.query(`SELECT tb.*, u.name as user_name, u.email, t.name as item_name, 'tour' as type FROM tour_bookings tb JOIN users u ON tb.user_id = u.id JOIN tours t ON tb.tour_id = t.id ORDER BY tb.created_at DESC`);
        const [room] = await db.query(`SELECT rb.*, u.name as user_name, u.email, r.name as item_name, 'room' as type FROM room_bookings rb JOIN users u ON rb.user_id = u.id JOIN rooms r ON rb.room_id = r.id ORDER BY rb.created_at DESC`);
        const [pkg] = await db.query(`SELECT pb.*, u.name as user_name, u.email, p.name as item_name, 'package' as type FROM package_bookings pb JOIN users u ON pb.user_id = u.id JOIN packages p ON pb.package_id = p.id ORDER BY pb.created_at DESC`);
        res.json({ tours: tour, rooms: room, packages: pkg });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
    try {
        const { type, id } = req.params;
        const { booking_status, payment_status } = req.body;
        const tableMap = { tour: 'tour_bookings', room: 'room_bookings', package: 'package_bookings' };
        const table = tableMap[type];
        if (!table) return res.status(400).json({ error: 'Invalid type' });
        await db.query(`UPDATE ${table} SET booking_status = ?, payment_status = ? WHERE id = ?`, [booking_status, payment_status, id]);
        res.json({ message: 'Booking status updated' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// CRUD Tours
exports.getAdminTours = async (req, res) => { try { const [r] = await db.query('SELECT * FROM tours ORDER BY id DESC'); res.json(r); } catch (e) { res.status(500).json({ error: e.message }); } };
exports.createTour = async (req, res) => {
    try {
        const { name, description, price, duration, max_people, location, image_path, tag, status } = req.body;
        const [r] = await db.query('INSERT INTO tours (name, description, price, duration, max_people, location, image_path, tag, status) VALUES (?,?,?,?,?,?,?,?,?)', [name, description, price, duration, max_people || 10, location || '', image_path || '', tag || '', status || 'active']);
        res.status(201).json({ id: r.insertId, message: 'Tour created' });
    } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.updateTour = async (req, res) => {
    try {
        const { name, description, price, duration, max_people, location, image_path, tag, status } = req.body;
        await db.query('UPDATE tours SET name=?,description=?,price=?,duration=?,max_people=?,location=?,image_path=?,tag=?,status=? WHERE id=?', [name, description, price, duration, max_people, location, image_path, tag, status, req.params.id]);
        res.json({ message: 'Tour updated' });
    } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.deleteTour = async (req, res) => { try { await db.query('DELETE FROM tours WHERE id=?', [req.params.id]); res.json({ message: 'Tour deleted' }); } catch (e) { res.status(500).json({ error: e.message }); } };

// CRUD Rooms
exports.getAdminRooms = async (req, res) => { try { const [r] = await db.query('SELECT * FROM rooms ORDER BY id DESC'); res.json(r); } catch (e) { res.status(500).json({ error: e.message }); } };
exports.createRoom = async (req, res) => {
    try {
        const { name, description, price, capacity, image_path, status } = req.body;
        const [r] = await db.query('INSERT INTO rooms (name, description, price, capacity, image_path, status) VALUES (?,?,?,?,?,?)', [name, description, price, capacity || 2, image_path || '', status || 'active']);
        res.status(201).json({ id: r.insertId, message: 'Room created' });
    } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.updateRoom = async (req, res) => {
    try {
        const { name, description, price, capacity, image_path, status } = req.body;
        await db.query('UPDATE rooms SET name=?,description=?,price=?,capacity=?,image_path=?,status=? WHERE id=?', [name, description, price, capacity, image_path, status, req.params.id]);
        res.json({ message: 'Room updated' });
    } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.deleteRoom = async (req, res) => { try { await db.query('DELETE FROM rooms WHERE id=?', [req.params.id]); res.json({ message: 'Room deleted' }); } catch (e) { res.status(500).json({ error: e.message }); } };

// CRUD Packages
exports.getAdminPackages = async (req, res) => { try { const [r] = await db.query('SELECT * FROM packages ORDER BY id DESC'); res.json(r); } catch (e) { res.status(500).json({ error: e.message }); } };
exports.createPackage = async (req, res) => {
    try {
        const { name, description, price, duration, accommodation, meals, location, image_path, status } = req.body;
        const [r] = await db.query('INSERT INTO packages (name,description,price,duration,accommodation,meals,location,image_path,status) VALUES (?,?,?,?,?,?,?,?,?)', [name, description, price, duration || '', accommodation || '', meals || '', location || '', image_path || '', status || 'active']);
        res.status(201).json({ id: r.insertId, message: 'Package created' });
    } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.updatePackage = async (req, res) => {
    try {
        const { name, description, price, duration, accommodation, meals, location, image_path, status } = req.body;
        await db.query('UPDATE packages SET name=?,description=?,price=?,duration=?,accommodation=?,meals=?,location=?,image_path=?,status=? WHERE id=?', [name, description, price, duration, accommodation, meals, location, image_path, status, req.params.id]);
        res.json({ message: 'Package updated' });
    } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.deletePackage = async (req, res) => { try { await db.query('DELETE FROM packages WHERE id=?', [req.params.id]); res.json({ message: 'Package deleted' }); } catch (e) { res.status(500).json({ error: e.message }); } };

// Users management
exports.getUsers = async (req, res) => { try { const [r] = await db.query('SELECT id,name,email,phone,dob,created_at FROM users ORDER BY created_at DESC'); res.json(r); } catch (e) { res.status(500).json({ error: e.message }); } };
exports.deleteUser = async (req, res) => { try { await db.query('DELETE FROM users WHERE id=?', [req.params.id]); res.json({ message: 'User deleted' }); } catch (e) { res.status(500).json({ error: e.message }); } };

// Customers management
exports.getCustomers = async (req, res) => { try { const [r] = await db.query('SELECT * FROM customers ORDER BY created_at DESC'); res.json(r); } catch (e) { res.status(500).json({ error: e.message }); } };
exports.createCustomer = async (req, res) => {
    try {
        const { name, email, mobile, address } = req.body;
        const [r] = await db.query('INSERT INTO customers (name,email,mobile,address) VALUES (?,?,?,?)', [name, email, mobile, address]);
        res.status(201).json({ id: r.insertId, message: 'Customer created' });
    } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.updateCustomer = async (req, res) => {
    try {
        const { name, email, mobile, address } = req.body;
        await db.query('UPDATE customers SET name=?,email=?,mobile=?,address=? WHERE id=?', [name, email, mobile, address, req.params.id]);
        res.json({ message: 'Customer updated' });
    } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.deleteCustomer = async (req, res) => { try { await db.query('DELETE FROM customers WHERE id=?', [req.params.id]); res.json({ message: 'Customer deleted' }); } catch (e) { res.status(500).json({ error: e.message }); } };
