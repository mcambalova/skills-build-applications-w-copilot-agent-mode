import express from 'express';
import { connectDatabase } from './config/database.js';
import { apiRouter } from './routes.js';

const app = express();
const port = 8000;

app.use(express.json());

app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

const baseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

app.listen(port, async () => {
  console.log(`OctoFit Tracker API listening at ${baseUrl}`);
  try {
    await connectDatabase();
  } catch (error) {
    console.error('Database unavailable; API will return 503 for data routes:', error);
  }
});