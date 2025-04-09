import express from 'express';
import { BirthRecordControllers } from './birthRecord.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin),
  BirthRecordControllers.createBirthRecordController,
);

router.get(
  '/',
  auth(USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin),
  BirthRecordControllers.getAllBirthRecordsController,
);

router.get(
  '/:id',
  auth(USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin),
  BirthRecordControllers.getBirthRecordController,
);

router.patch(
  '/:id',
  auth(USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin),
  BirthRecordControllers.updateBirthRecordController,
);

router.delete(
  '/:id',
  auth(USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin),
  BirthRecordControllers.deleteBirthRecordController,
);

export const BirthRecordRoutes = router;
