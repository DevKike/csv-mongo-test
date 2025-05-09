export interface IUser {
  id: string;
  name: string;
  age: number;
  email: string;
  city: string;
  registeredAt: Date;
}

export interface IUserSchema extends Omit<IUser, 'id'> {}

export interface IUserSave extends Omit<IUser, 'id' | 'registeredAt'> {}
