import express from 'express';
import { StaffControllers } from './staff.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { StaffValidationSchema } from './staff.validation';

const router = express.Router();

router.post(
  '/',
  validateRequestSchema(StaffValidationSchema.createStaffValidationSchema),
  StaffControllers.createStaffController,
);

router.get('/', StaffControllers.getAllStaffsController);

router.get('/:id', StaffControllers.getStaffController);

router.patch(
  '/:id',
  validateRequestSchema(StaffValidationSchema.updateStaffValidationSchema),
  StaffControllers.updateStaffController,
);

router.delete('/:id', StaffControllers.deleteStaffController);

export const StaffRoutes = router;
