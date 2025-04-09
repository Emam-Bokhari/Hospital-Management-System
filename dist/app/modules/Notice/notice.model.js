'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Notice = void 0;
const mongoose_1 = require('mongoose');
const queryFilters_1 = require('../../utils/modelSpecific/queryFilters');
const noticeSchema = new mongoose_1.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    targetAudience: {
      type: String,
      enum: [
        'public',
        'user',
        'doctor',
        'accounts-specialist',
        'finance-manager',
        'admin',
        'super-admin',
      ],
      default: 'public',
    },
    category: {
      type: String,
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
noticeSchema.pre('find', queryFilters_1.excludeDeletedQuery);
noticeSchema.pre('findOne', queryFilters_1.excludeDeletedQuery);
// aggregate middleware for soft delete by utils
noticeSchema.pre('aggregate', queryFilters_1.excludeDeletedAggregation);
exports.Notice = (0, mongoose_1.model)('Notice', noticeSchema);
