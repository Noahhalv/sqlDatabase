import pool from '../data/db.js';

const isNumber = (value) => {
    return /^\d+$/.test(value);
};

// Controllers for Users

const getAllUsers = async (req, res) => {
    // res.send('Get all users');
    try {
        const result = await pool.query(
            'SELECT * FROM `user`'
        );

        res.status(200).json({ status: true, data: result[0] });
    } catch {
        res.status(500).json({ status: false, error: 'An error occurred while fetching users' });
    }
}

const getSingleUser = async (req, res) => {
    // res.send('Get user by id');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid user ID' });
        }
        const result = await pool.execute(
            'SELECT * FROM `user` WHERE User_ID = ?',
            [req.params.id]
        );

        if (result[0].length === 0) {
            return res.status(404).json({ status: false, error: 'User not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while fetching user' });
    }
}

const createUser = async (req, res) => {
    // res.send('Create new user');
    try {
        if (!req.body.Username || !req.body.User_PWRD || !req.body.User_Role) {
            return res.status(400).json({ status: false, error: 'Missing required fields' });
        }
        
        const result = await pool.execute(
            'INSERT INTO `user` (Username, User_PWRD, User_Role) VALUES (?, ?, ?)',
            [req.body.Username, req.body.User_PWRD, req.body.User_Role]
        );

        if (result[0].affectedRows === 0) {
            return res.status(400).json({ status: false, error: 'User already exists' });
        }

        res.status(201).json({ status: true, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while creating user' });
    }
}

const updateUser = async (req, res) => {
    // res.send('Update user by id');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid user ID' });
        }

        const result = await pool.execute(
            'UPDATE `user` SET Username = ?, User_PWRD = ?, User_Role = ? WHERE User_ID = ?',
            [req.body.Username, req.body.User_PWRD, req.body.User_Role, req.params.id]
        );
        
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ status: false, error: 'User not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while updating user' });
    }
}

const deleteUser = async (req, res) => {
    // res.send('Delete user by id');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid user ID' });
        }

        const result = await pool.execute(
            'DELETE FROM `user` WHERE User_ID = ?',
            [req.params.id]
        );

        if (result[0].affectedRows === 0) {
            return res.status(404).json({ status: false, error: 'User not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while deleting user' });
    }
}

export { 
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
};