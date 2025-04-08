'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Bed = void 0;
const mongoose_1 = require('mongoose');
const queryFilters_1 = require('../../utils/modelSpecific/queryFilters');
const bedSchema = new mongoose_1.Schema(
  {
    bedType: {
      type: String,
      enum: {
        values: ['men', 'women', 'general', 'child', 'private'],
        message: '{VALUE} is not a valid bed type',
      },
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    availabilityStatus: {
      type: String,
      enum: {
        values: ['available', 'occupied', 'maintenance'],
        message: '{VALUE} is not a valid availability status',
      },
      default: 'available',
    },
    facilities: {
      type: [String],
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    admissionNotes: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'User',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String,
      enum: {
        values: ['add', 'remove'],
        message: '{VALUE} is not a valid action',
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
// query middleware for soft delete by utils
bedSchema.pre('find', queryFilters_1.excludeDeletedQuery);
bedSchema.pre('findOne', queryFilters_1.excludeDeletedQuery);
// aggregate middleware for soft delete by utils
bedSchema.pre('aggregate', queryFilters_1.excludeDeletedAggregation);
exports.Bed = (0, mongoose_1.model)('Bed', bedSchema);
