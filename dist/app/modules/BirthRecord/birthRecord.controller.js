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
exports.BirthRecordControllers = void 0;
const asyncHandler_1 = require('../../utils/global/asyncHandler');
const sendResponse_1 = require('../../utils/global/sendResponse');
const birthRecord_service_1 = require('./birthRecord.service');
const createBirthRecordController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const birthRecordPayload = req.body;
      const createdBirthRecord =
        yield birthRecord_service_1.BirthRecordServices.createBirthRecord(
          birthRecordPayload,
        );
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Birth record created successfully',
        statusCode: 201,
        data: createdBirthRecord,
      });
    }),
);
const getAllBirthRecordsController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const birthRecords =
        yield birthRecord_service_1.BirthRecordServices.getAllBirthRecords();
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Birth records retrieved successfully',
        statusCode: 200,
        data: birthRecords,
      });
    }),
);
const getBirthRecordController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const birthRecord =
      yield birthRecord_service_1.BirthRecordServices.getBirthRecordById(id);
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Birth record retrieved successfully',
      statusCode: 200,
      data: birthRecord,
    });
  }),
);
const updateBirthRecordController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const id = req.params.id;
      const updatedPayload = req.body;
      const updatedBirthRecord =
        yield birthRecord_service_1.BirthRecordServices.updateBirthRecordById(
          id,
          updatedPayload,
        );
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Birth record updated successfully',
        statusCode: 200,
        data: updatedBirthRecord,
      });
    }),
);
const deleteBirthRecordController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const id = req.params.id;
      yield birthRecord_service_1.BirthRecordServices.deleteBirthRecordById(id);
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Birth record deleted successfully',
        statusCode: 200,
        data: {},
      });
    }),
);
exports.BirthRecordControllers = {
  createBirthRecordController,
  getAllBirthRecordsController,
  getBirthRecordController,
  updateBirthRecordController,
  deleteBirthRecordController,
};
