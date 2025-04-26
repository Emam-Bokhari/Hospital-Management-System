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
exports.BedControllers = void 0;
const asyncHandler_1 = require("../../utils/global/asyncHandler");
const sendResponse_1 = require("../../utils/global/sendResponse");
const bed_service_1 = require("./bed.service");
const createBedController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bedPayload = req.body;
    const createdBed = yield bed_service_1.BedServices.createBed(bedPayload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Bed created successfully',
        statusCode: 201,
        data: createdBed,
    });
}));
const getAllBedsController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const beds = yield bed_service_1.BedServices.getAllBeds();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Beds retrieved successfully',
        statusCode: 200,
        data: beds,
    });
}));
const getBedController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const bed = yield bed_service_1.BedServices.getBedById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Bed retrieved successfully',
        statusCode: 200,
        data: bed,
    });
}));
const updateBedController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedPayload = req.body;
    const updatedBed = yield bed_service_1.BedServices.updateBedById(id, updatedPayload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Bed updated successfully',
        statusCode: 200,
        data: updatedBed,
    });
}));
const updateBedAvailabilityStatusController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { availabilityStatus } = req.body;
    const updatedBedAvailabilityStatus = yield bed_service_1.BedServices.updateBedAvailabilityStatusById(id, availabilityStatus);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Bed availability status updated successfully',
        statusCode: 200,
        data: updatedBedAvailabilityStatus,
    });
}));
const deleteBedController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield bed_service_1.BedServices.deleteBedById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Bed deleted successfully',
        statusCode: 200,
        data: {},
    });
}));
exports.BedControllers = {
    createBedController,
    getAllBedsController,
    getBedController,
    updateBedController,
    updateBedAvailabilityStatusController,
    deleteBedController,
};
