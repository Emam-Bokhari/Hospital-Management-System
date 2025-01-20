'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BirthRecord = exports.birthRecordSchema = void 0;
const mongoose_1 = require('mongoose');
const queryFilters_1 = require('../../utils/modelSpecific/queryFilters');
const guardianSchema = new mongoose_1.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  relationship: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
  },
  nidNumber: {
    type: String,
    trim: true,
  },
  nidScannedCopy: {
    type: String,
  },
});
const addressSchema = new mongoose_1.Schema({
  division: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  subDistrict: {
    type: String,
    required: true,
  },
  village: {
    type: String,
    trim: true,
  },
  postalCode: {
    type: String,
    trim: true,
  },
});
exports.birthRecordSchema = new mongoose_1.Schema(
  {
    guardian: {
      type: guardianSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} is not a valid',
      },
    },
    birthDate: {
      type: Date,
      required: true,
    },
    placeOfBirth: {
      type: String,
      trim: true,
      required: true,
    },
    birthTime: {
      type: String,
    },
    birthWeight: {
      type: Number,
      trim: true,
      required: true,
    },
    birthLength: {
      type: Number,
      trim: true,
    },
    address: {
      type: addressSchema,
      required: true,
    },
    nationality: {
      type: String,
      trim: true,
      required: true,
    },
    religion: {
      type: String,
      trim: true,
      required: true,
    },
    doctor: {
      type: mongoose_1.Schema.Types.ObjectId,
      required: true,
      ref: 'Doctor',
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
exports.birthRecordSchema.pre('find', queryFilters_1.excludeDeletedQuery);
exports.birthRecordSchema.pre('findOne', queryFilters_1.excludeDeletedQuery);
// aggregate middleware for soft delete by utils
exports.birthRecordSchema.pre(
  'aggregate',
  queryFilters_1.excludeDeletedAggregation,
);
exports.BirthRecord = (0, mongoose_1.model)(
  'BirthRecord',
  exports.birthRecordSchema,
);
