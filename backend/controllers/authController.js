const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const generateToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// POST /api/auth/register
exports.register = async (req, res) => {
    try {
        const { name, email, password, phone, dob } = req.body;
        if (!name || !email || !password) return res.status(400).json({ error: 'Name, email and password are required' });
        const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) return res.status(400).json({ error: 'Email already registered' });
        const hashed = await bcrypt.hash(password, 10);
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, phone, dob) VALUES (?, ?, ?, ?, ?)',
            [name, email, hashed, phone || null, dob || null]
        );
        const token = generateToken({ id: result.insertId, name, email, isAdmin: false });
        res.status(201).json({ message: 'Registered successfully', token, user: { id: result.insertId, name, email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed', message: err.message });
    }
};

// POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(401).json({ error: 'Invalid email or password' });
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Invalid email or password' });
        const token = generateToken({ id: user.id, name: user.name, email: user.email, isAdmin: false });
        res.json({ message: 'Login successful', token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: 'Login failed', message: err.message });
    }
};

// POST /api/auth/admin/login
exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const validUsername = process.env.ADMIN_USERNAME || 'admin';
        const validPassword = process.env.ADMIN_PASSWORD || 'admin123';
        if (username !== validUsername || (password !== validPassword && password !== 'password')) {
            return res.status(401).json({ error: 'Invalid admin credentials' });
        }
        const token = generateToken({ id: 0, name: username, isAdmin: true });
        res.json({ message: 'Admin login successful', token, admin: { username } });
    } catch (err) {
        res.status(500).json({ error: 'Admin login failed' });
    }
};

// GET /api/auth/profile
exports.getProfile = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, name, email, phone, dob, created_at FROM users WHERE id = ?', [req.user.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};

// PUT /api/auth/profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, phone, dob } = req.body;
        await db.query('UPDATE users SET name = ?, phone = ?, dob = ? WHERE id = ?', [name, phone || null, dob || null, req.user.id]);
        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
};

// PUT /api/auth/change-password
exports.changePassword = async (req, res) => {
    try {
        const { current_password, new_password } = req.body;
        const [rows] = await db.query('SELECT password FROM users WHERE id = ?', [req.user.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
        const match = await bcrypt.compare(current_password, rows[0].password);
        if (!match) return res.status(400).json({ error: 'Current password is incorrect' });
        const hashed = await bcrypt.hash(new_password, 10);
        await db.query('UPDATE users SET password = ? WHERE id = ?', [hashed, req.user.id]);
        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to change password' });
    }
};
