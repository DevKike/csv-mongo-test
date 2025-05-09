import { Request, Response, Router } from 'express';
import { userController } from '../controllers/userController';
import { upload } from '../../../config/multer/multerConfig';
import fs from 'fs';

export const userRouter = Router();

userRouter.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await userController.getAllUsers();

    res
      .status(200)
      .json({ message: 'Users were found with success!', data: users });
  } catch (error) {
    if (error instanceof Error && error.message === 'No users were found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json('Something went wrong!');
    }
  }
});

userRouter.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await userController.getUserById(req.params.id);

    res
      .status(200)
      .json({ message: 'User was found with success!', data: user });
  } catch (error) {
    if (error instanceof Error && error.message.includes('was not found')) {
      res.status(404).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json('Something went wrong!');
    }
  }
});

userRouter.post(
  '/users/by-csv',
  upload.single('csvFile'),
  async (req: Request, res: Response) => {
    try {
      await userController.saveAndGetUsers(req.file!.path);

      fs.unlinkSync(req.file!.path);

      res.status(201).json({ message: 'Users were created with success!' });
    } catch (error) {
      res.status(500).json('Something went wrong!');
    }
  }
);
