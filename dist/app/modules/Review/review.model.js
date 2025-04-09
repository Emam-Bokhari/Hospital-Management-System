'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Review = void 0;
const mongoose_1 = require('mongoose');
const queryFilters_1 = require('../../utils/modelSpecific/queryFilters');
const reviewSchema = new mongoose_1.Schema(
  {
    reviewerId: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'User',
    },
    doctorId: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    reviewText: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
// query middleware for soft delete by utils
reviewSchema.pre('find', queryFilters_1.excludeDeletedQuery);
reviewSchema.pre('findOne', queryFilters_1.excludeDeletedQuery);
// aggregate middleware for soft delete by utils
reviewSchema.pre('aggregate', queryFilters_1.excludeDeletedAggregation);
exports.Review = (0, mongoose_1.model)('Review', reviewSchema);
