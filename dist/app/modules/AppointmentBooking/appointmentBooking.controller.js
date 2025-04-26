"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentBookingControllers = void 0;
const asyncHandler_1 = require("../../utils/global/asyncHandler");
const sendResponse_1 = require("../../utils/global/sendResponse");
const appointmentBooking_service_1 = require("./appointmentBooking.service");
const createAppointmentBookingController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentBookingPayload = req.body;
    const createdAppointmentBooking = yield appointmentBooking_service_1.AppointmentBookingServices.createAppointmentBooking(appointmentBookingPayload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Appointment booking created successfully',
        statusCode: 201,
        data: createdAppointmentBooking,
    });
}));
const getAllAppointmentBookingsController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentBookings = yield appointmentBooking_service_1.AppointmentBookingServices.getAllAppointmentBookings();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Appointment bookings retrieved successfully',
        statusCode: 200,
        data: appointmentBookings,
    });
}));
const getAppointmentBookingController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const appointmentBooking = yield appointmentBooking_service_1.AppointmentBookingServices.getAppointmentBookingById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Appointment booking retrieved successfully',
        statusCode: 200,
        data: appointmentBooking,
    });
}));
const updateAppointmentBookingStatusController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { status } = req.body;
    const updatedAppointmentBookingStatus = yield appointmentBooking_service_1.AppointmentBookingServices.updateAppointmentBookingStatusById(id, status);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Appointment booking status updated successfully',
        statusCode: 200,
        data: updatedAppointmentBookingStatus,
    });
}));
exports.AppointmentBookingControllers = {
    createAppointmentBookingController,
    getAllAppointmentBookingsController,
    getAppointmentBookingController,
    updateAppointmentBookingStatusController,
};
