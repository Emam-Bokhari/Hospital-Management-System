import express from 'express';
import { DoctorControllers } from './doctor.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { DoctorValidationSchema } from './doctor.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.doctor, USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequestSchema(DoctorValidationSchema.createDoctorValidationSchema),
  DoctorControllers.createDoctorController,
);

router.get('/', DoctorControllers.getAllDoctorsController);

router.get('/:id', DoctorControllers.getDoctorController);

router.patch(
  '/:id',
  auth(USER_ROLE.doctor, USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequestSchema(DoctorValidationSchema.updateDoctorValidationSchema),
  DoctorControllers.updateDoctorController,
);

export const DoctorRoutes = router;
