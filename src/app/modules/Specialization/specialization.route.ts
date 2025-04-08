import express from 'express';
import { SpecializationControllers } from './specialization.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { SpecializationValidationSchema } from './specialization.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequestSchema(
    SpecializationValidationSchema.createSpecializationValidationSchema,
  ),
  SpecializationControllers.createSpecializationController,
);

router.get('/', SpecializationControllers.getAllSpecializationsController);

router.get('/:id', SpecializationControllers.getSpecializationController);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequestSchema(
    SpecializationValidationSchema.createSpecializationValidationSchema,
  ),
  SpecializationControllers.updateSpecializationController,
);

router.delete('/:id', auth(USER_ROLE.admin, USER_ROLE.superAdmin), SpecializationControllers.deleteSpecializationController);

export const SpecializationRoutes = router;
