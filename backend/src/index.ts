import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db';
import formEntryRoutes from './routes/formEntry.routes';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/entries', formEntryRoutes);

// serve frontend build in production
// __dirname is available natively in CommonJS - no override needed
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/dist/index.html'));
  });
}

app.get('/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
