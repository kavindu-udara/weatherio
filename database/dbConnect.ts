import mongoose from 'mongoose';

interface Connection {
  isConnected?: number;
}

const connection: Connection = {}; 

export async function dbConnect(): Promise<void> {
  
  if (connection.isConnected) {
    console.log('Using existing database connection');
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }
  
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);

    connection.isConnected = db.connections[0].readyState;

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error; 
  }
}
