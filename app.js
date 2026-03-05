import express from 'express';
import cors from 'cors';
import router from './v1/routes/gameRoutes.js';
import genreRouter from './v1/routes/genreRoutes.js';
import publisherHomeRouter from './v1/routes/publisher_homeRoutes.js';
import genreConnectorRouter from './v1/routes/genre_connectorRoutes.js';
import publishedGamesRouter from './v1/routes/published_gamesRoutes.js';
import developerHomeRouter from './v1/routes/developer_homeRoutes.js';
import developerConnectorRouter from './v1/routes/developer_connectorRoutes.js';
import reviewRouter from './v1/routes/reviewRoutes.js';
import userRouter from './v1/routes/userRoutes.js';
import authRouter from './v1/routes/authRoutes.js';
import dashboardRouter from './v1/routes/dashRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Define main routes
app.use('/api/v1/games', router);
app.use('/api/v1/genres', genreRouter);
app.use('/api/v1/publishers', publisherHomeRouter);
app.use('/api/v1/genre-connections', genreConnectorRouter);
app.use('/api/v1/published-games', publishedGamesRouter);
app.use('/api/v1/developers', developerHomeRouter);
app.use('/api/v1/developed-games', developerConnectorRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/dashboard', dashboardRouter);

// Routes

app.listen(3000, () => 
    console.log('Server is running on port 3000'),
    console.log('http://localhost:3000/api/v1/games'),
    console.log('http://localhost:3000/api/v1/genres'),
    console.log('http://localhost:3000/api/v1/publishers'),
    console.log('http://localhost:3000/api/v1/genre-connections'),
    console.log('http://localhost:3000/api/v1/published-games'),
    console.log('http://localhost:3000/api/v1/developers'),
    console.log('http://localhost:3000/api/v1/developed-games'),
    console.log('http://localhost:3000/api/v1/reviews'),
    console.log('http://localhost:3000/api/v1/users'),
);