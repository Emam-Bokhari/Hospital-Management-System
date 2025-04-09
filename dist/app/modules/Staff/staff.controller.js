'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.StaffControllers = void 0;
const asyncHandler_1 = require('../../utils/global/asyncHandler');
const sendResponse_1 = require('../../utils/global/sendResponse');
const staff_service_1 = require('./staff.service');
const createStaffController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const staffPayload = req.body;
    const createdStaff =
      yield staff_service_1.StaffServices.createStaff(staffPayload);
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Staff created successfully',
      statusCode: 201,
      data: createdStaff,
    });
  }),
);
const getAllStaffsController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const staffs = yield staff_service_1.StaffServices.getAllStaffs();
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Staffs retrieved successfully',
      statusCode: 200,
      data: staffs,
    });
  }),
);
const getStaffController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const staff = yield staff_service_1.StaffServices.getStaffById(id);
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Staff retrieved successfully',
      statusCode: 200,
      data: staff,
    });
  }),
);
const updateStaffController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedPayload = req.body;
    const updatedStaff = yield staff_service_1.StaffServices.updateStaffById(
      id,
      updatedPayload,
    );
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Staff updated successfully',
      statusCode: 200,
      data: updatedStaff,
    });
  }),
);
const deleteStaffController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield staff_service_1.StaffServices.deleteStaffById(id);
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Staff deleted successfully',
      statusCode: 200,
      data: {},
    });
  }),
);
exports.StaffControllers = {
  createStaffController,
  getAllStaffsController,
  getStaffController,
  updateStaffController,
  deleteStaffController,
};
