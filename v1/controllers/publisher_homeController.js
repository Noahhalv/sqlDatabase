import pool from '../data/db.js';

const isNumber = (value) => {
    return /^\d+$/.test(value);
};

// Controllers for Publisher_home

const getAllPublishers = async (req, res) => {
    // res.send('Get all publishers');
    try {
        const result = await pool.query(
            'SELECT * FROM `publisher_home`'
        );

        res.status(200).json({ status: true, data: result[0] });
    } catch {
        res.status(500).json({ status: false, error: 'An error occurred while fetching publishers' });
    }
}

const getSinglePublisher = async (req, res) => {
    // res.send('Get publisher by id');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid publisher ID' });
        }
        const result = await pool.execute(
            'SELECT * FROM `publisher_home` WHERE Publisher_ID = ?',
            [req.params.id]
        );

        if (result[0].length === 0) {
            return res.status(404).json({ status: false, error: 'Publisher not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while fetching publisher' });
    }
}

const createPublisher = async (req, res) => {
    // res.send('Create new publisher');
    try {
        if (!req.body.Publisher_Name || !req.body.Establish_Date || !req.body.Publisher_Home) {
            return res.status(400).json({ status: false, error: 'Missing required fields' });
        }
        
        const result = await pool.execute(
            'INSERT INTO `publisher_home` (Establish_Date, Publisher_Home, Publisher_Name) VALUES (?, ?, ?)',
            [req.body.Establish_Date, req.body.Publisher_Home, req.body.Publisher_Name]
        );

        if (result[0].affectedRows === 0) {
            return res.status(400).json({ status: false, error: 'Publisher already exists' });
        }

        res.status(201).json({ status: true, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while creating publisher' });
    }
}

const updatePublisher = async (req, res) => {
    // res.send('Update publisher by id');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid publisher ID' });
        }

        const result = await pool.execute(
            'UPDATE `publisher_home` SET Publisher_Name = ?, Establish_Date = ?, Publisher_Home = ? WHERE Publisher_ID = ?',
            [req.body.Publisher_Name, req.body.Establish_Date, req.body.Publisher_Home, req.params.id]
        );
        
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ status: false, error: 'Publisher not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while updating publisher' });
    }
}

const deletePublisher = async (req, res) => {
    // res.send('Delete publisher by id');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid publisher ID' });
        }

        const result = await pool.execute(
            'DELETE FROM `publisher_home` WHERE Publisher_ID = ?',
            [req.params.id]
        );

        if (result[0].affectedRows === 0) {
            return res.status(404).json({ status: false, error: 'Publisher not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while deleting publisher' });
    }
}

export { 
    getAllPublishers,
    getSinglePublisher,
    createPublisher,
    updatePublisher,
    deletePublisher
};