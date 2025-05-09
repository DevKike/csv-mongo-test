import mongoose from 'mongoose';
import { CONSTANT } from '../constants/Constant';

export const dbConfig = {
  connect: async () => {
    try {
      await mongoose.connect(CONSTANT.DB_URI!);
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection error:', error);
    }
  },
};
