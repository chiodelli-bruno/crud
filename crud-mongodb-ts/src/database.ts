import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/tienda');
    console.log('📦 Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error al conectar:', error);
  }
};
