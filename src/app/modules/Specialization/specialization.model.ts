import { model, Schema } from 'mongoose';
import { TSpecialization } from './specialization.interface';
import {
  excludeDeletedAggregation,
  excludeDeletedQuery,
} from '../../utils/modelSpecific/queryFilters';

export const specializationSchema = new Schema<TSpecialization>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
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
specializationSchema.pre('find', excludeDeletedQuery);
specializationSchema.pre('findOne', excludeDeletedQuery);

// aggregate middleware for soft delete by utils
specializationSchema.pre('aggregate', excludeDeletedAggregation);

export const Specialization = model<TSpecialization>('Specialization', specializationSchema);
