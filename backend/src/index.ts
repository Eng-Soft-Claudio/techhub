import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import categoryRoutes from './routes/categoryRoutes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/categories', categoryRoutes);

app.use((req, _res, next) => {
  console.log('🧾 Request body:', req.body);
  next();
});

app.get('/ping', (_req, res) => {
  res.send('🏓 Pong!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDatabase();
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

