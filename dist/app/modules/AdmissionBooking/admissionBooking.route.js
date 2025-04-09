'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AdmissionBookingRoutes = void 0;
const express_1 = __importDefault(require('express'));
const admissionBooking_controller_1 = require('./admissionBooking.controller');
const validateRequestSchema_1 = require('../../middlewares/validateRequestSchema');
const admissionBooking_validation_1 = require('./admissionBooking.validation');
const router = express_1.default.Router();
router.post(
  '/',
  (0, validateRequestSchema_1.validateRequestSchema)(
    admissionBooking_validation_1.AdmissionBookingValidationSchema
      .createAdmissionBookingValidationSchema,
  ),
  admissionBooking_controller_1.AdmissionBookingControllers
    .createAdmissionBookingController,
);
router.get(
  '/',
  admissionBooking_controller_1.AdmissionBookingControllers
    .getAllAdmissionBookingsController,
);
router.get(
  '/:id',
  admissionBooking_controller_1.AdmissionBookingControllers
    .getAdmissionBookingByIdController,
);
router.patch(
  '/:id/status',
  admissionBooking_controller_1.AdmissionBookingControllers
    .updateAdmissionBookingStatusByIdController,
);
exports.AdmissionBookingRoutes = router;
