import express from 'express';
import { AppDataSource } from './config/database';
import "reflect-metadata";
// import dotenv from 'dotenv';

const app = express()
app.use(express.json());
AppDataSource.initialize().then(() => {
    console.log('Database connected successfully!');
    app.listen(process.env.PORT, () => {
        console.log(`server start on port no ${process.env.PORT}`);
    });
}).catch((error) => console.error('Error connecting to database:', error));
