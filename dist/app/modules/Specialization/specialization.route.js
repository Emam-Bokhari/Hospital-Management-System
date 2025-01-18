'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.SpecializationRoutes = void 0;
const express_1 = __importDefault(require('express'));
const specialization_controller_1 = require('./specialization.controller');
const validateRequestSchema_1 = require('../../middlewares/validateRequestSchema');
const specialization_validation_1 = require('./specialization.validation');
const router = express_1.default.Router();
router.post(
  '/',
  (0, validateRequestSchema_1.validateRequestSchema)(
    specialization_validation_1.SpecializationValidationSchema,
  ),
  specialization_controller_1.SpecializationControllers
    .createSpecializationController,
);
router.get(
  '/',
  specialization_controller_1.SpecializationControllers
    .getAllSpecializationsController,
);
router.get(
  '/:id',
  specialization_controller_1.SpecializationControllers
    .getSpecializationController,
);
router.patch(
  '/:id',
  (0, validateRequestSchema_1.validateRequestSchema)(
    specialization_validation_1.SpecializationValidationSchema,
  ),
  specialization_controller_1.SpecializationControllers
    .updateSpecializationController,
);
router.delete(
  '/:id',
  specialization_controller_1.SpecializationControllers
    .deleteSpecializationController,
);
exports.SpecializationRoutes = router;
