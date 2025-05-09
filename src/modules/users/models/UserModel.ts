import { model, Schema } from 'mongoose';
import { IUserSchema } from './interfaces/IUser';

const userSchema = new Schema<IUserSchema>({
  name: String,
  age: Number,
  city: String,
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = model('User', userSchema);
