import express from 'express';
import { StaffRoleControllers } from './staffRole.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { StaffRoleValidationSchema } from './staffRole.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequestSchema(
    StaffRoleValidationSchema.createStaffRoleValidationSchema,
  ),
  StaffRoleControllers.createStaffRoleController,
);

router.get('/', auth(USER_ROLE.admin, USER_ROLE.superAdmin), StaffRoleControllers.getAllStaffRolesController);

router.get('/:id', auth(USER_ROLE.admin, USER_ROLE.superAdmin), StaffRoleControllers.getStaffRoleController);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequestSchema(
    StaffRoleValidationSchema.createStaffRoleValidationSchema,
  ),
  StaffRoleControllers.updateStaffRoleController,
);

router.delete('/:id', auth(USER_ROLE.admin, USER_ROLE.superAdmin), StaffRoleControllers.deleteStaffRoleController);

export const StaffRoleRoutes = router;
