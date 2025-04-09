import mongoose, { model, Schema } from 'mongoose';
import {
  TDepartment,
  TPossibleCauses,
  TSymptomsAddressed,
} from './department.interface';
import { HttpError } from '../../errors/HttpError';
import {
  excludeDeletedAggregation,
  excludeDeletedQuery,
} from '../../utils/modelSpecific/queryFilters';

const symptomsAddressedSchema = new Schema<TSymptomsAddressed>({
  _id: {
    type: String,
  },
  symptom: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
});

const possibleCausesSchema = new Schema<TPossibleCauses>({
  _id: {
    type: String,
  },
  cause: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
});

export const departmentSchema = new Schema<TDepartment>(
  {
    specialization: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Specialization',
    },
    departmentName: {
      type: String,
    },
    overview: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    symptomsAddressed: {
      type: [symptomsAddressedSchema],
      required: true,
    },
    possibleCauses: {
      type: [possibleCausesSchema],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inActive'],
      default: 'active',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String,
      enum: ['add', 'remove', 'update'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// document middleware to set department name based of specialization name
departmentSchema.pre('save', async function (next) {
  const specialization = await mongoose
    .model('Specialization')
    .findById(this.specialization)
    .select('name');

  if (specialization) {
    this.departmentName = `Department of ${specialization.name}`;
  } else {
    throw new HttpError(404, 'Specialization not found!');
  }
  next();
});

// query middleware for soft delete by utils
departmentSchema.pre('find', excludeDeletedQuery);
departmentSchema.pre('findOne', excludeDeletedQuery);

// aggregate middleware for soft delete by utils
departmentSchema.pre('aggregate', excludeDeletedAggregation);

export const Department = model<TDepartment>('Department', departmentSchema);
