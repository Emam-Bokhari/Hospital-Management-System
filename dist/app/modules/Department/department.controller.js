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
exports.DepartmentControllers = void 0;
const asyncHandler_1 = require("../../utils/global/asyncHandler");
const sendResponse_1 = require("../../utils/global/sendResponse");
const department_service_1 = require("./department.service");
const createDepartmentController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const departmentPayload = req.body;
    const createdDepartment = yield department_service_1.DepartmentServices.createDepartment(departmentPayload);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Department created successfully',
        statusCode: 201,
        data: createdDepartment,
    });
}));
const getAllDepartmentsController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const departments = yield department_service_1.DepartmentServices.getAllDepartments();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Departments retrieved successfully',
        statusCode: 200,
        data: departments,
    });
}));
const getDepartmentController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const department = yield department_service_1.DepartmentServices.getDepartmentById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Department retrieved successfully',
        statusCode: 200,
        data: department,
    });
}));
const deleteDepartmentController = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield department_service_1.DepartmentServices.deleteDepartmentById(id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Delete department successfully',
        statusCode: 200,
        data: {},
    });
}));
exports.DepartmentControllers = {
    createDepartmentController,
    getAllDepartmentsController,
    getDepartmentController,
    deleteDepartmentController,
};
