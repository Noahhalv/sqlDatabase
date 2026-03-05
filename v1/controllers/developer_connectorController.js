import pool from '../data/db.js';

const isNumber = (value) => {
    return /^\d+$/.test(value);
};

// Controllers for Developed Games

const getAllDevelopedGames = async (req, res) => {
    // res.send('Get all games');
    try {
        const result = await pool.query(
            'SELECT * FROM `developed_games`'
        );

        res.status(200).json({ status: true, data: result[0] });
    } catch {
        res.status(500).json({ status: false, error: 'An error occurred while fetching developed games' });
    }
}

const getSingleDevelopedGame = async (req, res) => {
    // res.send('Get developed game by id');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid game ID' });
        }
        const result = await pool.execute(
            'SELECT * FROM `developed_games` WHERE Game_ID = ?',
            [req.body.Game_ID]
        );

        if (result[0].length === 0) {
            return res.status(404).json({ status: false, error: 'Developed game not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while fetching developed game' });
    }
}

const createDevelopedGame = async (req, res) => {
    // res.send('Create new developed game');
    try {
        if (!req.body.Title || !req.body.Price || !req.body.Release_Date) {
            return res.status(400).json({ status: false, error: 'Missing required fields' });
        }
        
        const result = await pool.execute(
            'INSERT INTO `developed_games` (Game_ID, Developer_ID) VALUES (?, ?)',
            [req.body.Game_ID, req.body.Developer_ID]
        );

        if (result[0].affectedRows === 0) {
            return res.status(400).json({ status: false, error: 'Developed game already exists' });
        }

        res.status(201).json({ status: true, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while creating the developed game' });
    }
}

const updateDevelopedGame = async (req, res) => {
    // res.send('Update developed game by ID');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid developed game or game ID' });
        }

        const result = await pool.execute(
            'UPDATE `developed_games` SET Game_ID = ?, Developer_ID = ? WHERE Game_ID = ?',
            [req.body.Game_ID, req.body.Developer_ID, req.params.id]
        );
        
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ status: false, error: 'Developed game not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while updating developed game' });
    }
}

const deleteDevelopedGame = async (req, res) => {
    // res.send('Delete developed game by ID');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid developed game or game ID' });
        }

        const result = await pool.execute(
            'DELETE FROM `developed_games` WHERE Game_ID = ? AND Developer_ID = ?',
            [req.body.Game_ID, req.body.Developer_ID]
        );

        if (result[0].affectedRows === 0) {
            return res.status(404).json({ status: false, error: 'Developed game not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while deleting developed game' });
    }
}

export { 
    getAllDevelopedGames,
    getSingleDevelopedGame,
    createDevelopedGame, 
    updateDevelopedGame,
    deleteDevelopedGame
};