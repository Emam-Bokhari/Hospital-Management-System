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
exports.TestBookingControllers = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = require("../../utils/sendResponse");
const testBooking_service_1 = require("./testBooking.service");
const createTestBookingController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const testBookingPayload = req.body;
    const createdTestBooking = yield testBooking_service_1.TestBookingServices.createTestBooking(testBookingPayload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Test booking created successfully',
        statusCode: 201,
        data: createdTestBooking,
    });
}));
const getAllTestBookingsController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const testBookings = yield testBooking_service_1.TestBookingServices.getAllTestBookings();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Test bookings retrieved successfully',
        statusCode: 200,
        data: testBookings,
    });
}));
const getTestBookingController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const testBooking = yield testBooking_service_1.TestBookingServices.getTestBookingById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Test booking retrieved successfully',
        statusCode: 200,
        data: testBooking,
    });
}));
const updateTestBookingStatusController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { status } = req.body;
    const updatedTestBookingStatus = yield testBooking_service_1.TestBookingServices.updateTestBookingStatusById(id, status);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Test booking status updated',
        statusCode: 200,
        data: updatedTestBookingStatus,
    });
}));
exports.TestBookingControllers = {
    createTestBookingController,
    getAllTestBookingsController,
    getTestBookingController,
    updateTestBookingStatusController,
};
