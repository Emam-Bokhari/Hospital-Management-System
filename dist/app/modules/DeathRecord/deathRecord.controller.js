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
exports.DeathRecordControllers = void 0;
const asyncHandler_1 = require('../../utils/global/asyncHandler');
const sendResponse_1 = require('../../utils/global/sendResponse');
const deathRecord_service_1 = require('./deathRecord.service');
const createDeathRecordController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const deathRecordPayload = req.body;
      const createdDeathRecord =
        yield deathRecord_service_1.DeathRecordServices.createDeathRecord(
          deathRecordPayload,
        );
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Death record created successfully',
        statusCode: 201,
        data: createdDeathRecord,
      });
    }),
);
const getAllDeathRecordsController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const deathRecords =
        yield deathRecord_service_1.DeathRecordServices.getAllDeathRecords();
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Death records retrieved successfully',
        statusCode: 200,
        data: deathRecords,
      });
    }),
);
const getDeathRecordController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deathRecord =
      yield deathRecord_service_1.DeathRecordServices.getDeathRecordById(id);
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Death record retrieved successfully',
      statusCode: 200,
      data: deathRecord,
    });
  }),
);
const updateDeathRecordController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const id = req.params.id;
      const updatedPayload = req.body;
      const updatedDeathRecord =
        yield deathRecord_service_1.DeathRecordServices.updateDeathRecordById(
          id,
          updatedPayload,
        );
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Death record updated successfully',
        statusCode: 200,
        data: updatedDeathRecord,
      });
    }),
);
const deleteDeathRecordController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const id = req.params.id;
      yield deathRecord_service_1.DeathRecordServices.deleteDeathRecordById(id);
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Death record deleted successfully',
        statusCode: 200,
        data: {},
      });
    }),
);
exports.DeathRecordControllers = {
  createDeathRecordController,
  getAllDeathRecordsController,
  getDeathRecordController,
  updateDeathRecordController,
  deleteDeathRecordController,
};
