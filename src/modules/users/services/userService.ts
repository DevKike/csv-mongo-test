import { IUser, IUserSave } from '../models/interfaces/IUser';
import { UserModel } from '../models/UserModel';

export const userService = {
  async getAll(): Promise<IUser[]> {
    const dbUsers = await UserModel.find().lean();

    return dbUsers.map(cleanMongooseDocument);
  },

  async getById(id: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findById(id).lean();
      if (!user) return null;
      return cleanMongooseDocument(user);
    } catch {
      return null;
    }
  },

  async saveMany(data: IUserSave[]): Promise<void> {
    await UserModel.insertMany(data);
  },
};

const cleanMongooseDocument = (doc: any): IUser => {
  const { _id, __v, ...userFields } = doc;

  return {
    id: _id.toString(),
    ...userFields,
  };
};
