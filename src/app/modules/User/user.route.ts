import express from 'express';
import { UserControllers } from './user.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { UserValidationSchema } from './user.validation';
import { USER_ROLE } from './user.constant';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth(USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin), UserControllers.getAllUsersController);

router.get('/:id', auth(USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin), UserControllers.getUserController);

router.patch(
  '/:id',
  validateRequestSchema(UserValidationSchema.updateUserValidationSchema),
  UserControllers.updateUserController,
);

router.delete('/:id', auth(USER_ROLE.admin, USER_ROLE.superAdmin), UserControllers.deleteUserController);

export const UserRoutes = router;
