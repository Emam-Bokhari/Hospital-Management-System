import express from 'express';
import { TestControllers } from './test.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { TestValidationSchema } from './test.validation';

const router = express.Router();

router.post(
  '/',
  validateRequestSchema(TestValidationSchema.createTestValidationSchema),
  TestControllers.createTestController,
);

router.get('/', TestControllers.getAllTestsController);

router.get('/:id', TestControllers.getTestController);

router.patch(
  '/:id',
  validateRequestSchema(TestValidationSchema.updateTestValidationSchema),
  TestControllers.updateTestController,
);

router.patch(
  '/:id/availability',
  validateRequestSchema(
    TestValidationSchema.testAvailabilityUpdateValidationSchema,
  ),
  TestControllers.updateTestAvailabilityController,
);

router.delete('/:id', TestControllers.deleteTestController);

export const TestRoutes = router;
