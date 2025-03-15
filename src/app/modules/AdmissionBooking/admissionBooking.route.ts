import express from 'express';
import { AdmissionBookingControllers } from './admissionBooking.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { AdmissionBookingValidationSchema } from './admissionBooking.validation';

const router = express.Router();

router.post(
  '/',
  validateRequestSchema(
    AdmissionBookingValidationSchema.createAdmissionBookingValidationSchema,
  ),
  AdmissionBookingControllers.createAdmissionBookingController,
);

router.get('/', AdmissionBookingControllers.getAllAdmissionBookingsController);

router.get(
  '/:id',
  AdmissionBookingControllers.getAdmissionBookingByIdController,
);

router.patch(
  '/:id/status',
  AdmissionBookingControllers.updateAdmissionBookingStatusByIdController,
);

export const AdmissionBookingRoutes = router;
