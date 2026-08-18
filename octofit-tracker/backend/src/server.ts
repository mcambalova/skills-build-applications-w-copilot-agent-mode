import express from 'express';
import { connectDatabase } from './config/database.js';
import { apiRouter } from './routes.js';

const app = express();
const port = 8000;
const host = '0.0.0.0';

app.use(express.json());

app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.listen(port, host, async () => {
  console.log(`OctoFit Tracker API listening at ${baseUrl}`);
  try {
    await connectDatabase();
  } catch (error) {
    console.error('Database unavailable; API will return 503 for data routes:', error);
  }
});