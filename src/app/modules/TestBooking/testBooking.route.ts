import express from 'express';
import { TestBookingControllers } from './testBooking.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { TestBookingValidationSchema } from './testBooking.validation';
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
    TestBookingValidationSchema.createTestBookingValidationSchema,
  ),
  TestBookingControllers.createTestBookingController,
);

router.get(
  '/',
  auth(USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin),
  TestBookingControllers.getAllTestBookingsController,
);

router.get(
  '/:id',
  auth(USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin),
  TestBookingControllers.getTestBookingController,
);

router.patch(
  '/:id/status',
  auth(USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin),
  TestBookingControllers.updateTestBookingStatusByIdController,
);

export const TestBookingRoutes = router;
