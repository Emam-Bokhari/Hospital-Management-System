import express from 'express';
import { AdmissionBookingControllers } from './admissionBooking.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { AdmissionBookingValidationSchema } from './admissionBooking.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(
    USER_ROLE.user,
    USER_ROLE.receptionist,
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
  ),
  validateRequestSchema(
    AdmissionBookingValidationSchema.createAdmissionBookingValidationSchema,
  ),
  AdmissionBookingControllers.createAdmissionBookingController,
);

router.get(
  '/',
  auth(
    USER_ROLE.receptionist,
    USER_ROLE.financeManager,
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
  ),
  AdmissionBookingControllers.getAllAdmissionBookingsController,
);

router.get(
  '/:id',
  auth(
    USER_ROLE.receptionist,
    USER_ROLE.financeManager,
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
  ),
  AdmissionBookingControllers.getAdmissionBookingByIdController,
);

router.patch(
  '/:id/status',
  auth(USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin),
  AdmissionBookingControllers.updateAdmissionBookingStatusByIdController,
);

export const AdmissionBookingRoutes = router;
