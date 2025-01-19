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
exports.SpecializationControllers = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = require("../../utils/sendResponse");
const Specialization_service_1 = require("./Specialization.service");
const createSpecializationController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const specializationPayload = req.body;
    const createdSpecialization = yield Specialization_service_1.SpecializationServices.createSpecialization(specializationPayload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Specialization created successfully',
        statusCode: 201,
        data: createdSpecialization,
    });
}));
const getAllSpecializationsController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const specializations = yield Specialization_service_1.SpecializationServices.getAllSpecializations();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Specializations retrieved successfully',
        statusCode: 200,
        data: specializations,
    });
}));
const getSpecializationController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const specialization = yield Specialization_service_1.SpecializationServices.getSpecializationById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Specialization retrieved successfully',
        statusCode: 200,
        data: specialization,
    });
}));
const updateSpecializationController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedPayload = req.body;
    const updatedSpecialization = yield Specialization_service_1.SpecializationServices.updateSpecializationById(id, updatedPayload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Specialization updated successfully',
        statusCode: 200,
        data: updatedSpecialization,
    });
}));
const deleteSpecializationController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield Specialization_service_1.SpecializationServices.deleteSpecializationById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Specialization deleted successfully',
        statusCode: 200,
        data: {},
    });
}));
exports.SpecializationControllers = {
    createSpecializationController,
    getAllSpecializationsController,
    getSpecializationController,
    updateSpecializationController,
    deleteSpecializationController,
};
