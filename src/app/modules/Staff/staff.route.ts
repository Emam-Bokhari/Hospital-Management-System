import express from 'express';
import { StaffControllers } from './staff.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { StaffValidationSchema } from './staff.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequestSchema(StaffValidationSchema.createStaffValidationSchema),
  StaffControllers.createStaffController,
);

router.get('/', auth(USER_ROLE.admin, USER_ROLE.superAdmin), StaffControllers.getAllStaffsController);

router.get('/:id', auth(USER_ROLE.admin, USER_ROLE.superAdmin), StaffControllers.getStaffController);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequestSchema(StaffValidationSchema.updateStaffValidationSchema),
  StaffControllers.updateStaffController,
);

router.delete('/:id', auth(USER_ROLE.admin, USER_ROLE.superAdmin), StaffControllers.deleteStaffController);

export const StaffRoutes = router;
