const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return res.status(401).json({ error: 'Not authorized, no token' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token invalid or expired' });
    }
};

const adminProtect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return res.status(401).json({ error: 'Not authorized' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.isAdmin) return res.status(403).json({ error: 'Admin access required' });
        req.admin = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token invalid or expired' });
    }
};

module.exports = { protect, adminProtect };
