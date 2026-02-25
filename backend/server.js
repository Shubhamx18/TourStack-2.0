const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// ── Security & Performance ─────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(compression());
app.use(morgan('dev'));

// ── Rate Limiting (auth routes only) ──────────────────────────
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30,
    message: { error: 'Too many requests, please try again later.' }
});

// ── CORS ───────────────────────────────────────────────────────
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));

// ── Body Parsers ───────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Static Files (uploads) ─────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Routes ─────────────────────────────────────────────────────
app.use('/api/auth', authLimiter, require('./routes/auth'));
app.use('/api/tours', require('./routes/tours'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/packages', require('./routes/packages'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/facilities', require('./routes/facilities'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/contact', require('./routes/contact'));

// ── Health Check ───────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'OK', timestamp: new Date() }));

// ── 404 Handler ────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// ── Error Handler ──────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error', message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 TourStack server running on http://localhost:${PORT}`);
});
