const db = require('../config/db');

exports.getAllTours = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM tours WHERE status = 'active' ORDER BY id DESC");
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getTourById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tours WHERE id = ?', [req.params.id]);
        if (!rows.length) return res.status(404).json({ error: 'Tour not found' });
        const tour = rows[0];
        if (typeof tour.includes === 'string') try { tour.includes = JSON.parse(tour.includes); } catch { }
        if (typeof tour.itinerary === 'string') try { tour.itinerary = JSON.parse(tour.itinerary); } catch { }
        res.json(tour);
    } catch (err) { res.status(500).json({ error: err.message }); }
};
