const db = require('../config/db');

exports.getAllPackages = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM packages WHERE status = 'active' ORDER BY id DESC");
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getPackageById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM packages WHERE id = ?', [req.params.id]);
        if (!rows.length) return res.status(404).json({ error: 'Package not found' });
        res.json(rows[0]);
    } catch (err) { res.status(500).json({ error: err.message }); }
};
