const router = require('express').Router();
router.post('/', (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'Name, email and message are required' });
    console.log('Contact form:', { name, email, subject, message });
    res.json({ success: true, message: 'Thank you! Your message has been received. We will get back to you shortly.' });
});
module.exports = router;
