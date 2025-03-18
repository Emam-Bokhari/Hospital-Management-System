import express from 'express';
import { DeathRecordControllers } from './deathRecord.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { DeathRecordValidationSchema } from './deathRecord.validation';

const router = express.Router();

router.post(
  '/',
  validateRequestSchema(
    DeathRecordValidationSchema.createDeathRecordValidationSchema,
  ),
  DeathRecordControllers.createDeathRecordController,
);

router.get('/', DeathRecordControllers.getAllDeathRecordsController);

router.get('/:id', DeathRecordControllers.getDeathRecordController);

router.patch(
  '/:id',
  validateRequestSchema(
    DeathRecordValidationSchema.updateDeathRecordValidationSchema,
  ),
  DeathRecordControllers.updateDeathRecordController,
);

router.delete('/:id', DeathRecordControllers.deleteDeathRecordController);

export const DeathRecordRoutes = router;

