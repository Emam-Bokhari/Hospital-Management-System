import express from 'express';
import { TestBookingControllers } from './testBooking.controller';

const router = express.Router();

router.post('/', TestBookingControllers.createTestBookingController);

router.get('/', TestBookingControllers.getAllTestBookingsController);

router.get('/:id', TestBookingControllers.getTestBookingController);

router.patch(
  '/:id/status',
  TestBookingControllers.updateTestBookingStatusController,
);

export const TestBookingRoutes = router;
