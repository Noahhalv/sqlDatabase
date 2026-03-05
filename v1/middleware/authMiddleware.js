import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const SECRET_KEY = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid access token' });
        }

        req.user = user;
        next();
    });
}

function authorizeRole(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.user_role)) {
            console.log('Access denied for user:', req.user ? req.user.username : 'Unknown');
            console.log('Required roles:', allowedRoles);
            console.log('User role:', req.user ? req.user.user_role : 'Unknown');
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
}

export {
    authenticateToken,
    authorizeRole
};