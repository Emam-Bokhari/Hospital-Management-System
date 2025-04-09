'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Specialization = exports.specializationSchema = void 0;
const mongoose_1 = require('mongoose');
const queryFilters_1 = require('../../utils/modelSpecific/queryFilters');
exports.specializationSchema = new mongoose_1.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    createdBy: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'User',
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
exports.specializationSchema.pre('find', queryFilters_1.excludeDeletedQuery);
exports.specializationSchema.pre('findOne', queryFilters_1.excludeDeletedQuery);
// aggregate middleware for soft delete by utils
exports.specializationSchema.pre(
  'aggregate',
  queryFilters_1.excludeDeletedAggregation,
);
exports.Specialization = (0, mongoose_1.model)(
  'Specialization',
  exports.specializationSchema,
);
