import express from 'express';
import { TestBookingControllers } from './testBooking.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { TestBookingValidationSchema } from './testBooking.validation';

const router = express.Router();

router.post('/', validateRequestSchema(TestBookingValidationSchema.createTestBookingValidationSchema), TestBookingControllers.createTestBookingController);

router.get('/', TestBookingControllers.getAllTestBookingsController);

router.get('/:id', TestBookingControllers.getTestBookingController);

router.patch(
  '/:id/status',
  TestBookingControllers.updateTestBookingStatusController,
);

export const TestBookingRoutes = router;
