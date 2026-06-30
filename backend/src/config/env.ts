import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
dotenv.config();

interface EnvConfig {
  port: number;
  mongodbUri: string;
  nodeEnv: string;
}

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env: EnvConfig = {
  port: parseInt(getEnvVar('PORT', '5000'), 10),
  mongodbUri: getEnvVar(
    'MONGODB_URI',
    'mongodb://localhost:27017/support_ticket_dashboard',
  ),
  nodeEnv: getEnvVar('NODE_ENV', 'development'),
};
