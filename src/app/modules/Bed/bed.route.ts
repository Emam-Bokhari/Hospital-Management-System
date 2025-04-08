import express from 'express';
import { BedControllers } from './bed.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post('/', auth(USER_ROLE.admin, USER_ROLE.superAdmin), BedControllers.createBedController);

router.get('/', auth(USER_ROLE.user, USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin), BedControllers.getAllBedsController);

router.get('/:id', auth(USER_ROLE.user, USER_ROLE.receptionist, USER_ROLE.admin, USER_ROLE.superAdmin), BedControllers.getBedController);

router.patch('/:id', auth(USER_ROLE.admin, USER_ROLE.superAdmin), BedControllers.updateBedController);

router.patch(
  '/:id/status',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  BedControllers.updateBedAvailabilityStatusController,
);

router.delete('/:id', auth(USER_ROLE.admin, USER_ROLE.superAdmin), BedControllers.deleteBedController);

export const BedRoutes = router;
