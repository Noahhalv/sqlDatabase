import pool from '../data/db.js';

const isNumber = (value) => {
    return /^\d+$/.test(value);
};

// Controllers for Genres

const getAllGenres = async (req, res) => {
    // res.send('Get all genres');
    try {
        const result = await pool.query(
            'SELECT * FROM `genre`'
        );

        res.status(200).json({ status: true, data: result[0] });
    } catch {
        res.status(500).json({ status: false, error: 'An error occurred while fetching genres' });
    }
}

const getSingleGenre = async (req, res) => {
    // res.send('Get genre by id');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid genre ID' });
        }
        const result = await pool.execute(
            'SELECT * FROM `genre` WHERE Genre_ID = ?',
            [req.params.id]
        );

        if (result[0].length === 0) {
            return res.status(404).json({ status: false, error: 'Genre not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while fetching genre' });
    }
}

const createGenre = async (req, res) => {
    // res.send('Create new genre');
    try {
        if (!req.body.Genre) {
            return res.status(400).json({ status: false, error: 'Missing required fields' });
        }
        
        const result = await pool.execute(
            'INSERT INTO `genre` (Genre) VALUES (?)',
            [req.body.Genre]
        );

        if (result[0].affectedRows === 0) {
            return res.status(400).json({ status: false, error: 'Genre already exists' });
        }

        res.status(201).json({ status: true, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while creating genre' });
    }
}

const updateGenre = async (req, res) => {
    // res.send('Update genre by name');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid genre ID' });
        }

        const result = await pool.execute(
            'UPDATE `genre` SET Genre = ? WHERE Genre_ID = ?',
            [req.body.Genre, req.params.id]
        );
        
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ status: false, error: 'Genre not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while updating genre' });
    }
}

const deleteGenre = async (req, res) => {
    // res.send('Delete genre by name');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid genre ID' });
        }

        const result = await pool.execute(
            'DELETE FROM `genre` WHERE Genre_ID = ?',
            [req.params.id]
        );

        if (result[0].affectedRows === 0) {
            return res.status(404).json({ status: false, error: 'Genre not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while deleting genre' });
    }
}

export { 
    getAllGenres,
    getSingleGenre,
    createGenre,
    updateGenre,
    deleteGenre
};