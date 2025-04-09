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
exports.ReviewControllers =
  exports.getReviewsByDoctorIdController =
  exports.getAllReviewsController =
    void 0;
const asyncHandler_1 = require('../../utils/global/asyncHandler');
const sendResponse_1 = require('../../utils/global/sendResponse');
const review_service_1 = require('./review.service');
const createReviewController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const reviewPayload = req.body;
    const createdReview =
      yield review_service_1.ReviewServices.createReview(reviewPayload);
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Review created successfully',
      statusCode: 201,
      data: createdReview,
    });
  }),
);
exports.getAllReviewsController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield review_service_1.ReviewServices.getAllReviews();
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Review are retrieved successfully',
      statusCode: 200,
      data: reviews,
    });
  }),
);
exports.getReviewsByDoctorIdController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const doctorId = req.params.doctorId;
      const reviews =
        yield review_service_1.ReviewServices.getReviewsByDoctorId(doctorId);
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Review are retrieved successfully',
        statusCode: 200,
        data: reviews,
      });
    }),
);
const getReviewByIdController = (0, asyncHandler_1.asyncHandler)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const review = yield review_service_1.ReviewServices.getReviewById(id);
    (0, sendResponse_1.sendResponse)(res, {
      success: true,
      message: 'Review retrieved successfully',
      statusCode: 200,
      data: review,
    });
  }),
);
const deleteReviewByIdController = (0, asyncHandler_1.asyncHandler)(
  (req, res) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const id = req.params.id;
      yield review_service_1.ReviewServices.deleteReviewById(id);
      (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: 'Review deleted successfully',
        statusCode: 200,
        data: {},
      });
    }),
);
exports.ReviewControllers = {
  createReviewController,
  getAllReviewsController: exports.getAllReviewsController,
  getReviewsByDoctorIdController: exports.getReviewsByDoctorIdController,
  getReviewByIdController,
  deleteReviewByIdController,
};
