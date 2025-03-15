"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentBookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const appointmentBooking_controller_1 = require("./appointmentBooking.controller");
const validateRequestSchema_1 = require("../../middlewares/validateRequestSchema");
const appointmentBooking_validation_1 = require("./appointmentBooking.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequestSchema_1.validateRequestSchema)(appointmentBooking_validation_1.AppointmentBookingValidationSchema.createAppointmentBookingValidationSchema), appointmentBooking_controller_1.AppointmentBookingControllers.createAppointmentBookingController);
router.get('/', appointmentBooking_controller_1.AppointmentBookingControllers.getAllAppointmentBookingsController);
router.get('/:id', appointmentBooking_controller_1.AppointmentBookingControllers.getAppointmentBookingController);
router.patch('/:id/status', appointmentBooking_controller_1.AppointmentBookingControllers.updateAppointmentBookingStatusController);
exports.AppointmentBookingRoutes = router;
