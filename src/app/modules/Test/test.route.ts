import express from 'express';
import { TestControllers } from './test.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { TestValidationSchema } from './test.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequestSchema(TestValidationSchema.createTestValidationSchema),
  TestControllers.createTestController,
);

router.get('/', TestControllers.getAllTestsController);

router.get('/:id', TestControllers.getTestController);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequestSchema(TestValidationSchema.updateTestValidationSchema),
  TestControllers.updateTestController,
);

router.patch(
  '/:id/availability',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequestSchema(
    TestValidationSchema.testAvailabilityUpdateValidationSchema,
  ),
  TestControllers.updateTestAvailabilityController,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  TestControllers.deleteTestController,
);

export const TestRoutes = router;
