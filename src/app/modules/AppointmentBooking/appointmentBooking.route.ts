import express from 'express';
import { AppointmentBookingControllers } from './appointmentBooking.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { AppointmentBookingValidationSchema } from './appointmentBooking.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequestSchema(
    AppointmentBookingValidationSchema.createAppointmentBookingValidationSchema,
  ),
  AppointmentBookingControllers.createAppointmentBookingController,
);

router.get(
  '/',
  auth(USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin),
  AppointmentBookingControllers.getAllAppointmentBookingsController,
);

router.get(
  '/:id',
  auth(USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin),
  AppointmentBookingControllers.getAppointmentBookingController,
);

router.patch(
  '/:id/status',
  auth(USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin),
  AppointmentBookingControllers.updateAppointmentBookingStatusController,
);

export const AppointmentBookingRoutes = router;
