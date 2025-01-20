import { model, Schema } from 'mongoose';
import { TAddress, TDeathRecord, TGuardian } from './deathRecord.interface';
import {
  excludeDeletedAggregation,
  excludeDeletedQuery,
} from '../../utils/modelSpecific/queryFilters';

const guardianSchema = new Schema<TGuardian>({
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

const addressSchema = new Schema<TAddress>({
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

export const deathRecordSchema = new Schema<TDeathRecord>(
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
      required: true,
    },
    age: {
      type: Number,
      trim: true,
      required: true,
    },
    deathDate: {
      type: Date,
      required: true,
    },
    deathTime: {
      type: String,
    },
    placeOfDeath: {
      type: String,
      trim: true,
      required: true,
    },
    causeOfDeath: {
      type: String,
      trim: true,
      required: true,
    },
    deathCertificateNo: {
      type: String,
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
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Doctor',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
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
deathRecordSchema.pre('find', excludeDeletedQuery);
deathRecordSchema.pre('findOne', excludeDeletedQuery);

// aggregate middleware for soft delete by utils
deathRecordSchema.pre('aggregate', excludeDeletedAggregation);

export const DeathRecord = model<TDeathRecord>(
  'DeathRecord',
  deathRecordSchema,
);
