import pool from '../data/db.js';

const isNumber = (value) => {
    return /^\d+$/.test(value);
};

// Controllers for Games

const getAllGames = async (req, res) => {
    // res.send('Get all games');
    try {
        const result = await pool.query(
            'SELECT * FROM `game`'
        );

        res.status(200).json({ status: true, data: result[0] });
    } catch {
        res.status(500).json({ status: false, error: 'An error occurred while fetching games' });
    }
}

const getSingleGame = async (req, res) => {
    // res.send('Get game by id');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid game ID' });
        }
        const result = await pool.execute(
            'SELECT * FROM `game` WHERE Game_ID = ?',
            [req.params.id]
        );

        if (result[0].length === 0) {
            return res.status(404).json({ status: false, error: 'Game not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while fetching game' });
    }
}

const createGame = async (req, res) => {
    // res.send('Create new game');
    try {
        if (!req.body.Title || !req.body.Price || !req.body.Release_Date) {
            return res.status(400).json({ status: false, error: 'Missing required fields' });
        }
        
        const result = await pool.execute(
            'INSERT INTO `game` (Title, Price, Release_Date) VALUES (?, ?, ?)',
            [req.body.Title, req.body.Price, req.body.Release_Date]
        );

        if (result[0].affectedRows === 0) {
            return res.status(400).json({ status: false, error: 'Game already exists' });
        }

        res.status(201).json({ status: true, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while creating game' });
    }
}

const updateGame = async (req, res) => {
    // res.send('Update game by name');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid game ID' });
        }

        const result = await pool.execute(
            'UPDATE `game` SET Title = ?, Price = ?, Release_Date = ? WHERE Game_ID = ?',
            [req.body.Title, req.body.Price, req.body.Release_Date, req.params.id]
        );
        
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ status: false, error: 'Game not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while updating game' });
    }
}

const deleteGame = async (req, res) => {
    // res.send('Delete game by name');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid game ID' });
        }

        const result = await pool.execute(
            'DELETE FROM `game` WHERE Game_ID = ?',
            [req.params.id]
        );

        if (result[0].affectedRows === 0) {
            return res.status(404).json({ status: false, error: 'Game not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while deleting game' });
    }
}

export { 
    getAllGames,
    getSingleGame,
    createGame, 
    updateGame,
    deleteGame
};