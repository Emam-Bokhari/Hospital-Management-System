import express from 'express';
import { DepartmentControllers } from './department.controller';
import { validateRequestSchema } from '../../middlewares/validateRequestSchema';
import { DepartmentValidationSchema } from './department.validation';

const router = express.Router();

router.post(
  '/',
  validateRequestSchema(
    DepartmentValidationSchema.createDepartmentValidationSchema,
  ),
  DepartmentControllers.createDepartmentController,
);

router.get('/', DepartmentControllers.getAllDepartmentsController);

router.get('/:id', DepartmentControllers.getDepartmentController);

router.delete('/:id', DepartmentControllers.deleteDepartmentController);

export const DepartmentRoutes = router;
