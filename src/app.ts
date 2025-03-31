import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata'; 
import express from 'express';
import { MikroORM } from '@mikro-orm/core';
import mikroConfig from './mikro-orm.config.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes for user and authentication
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Initialize MikroORM and start the server
async function main() {
  const orm = await MikroORM.init(mikroConfig);
  // Store ORM instance in the app locals to be used in controllers
  app.locals.orm = orm;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main().catch(err => console.error(err));
