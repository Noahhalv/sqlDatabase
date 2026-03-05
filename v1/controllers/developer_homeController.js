import pool from '../data/db.js';

const isNumber = (value) => {
    return /^\d+$/.test(value);
};

// Controllers for Developer_home

const getAllDevelopers = async (req, res) => {
    // res.send('Get all developers');
    try {
        const result = await pool.query(
            'SELECT * FROM `developer_home`'
        );

        res.status(200).json({ status: true, data: result[0] });
    } catch {
        res.status(500).json({ status: false, error: 'An error occurred while fetching developers' });
    }
}

const getSingleDeveloper = async (req, res) => {
    // res.send('Get developer by id');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid developer ID' });
        }
        const result = await pool.execute(
            'SELECT * FROM `developer_home` WHERE Developer_ID = ?',
            [req.params.id]
        );

        if (result[0].length === 0) {
            return res.status(404).json({ status: false, error: 'Developer not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while fetching developer' });
    }
}

const createDeveloper = async (req, res) => {
    // res.send('Create new developer');
    try {
        if (!req.body.Establish_Date || !req.body.Developer_Home || !req.body.Developer_Name) {
            return res.status(400).json({ status: false, error: 'Missing required fields' });
        }
        
        const result = await pool.execute(
            'INSERT INTO `developer_home` (Establish_Date, Developer_Home, Developer_Name) VALUES (?, ?, ?)',
            [req.body.Establish_Date, req.body.Developer_Home, req.body.Developer_Name]
        );

        if (result[0].affectedRows === 0) {
            return res.status(400).json({ status: false, error: 'Developer already exists' });
        }

        res.status(201).json({ status: true, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while creating developer' });
    }
}

const updateDeveloper = async (req, res) => {
    // res.send('Update developer by id');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid developer ID' });
        }

        const result = await pool.execute(
            'UPDATE `developer_home` SET Establish_Date = ?, Developer_Home = ?, Developer_Name = ? WHERE Developer_ID = ?',
            [req.body.Establish_Date, req.body.Developer_Home, req.body.Developer_Name, req.params.id]
        );
        
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ status: false, error: 'Developer not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while updating developer' });
    }
}

const deleteDeveloper = async (req, res) => {
    // res.send('Delete developer by id');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid developer ID' });
        }

        const result = await pool.execute(
            'DELETE FROM `developer_home` WHERE Developer_ID = ?',
            [req.params.id]
        );

        if (result[0].affectedRows === 0) {
            return res.status(404).json({ status: false, error: 'Developer not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while deleting developer' });
    }
}

export { 
    getAllDevelopers,
    getSingleDeveloper,
    createDeveloper,
    updateDeveloper,
    deleteDeveloper
};