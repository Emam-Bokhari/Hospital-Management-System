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
exports.ReviewServices = void 0;
const HttpError_1 = require('../../errors/HttpError');
const textFilter_1 = require('../../utils/modelSpecific/textFilter');
const review_model_1 = require('./review.model');
const createReview = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if ((0, textFilter_1.filterBadWords)(payload.reviewText)) {
      throw new HttpError_1.HttpError(
        400,
        'Your review contains inappropriate language. Please remove it.',
      );
    }
    const createdReview = yield review_model_1.Review.create(payload);
    return createdReview;
  });
const getAllReviews = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield review_model_1.Review.find();
    if (reviews.length === 0) {
      throw new HttpError_1.HttpError(
        404,
        'No review were found in the database',
      );
    }
    return reviews;
  });
const getReviewsByDoctorId = (doctorId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield review_model_1.Review.find({ doctorId: doctorId });
    if (reviews.length === 0) {
      throw new HttpError_1.HttpError(
        404,
        `No review were found with ID ${doctorId}`,
      );
    }
    return reviews;
  });
const getReviewById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const review = yield review_model_1.Review.findById(id);
    if (!review) {
      throw new HttpError_1.HttpError(404, `No review found with ID ${id}`);
    }
    return review;
  });
const deleteReviewById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const deletedReview = yield review_model_1.Review.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
      { new: true },
    );
    if (!deletedReview) {
      throw new HttpError_1.HttpError(404, `No review found with ID: ${id}`);
    }
    return deletedReview;
  });
exports.ReviewServices = {
  createReview,
  getAllReviews,
  getReviewById,
  getReviewsByDoctorId,
  deleteReviewById,
};
