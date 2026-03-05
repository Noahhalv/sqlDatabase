import pool from '../data/db.js';

const isNumber = (value) => {
    return /^\d+$/.test(value);
};

// Controllers for genre_connector

const getAllGenreConnections = async (req, res) => {
    // res.send('Get all genre connections');
    try {
        const result = await pool.query(
            'SELECT * FROM `genre_controller`'
        );

        res.status(200).json({ status: true, data: result[0] });
    } catch {
        res.status(500).json({ status: false, error: 'An error occurred while fetching genre connections' });
    }
}

const getSingleGenreConnection = async (req, res) => {
    // res.send('Get genre connection by id');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid genre connection ID' });
        }
        const result = await pool.execute(
            'SELECt * FROM `genre_controller` WHERE Game_ID = ?',
            [req.body.Game_ID],
            'SELECT * FROM `genre_controller` WHERE Genre_ID = ?',
            [req.body.Genre_ID]
        );

        if (result[0].length === 0) {
            return res.status(404).json({ status: false, error: 'Genre connection not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while fetching genre connection' });
    }
}

const createGenreConnection = async (req, res) => {
    // res.send('Create new genre connection');
    try {
        if (!req.body.Game_ID || !req.body.Genre_ID) {
            return res.status(400).json({ status: false, error: 'Missing required fields' });
        }
        
        const result = await pool.execute(
            'INSERT INTO `genre_controller` (Game_ID, Genre_ID) VALUES (?, ?)',
            [req.body.Game_ID, req.body.Genre_ID]
        );

        if (result[0].affectedRows === 0) {
            return res.status(400).json({ status: false, error: 'Genre connection already exists' });
        }

        res.status(201).json({ status: true, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while creating genre connection' });
    }
}

const updateGenreConnection = async (req, res) => {
    // res.send('Update genre connection by ID');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid genre connection ID' });
        }

        const result = await pool.execute(
            'UPDATE `genre_controller` SET Game_ID = ?, Genre_ID = ? WHERE Game_ID = ? AND Genre_ID = ?',
            [req.body.New_Game_ID, req.body.New_Genre_ID, req.body.Game_ID, req.body.Genre_ID]
        );
        
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ status: false, error: 'Genre connection not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while updating genre connection' });
    }
}

const deleteGenreConnection = async (req, res) => {
    // res.send('Delete genre connection by ID');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid genre connection ID' });
        }

        const result = await pool.execute(
            'DELETE FROM `genre_controller` WHERE Game_ID = ? AND Genre_ID = ?',
            [req.body.Game_ID, req.body.Genre_ID]
        );

        if (result[0].affectedRows === 0) {
            return res.status(404).json({ status: false, error: 'Genre connection not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while deleting genre connection' });
    }
}

export { 
    getAllGenreConnections,
    getSingleGenreConnection,
    createGenreConnection, 
    updateGenreConnection,
    deleteGenreConnection
};