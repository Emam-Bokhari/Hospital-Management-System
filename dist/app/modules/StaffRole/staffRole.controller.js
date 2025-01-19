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
exports.StaffRoleControllers = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = require("../../utils/sendResponse");
const staffRole_service_1 = require("./staffRole.service");
const createStaffRoleController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const staffRolePayload = req.body;
    const createdStaffRole = yield staffRole_service_1.StaffRoleServices.createStaffRole(staffRolePayload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Staff role created successfully',
        statusCode: 201,
        data: createdStaffRole,
    });
}));
const getAllStaffRolesController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const staffRoles = yield staffRole_service_1.StaffRoleServices.getAllStaffRoles();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Staff roles retrieved successfully',
        statusCode: 200,
        data: staffRoles,
    });
}));
const getStaffRoleController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const staffRole = yield staffRole_service_1.StaffRoleServices.getStaffRoleById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Staff role retrieved successfully',
        statusCode: 200,
        data: staffRole,
    });
}));
const updateStaffRoleController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedPayload = req.body;
    const updatedStaffRole = yield staffRole_service_1.StaffRoleServices.updateStaffRoleById(id, updatedPayload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Staff role updated successfully',
        statusCode: 200,
        data: updatedStaffRole,
    });
}));
const deleteStaffRoleController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield staffRole_service_1.StaffRoleServices.deleteStaffRoleById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Staff role deleted successfully',
        statusCode: 200,
        data: {},
    });
}));
exports.StaffRoleControllers = {
    createStaffRoleController,
    getAllStaffRolesController,
    getStaffRoleController,
    updateStaffRoleController,
    deleteStaffRoleController,
};
