import express from 'express';
import { StaffRoleControllers } from './staffRole.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { StaffRoleValidationSchema } from './staffRole.validation';

const router = express.Router();

router.post(
  '/',
  validateRequestSchema(
    StaffRoleValidationSchema.createStaffRoleValidationSchema,
  ),
  StaffRoleControllers.createStaffRoleController,
);

router.get('/', StaffRoleControllers.getAllStaffRolesController);

router.get('/:id', StaffRoleControllers.getStaffRoleController);

router.patch(
  '/:id',
  validateRequestSchema(
    StaffRoleValidationSchema.createStaffRoleValidationSchema,
  ),
  StaffRoleControllers.updateStaffRoleController,
);

router.delete('/:id', StaffRoleControllers.deleteStaffRoleController);

export const StaffRoleRoutes = router;
