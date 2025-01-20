'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.StaffRoutes = void 0;
const express_1 = __importDefault(require('express'));
const staff_controller_1 = require('./staff.controller');
const validateRequestSchema_1 = require('../../middlewares/validateRequestSchema');
const staff_validation_1 = require('./staff.validation');
const router = express_1.default.Router();
router.post(
  '/',
  (0, validateRequestSchema_1.validateRequestSchema)(
    staff_validation_1.StaffValidationSchema.createStaffValidationSchema,
  ),
  staff_controller_1.StaffControllers.createStaffController,
);
router.get('/', staff_controller_1.StaffControllers.getAllStaffsController);
router.get('/:id', staff_controller_1.StaffControllers.getStaffController);
router.patch(
  '/:id',
  (0, validateRequestSchema_1.validateRequestSchema)(
    staff_validation_1.StaffValidationSchema.updateStaffValidationSchema,
  ),
  staff_controller_1.StaffControllers.updateStaffController,
);
router.delete(
  '/:id',
  staff_controller_1.StaffControllers.deleteStaffController,
);
exports.StaffRoutes = router;
