'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.DoctorRoutes = void 0;
const express_1 = __importDefault(require('express'));
const doctor_controller_1 = require('./doctor.controller');
const validateRequestSchema_1 = require('../../middlewares/validateRequestSchema');
const doctor_validation_1 = require('./doctor.validation');
const router = express_1.default.Router();
router.post(
  '/',
  (0, validateRequestSchema_1.validateRequestSchema)(
    doctor_validation_1.DoctorValidationSchema.createDoctorValidationSchema,
  ),
  doctor_controller_1.DoctorControllers.createDoctorController,
);
router.get('/', doctor_controller_1.DoctorControllers.getAllDoctorsController);
router.get('/:id', doctor_controller_1.DoctorControllers.getDoctorController);
router.patch(
  '/:id',
  (0, validateRequestSchema_1.validateRequestSchema)(
    doctor_validation_1.DoctorValidationSchema.updateDoctorValidationSchema,
  ),
  doctor_controller_1.DoctorControllers.updateDoctorController,
);
exports.DoctorRoutes = router;
