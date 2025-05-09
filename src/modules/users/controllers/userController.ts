import fs from 'fs';
import csv from 'csv-parser';
import { IUser, IUserSave } from '../models/interfaces/IUser';
import { userService } from '../services/userService';
import { ICsvUser } from '../models/interfaces/ICsvUser';

export const userController = {
  async getAllUsers(): Promise<IUser[]> {
    const users = await userService.getAll();

    if (users.length === 0) throw new Error('No users were found');

    return users;
  },

  async getUserById(id: IUser['id']): Promise<IUser> {
    const user = await userService.getById(id);

    if (!user) throw new Error(`User with ID: ${id} was not found`);

    return user;
  },

  async saveAndGetUsers(filePath: string): Promise<IUser[]> {
    return new Promise((resolve, reject) => {
      const results: ICsvUser[] = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          try {
            const transformedData: IUserSave[] = results.map((item) => {
              return {
                name: item.Name,
                age: item.Age,
                email: item.Email,
                city: item.City,
              };
            });

            await userService.saveMany(transformedData);
            const users = await userService.getAll();

            resolve(users);
          } catch (error) {
            reject(error);
          }
        });
    });
  },
};
