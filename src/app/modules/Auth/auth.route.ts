import express from 'express';
import { AuthControllers } from './auth.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { AuthValidationSchema } from './auth.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequestSchema(AuthValidationSchema.registerValidationSchema),
  AuthControllers.registerUserController,
);

router.post('/login', AuthControllers.loginUserController);

export const AuthRoutes = router;
