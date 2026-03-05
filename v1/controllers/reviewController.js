import pool from '../data/db.js';

const isNumber = (value) => {
    return /^\d+$/.test(value);
};

// Controllers for Reviews

const getAllReviews = async (req, res) => {
    // res.send('Get all reviews');
    try {
        const result = await pool.query(
            'SELECT * FROM `review_controller`'
        );

        res.status(200).json({ status: true, data: result[0] });
    } catch {
        res.status(500).json({ status: false, error: 'An error occurred while fetching reviews' });
    }
}

const getSingleReview = async (req, res) => {
    // res.send('Get review by id');
    try {
        let result;
        if (req.body.Game_ID && !req.body.User_ID) {
            result = await pool.execute(
                'SELECT * FROM `review_controller` WHERE Game_ID = ?',
                [req.body.Game_ID]
            );
        } else if (req.body.User_ID && !req.body.Game_ID) {
            result = await pool.execute(
                'SELECT * FROM `review_controller` WHERE User_ID = ?',
                [req.body.User_ID]
            );
        } else if (req.body.Game_ID && req.body.User_ID) {    
            result = await pool.execute(
                'SELECT * FROM `review_controller` WHERE Game_ID = ? AND User_ID = ?',
                [req.body.Game_ID, req.body.User_ID]
            );
        } else {
            return res.status(400).json({ status: false, error: 'Invalid game or user ID' });
        }

        if (result[0].length === 0) {
            return res.status(404).json({ status: false, error: 'Review not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while fetching review' });
    }
}

const createReview = async (req, res) => {
    // res.send('Create new review');
    try {
        if (!req.body.Game_ID || !req.body.User_ID || !req.body.Rating) {
            return res.status(400).json({ status: false, error: 'Missing required fields' });
        }

        if (!req.body.Comment) {
            req.body.Comment = null;
        }
        
        const result = await pool.execute(
            'INSERT INTO `review_controller` (Game_ID, User_ID, Rating, Comment, DateReviewed) VALUES (?, ?, ?, ?, CURDATE()+0)',
            [req.body.Game_ID, req.body.User_ID, req.body.Rating, req.body.Comment]
        );

        if (result[0].affectedRows === 0) {
            return res.status(400).json({ status: false, error: 'Review already exists' });
        }

        res.status(201).json({ status: true, data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while creating the review' });
    }
}

const updateReview = async (req, res) => {
    // res.send('Update review by ID');
    try {
        if (!isNumber(req.body.Game_ID) || !isNumber(req.body.User_ID)) {
            return res.status(400).json({ status: false, error: 'Invalid Game or User ID' });
        }

        const result = await pool.execute(
            'UPDATE `review_controller` SET Game_ID = ?, User_ID = ?, Rating = ?, Comment = ? WHERE Game_ID = ? AND User_ID = ?',
            [req.body.Game_ID, req.body.User_ID, req.body.Rating, req.body.Comment, req.body.Old_Game_ID, req.body.Old_User_ID]
        );
        
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ status: false, error: 'Review not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while updating review' });
    }
}

const deleteReview = async (req, res) => {
    // res.send('Delete review by ID');
    try {
        if (!isNumber(req.params.id)) {
            return res.status(400).json({ status: false, error: 'Invalid review or game ID' });
        }

        const result = await pool.execute(
            'DELETE FROM `review_controller` WHERE Game_ID = ? AND User_ID = ?',
            [req.body.Game_ID, req.body.User_ID]
        );

        if (result[0].affectedRows === 0) {
            return res.status(404).json({ status: false, error: 'Review not found' });
        }

        res.status(200).json({ status: true, data: result[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, error: 'An error occurred while deleting review' });
    }
}

export { 
    getAllReviews,
    getSingleReview,
    createReview, 
    updateReview,
    deleteReview
};