const router = require('express').Router();
const db = require('../config/db');
router.get('/', async (req, res) => {
    try { const [r] = await db.query("SELECT * FROM facilities WHERE status='active' ORDER BY id"); res.json(r); }
    catch (e) { res.status(500).json({ error: e.message }); }
});
module.exports = router;
