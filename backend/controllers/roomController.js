const db = require('../config/db');

exports.getAllRooms = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM rooms WHERE status = 'active' ORDER BY id DESC");
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getRoomById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM rooms WHERE id = ?', [req.params.id]);
        if (!rows.length) return res.status(404).json({ error: 'Room not found' });
        res.json(rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.checkAvailability = async (req, res) => {
    try {
        const { check_in, check_out, adults = 1, children = 0 } = req.body;
        if (!check_in || !check_out) return res.status(400).json({ error: 'check_in and check_out are required' });
        const total_guests = parseInt(adults) + parseInt(children);
        const [rows] = await db.query(`
      SELECT r.* FROM rooms r
      WHERE r.status = 'active' AND r.capacity >= ?
      AND r.id NOT IN (
        SELECT rb.room_id FROM room_bookings rb
        WHERE rb.booking_status != 'cancelled'
        AND NOT (rb.check_out_date <= ? OR rb.check_in_date >= ?)
      )
    `, [total_guests, check_in, check_out]);
        res.json({ rooms: rows, search: { check_in, check_out, adults, children } });
    } catch (err) { res.status(500).json({ error: err.message }); }
};
