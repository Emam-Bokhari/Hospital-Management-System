'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.StaffRole = void 0;
const mongoose_1 = require('mongoose');
const queryFilters_1 = require('../../utils/queryFilters');
const staffRoleSchema = new mongoose_1.Schema(
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
staffRoleSchema.pre('find', queryFilters_1.excludeDeletedQuery);
staffRoleSchema.pre('findOne', queryFilters_1.excludeDeletedQuery);
// aggregate middleware for soft delete by utils
staffRoleSchema.pre('aggregate', queryFilters_1.excludeDeletedAggregation);
exports.StaffRole = (0, mongoose_1.model)('StaffRole', staffRoleSchema);
