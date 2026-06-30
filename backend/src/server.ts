import { createApp } from './app';
import { connectDatabase } from './config/database';
import { env } from './config/env';

async function startServer(): Promise<void> {
  try {
    await connectDatabase();

    const app = createApp();

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
