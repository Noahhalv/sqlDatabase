import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

let pool;

try {
    pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'gamesdb',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
} catch (error) {
    console.error('Failed to create database connection pool:', error);
    process.exit(1); // Exit the application if the database connection fails
}

export default pool;