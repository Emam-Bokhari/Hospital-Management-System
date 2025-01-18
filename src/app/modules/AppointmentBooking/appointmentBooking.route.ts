import express from 'express';
import { AppointmentBookingControllers } from './appointmentBooking.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { AppointmentBookingValidationSchema } from './appointmentBooking.validation';

const router = express.Router();

router.post(
  '/',
  validateRequestSchema(
    AppointmentBookingValidationSchema.createAppointmentBookingValidationSchema,
  ),
  AppointmentBookingControllers.createAppointmentBookingController,
);

router.get(
  '/',
  AppointmentBookingControllers.getAllAppointmentBookingsController,
);

router.get(
  '/:id',
  AppointmentBookingControllers.getAppointmentBookingController,
);

router.patch(
  '/:id/status',
  AppointmentBookingControllers.updateAppointmentBookingStatusController,
);

export const AppointmentBookingRoutes = router;
