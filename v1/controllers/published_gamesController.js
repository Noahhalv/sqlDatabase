import pool from '../data/db.js';

const isNumber = (value) => {
    return /^\d+$/.test(value);
};

// Controllers for Published Games

const getAllPublishedGames = async (req, res) => {
    // res.send('Get all games');
    try {
        const result = await pool.query(
            'SELECT * FROM `published_games`'
        );

        res.status(200).json({ status: true, data: result[0] });
    } catch {
        res.status(500).json({ status: false, error: 'An error occurred while fetching published games' });
    }
}

const getSinglePublishedGame = async (req, res) => {
    // res.send('Get published game by id');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid game ID' });
        }
        const result = await pool.execute(
            'SELECT * FROM `published_games` WHERE Game_ID = ?',
            [req.body.Game_ID],
            'SELECT * FROM `published_games` WHERE Publisher_ID = ?',
            [req.body.Publisher_ID]
        );

        if (result[0].length === 0) {
            return res.status(404).json({ status: false, error: 'Published game not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while fetching published game' });
    }
}

const createPublishedGame = async (req, res) => {
    // res.send('Create new published game');
    try {
        if (!req.body.Title || !req.body.Price || !req.body.Release_Date) {
            return res.status(400).json({ status: false, error: 'Missing required fields' });
        }
        
        const result = await pool.execute(
            'INSERT INTO `published_games` (Game_ID, Publisher_ID) VALUES (?, ?)',
            [req.body.Game_ID, req.body.Publisher_ID]
        );

        if (result[0].affectedRows === 0) {
            return res.status(400).json({ status: false, error: 'Published game already exists' });
        }

        res.status(201).json({ status: true, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while creating the published game' });
    }
}

const updatePublishedGame = async (req, res) => {
    // res.send('Update published game by ID');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid published game or game ID' });
        }

        const result = await pool.execute(
            'UPDATE `published_games` SET Game_ID = ?, Publisher_ID = ? WHERE Game_ID = ?',
            [req.body.Game_ID, req.body.Publisher_ID, req.params.id]
        );
        
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ status: false, error: 'Published game not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while updating published game' });
    }
}

const deletePublishedGame = async (req, res) => {
    // res.send('Delete published game by ID');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid published game or game ID' });
        }

        const result = await pool.execute(
            'DELETE FROM `published_games` WHERE Game_ID = ? AND Publisher_ID = ?',
            [req.body.Game_ID, req.body.Publisher_ID]
        );

        if (result[0].affectedRows === 0) {
            return res.status(404).json({ status: false, error: 'Published game not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while deleting published game' });
    }
}

export { 
    getAllPublishedGames,
    getSinglePublishedGame,
    createPublishedGame, 
    updatePublishedGame,
    deletePublishedGame
};