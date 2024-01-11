import { createContext } from 'react';
import pool from '../config/db'; // Import the database connection

const middleware = async (req, res, next) => {
  req.db = pool;
  return next();
};

export const databaseContext = createContext();

export default middleware;
