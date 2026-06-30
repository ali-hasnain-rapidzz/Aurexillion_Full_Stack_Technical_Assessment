import express, { Application } from 'express';
import cors from 'cors';
import apiRoutes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

export function createApp(): Application {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/health', (_req, res) => {
    res.status(200).json({ success: true, message: 'API is running' });
  });

  app.use('/api', apiRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
