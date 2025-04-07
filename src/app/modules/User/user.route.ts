import express from 'express';
import { UserControllers } from './user.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { UserValidationSchema } from './user.validation';

const router = express.Router();

router.get('/', UserControllers.getAllUsersController);

router.get('/:id', UserControllers.getUserController);

router.patch(
  '/:id',
  validateRequestSchema(UserValidationSchema.updateUserValidationSchema),
  UserControllers.updateUserController,
);

router.delete('/:id', UserControllers.deleteUserController);

export const UserRoutes = router;
