'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.DepartmentRoutes = void 0;
const express_1 = __importDefault(require('express'));
const department_controller_1 = require('./department.controller');
const validateRequestSchema_1 = require('../../middlewares/validateRequestSchema');
const department_validation_1 = require('./department.validation');
const router = express_1.default.Router();
router.post(
  '/',
  (0, validateRequestSchema_1.validateRequestSchema)(
    department_validation_1.DepartmentValidationSchema
      .createDepartmentValidationSchema,
  ),
  department_controller_1.DepartmentControllers.createDepartmentController,
);
router.get(
  '/',
  department_controller_1.DepartmentControllers.getAllDepartmentsController,
);
router.get(
  '/:id',
  department_controller_1.DepartmentControllers.getDepartmentController,
);
router.patch(
  '/:id',
  (0, validateRequestSchema_1.validateRequestSchema)(
    department_validation_1.DepartmentValidationSchema
      .updateDepartmentValidationSchema,
  ),
  department_controller_1.DepartmentControllers.updateDepartmentController,
);
router.delete(
  '/:id',
  department_controller_1.DepartmentControllers.deleteDepartmentController,
);
exports.DepartmentRoutes = router;
