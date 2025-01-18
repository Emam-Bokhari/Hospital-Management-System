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
exports.TestControllers = void 0;
const asyncHandler_1 = require('../../utils/asyncHandler');
const sendResponse_1 = require('../../utils/sendResponse');
const test_service_1 = require('./test.service');
const createTestController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const testPayload = req.body;
    const createdTest =
      yield test_service_1.TestServices.createTest(testPayload);
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Test created successfully',
      statusCode: 201,
      data: createdTest,
    });
  }),
);
const getAllTestsController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const tests = yield test_service_1.TestServices.getAllTests();
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Tests retrieved successfully',
      statusCode: 200,
      data: tests,
    });
  }),
);
const getTestController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const test = yield test_service_1.TestServices.getTestById(id);
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Test retrieved successfully',
      statusCode: 200,
      data: test,
    });
  }),
);
const updateTestController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedPayload = req.body;
    const updatedTest = yield test_service_1.TestServices.updateTestById(
      id,
      updatedPayload,
    );
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Test updated successfully',
      statusCode: 200,
      data: updatedTest,
    });
  }),
);
const deleteTestController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield test_service_1.TestServices.deleteTestById(id);
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Test deleted successfully',
      statusCode: 200,
      data: {},
    });
  }),
);
const updateTestAvailabilityController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const id = req.params.id;
      const updatedPayload = req.body;
      const updatedTestAvailability =
        yield test_service_1.TestServices.updateTestAvailabilityById(
          id,
          updatedPayload,
        );
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Test availability updated successfully',
        statusCode: 200,
        data: updatedTestAvailability,
      });
    }),
);
exports.TestControllers = {
  createTestController,
  getAllTestsController,
  getTestController,
  updateTestController,
  deleteTestController,
  updateTestAvailabilityController,
};
