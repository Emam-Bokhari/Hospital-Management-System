"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestBookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const testBooking_controller_1 = require("./testBooking.controller");
const validateRequestSchema_1 = require("../../middlewares/validateRequestSchema");
const testBooking_validation_1 = require("./testBooking.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequestSchema_1.validateRequestSchema)(testBooking_validation_1.TestBookingValidationSchema.createTestBookingValidationSchema), testBooking_controller_1.TestBookingControllers.createTestBookingController);
router.get('/', testBooking_controller_1.TestBookingControllers.getAllTestBookingsController);
router.get('/:id', testBooking_controller_1.TestBookingControllers.getTestBookingController);
router.patch('/:id/status', testBooking_controller_1.TestBookingControllers.updateTestBookingStatusByIdController);
exports.TestBookingRoutes = router;
