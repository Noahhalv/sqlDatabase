import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../data/db.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

// Register and login user

const SECRET_KEY = process.env.JWT_SECRET;



const register = async (req, res) => {
    // res.send('Register new user');
    const { username, password, user_role } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            'INSERT INTO user (Username, User_PWRD, User_Role) VALUES (?, ?, ?)',
            [username, hashedPassword, user_role]
        );

        if (result.affectedRows === 1) {
            return res.status(201).json({
                id: result.insertId,
                username,
                user_role,
                password,   // ! Remove this in production, only for testing purposes
                hashedPassword,
                status: true,
                message: 'User registered successfully'
            });
        } else {
            return res.status(500).json({ status: false, message: 'Failed to register user' });
        }
    } catch (error) {
        console.error('Failed to register user:', error);
        return res.status(500).json({ status: false, message: 'Failed to register user' });
    }
}



const login = async (req, res) => {
    // res.send('Login user');
    try {
        const [rows] = await pool.query(
            'SELECT * FROM user WHERE Username = ?',
            [req.body.username]
        );

        if (rows.length === 0) {
            return res.status(404).json({ status: false, message: 'User not found' });
        }

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(req.body.password, user.User_PWRD);

        if (passwordMatch) {
            const token = jwt.sign({ username: user.Username, user_role: user.User_Role }, SECRET_KEY, { expiresIn: '1d' });
            return res.status(200).json({ status: true, message: 'Login successful', token });
        } else {
            return res.status(401).json({ status: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Failed to login user:', error);
        return res.status(500).json({ status: false, message: 'Failed to login user' });
    }
}

export {
    register,
    login
};