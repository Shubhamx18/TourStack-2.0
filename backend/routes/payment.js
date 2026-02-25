const router = require('express').Router();
const db = require('../config/db');
const { protect } = require('../middleware/auth');

// Process payment (fake/cash)
router.post('/process', protect, async (req, res) => {
    try {
        const { booking_id, booking_type, amount, payment_method = 'cash' } = req.body;
        await db.query('INSERT INTO payments (booking_id, booking_type, user_id, amount, payment_method, status) VALUES (?,?,?,?,?,?)',
            [booking_id, booking_type, req.user.id, amount, payment_method, 'completed']);
        const tableMap = { tour: 'tour_bookings', room: 'room_bookings', package: 'package_bookings' };
        const table = tableMap[booking_type];
        if (table) await db.query(`UPDATE ${table} SET payment_status = 'paid', booking_status = 'confirmed' WHERE id = ?`, [booking_id]);
        res.json({ success: true, message: 'Payment processed successfully', payment_method });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Razorpay order creation
router.post('/razorpay/create', protect, async (req, res) => {
    try {
        const Razorpay = require('razorpay');
        const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
        const { amount } = req.body;
        const order = await razorpay.orders.create({ amount: Math.round(amount * 100), currency: 'INR', receipt: `rcpt_${Date.now()}` });
        res.json({ order_id: order.id, amount: order.amount, currency: order.currency, key_id: process.env.RAZORPAY_KEY_ID });
    } catch (err) { res.status(500).json({ error: 'Razorpay order creation failed', message: err.message }); }
});

// Razorpay verify
router.post('/razorpay/verify', protect, async (req, res) => {
    try {
        const crypto = require('crypto');
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, booking_id, booking_type, amount } = req.body;
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(sign).digest('hex');
        if (expected !== razorpay_signature) return res.status(400).json({ error: 'Payment signature verification failed' });
        await db.query('INSERT INTO payments (booking_id,booking_type,user_id,amount,payment_method,transaction_id,status) VALUES (?,?,?,?,?,?,?)',
            [booking_id, booking_type, req.user.id, amount, 'razorpay', razorpay_payment_id, 'completed']);
        const tableMap = { tour: 'tour_bookings', room: 'room_bookings', package: 'package_bookings' };
        const table = tableMap[booking_type];
        if (table) await db.query(`UPDATE ${table} SET payment_status='paid', booking_status='confirmed' WHERE id=?`, [booking_id]);
        res.json({ success: true, message: 'Payment verified and booking confirmed' });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
