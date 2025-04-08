import express from 'express';
import { DepartmentControllers } from './department.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { DepartmentValidationSchema } from './department.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequestSchema(
    DepartmentValidationSchema.createDepartmentValidationSchema,
  ),
  DepartmentControllers.createDepartmentController,
);

router.get('/', DepartmentControllers.getAllDepartmentsController);

router.get('/:id', DepartmentControllers.getDepartmentController);

router.delete('/:id', auth(USER_ROLE.admin, USER_ROLE.superAdmin), DepartmentControllers.deleteDepartmentController);

export const DepartmentRoutes = router;
