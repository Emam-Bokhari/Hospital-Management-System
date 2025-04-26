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
exports.AdmissionBookingControllers = void 0;
const asyncHandler_1 = require("../../utils/global/asyncHandler");
const sendResponse_1 = require("../../utils/global/sendResponse");
const admissionBooking_service_1 = require("./admissionBooking.service");
const createAdmissionBookingController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admissionBookingPayload = req.body;
    const createdAdmissionBooking = yield admissionBooking_service_1.AdmissionBookingServices.createAdmissionBooking(admissionBookingPayload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Admission booking created successfully',
        statusCode: 201,
        data: createdAdmissionBooking,
    });
}));
const getAllAdmissionBookingsController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admissionBookings = yield admissionBooking_service_1.AdmissionBookingServices.getAllAdmissionBookings();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Admission booking retrieved successfully',
        statusCode: 200,
        data: admissionBookings,
    });
}));
const getAdmissionBookingByIdController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const admissionBooking = yield admissionBooking_service_1.AdmissionBookingServices.getAdmissionBookingById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Admission booking retrieved successfully',
        statusCode: 200,
        data: admissionBooking,
    });
}));
const updateAdmissionBookingStatusByIdController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { status } = req.body;
    const updatedAdmissionBookingStatus = yield admissionBooking_service_1.AdmissionBookingServices.updateAdmissionBookingStatusById(id, status);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Admission booking status updated',
        statusCode: 200,
        data: updatedAdmissionBookingStatus,
    });
}));
exports.AdmissionBookingControllers = {
    createAdmissionBookingController,
    getAllAdmissionBookingsController,
    getAdmissionBookingByIdController,
    updateAdmissionBookingStatusByIdController,
};
