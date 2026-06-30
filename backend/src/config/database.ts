import mongoose from 'mongoose';
import { env } from './env';

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(env.mongodbUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}
