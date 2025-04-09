import express from 'express';
import { DeathRecordControllers } from './deathRecord.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { DeathRecordValidationSchema } from './deathRecord.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequestSchema(
    DeathRecordValidationSchema.createDeathRecordValidationSchema,
  ),
  DeathRecordControllers.createDeathRecordController,
);

router.get(
  '/',
  auth(USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin),
  DeathRecordControllers.getAllDeathRecordsController,
);

router.get(
  '/:id',
  auth(USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin),
  DeathRecordControllers.getDeathRecordController,
);

router.patch(
  '/:id',
  auth(USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequestSchema(
    DeathRecordValidationSchema.updateDeathRecordValidationSchema,
  ),
  DeathRecordControllers.updateDeathRecordController,
);

router.delete(
  '/:id',
  auth(USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin),
  DeathRecordControllers.deleteDeathRecordController,
);

export const DeathRecordRoutes = router;
