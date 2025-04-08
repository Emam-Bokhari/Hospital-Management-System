import { model, Schema } from 'mongoose';
import { TBed } from './bed.interface';
import {
  excludeDeletedAggregation,
  excludeDeletedQuery,
} from '../../utils/modelSpecific/queryFilters';

const bedSchema = new Schema<TBed>(
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
      type: Schema.Types.ObjectId,
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
bedSchema.pre('find', excludeDeletedQuery);
bedSchema.pre('findOne', excludeDeletedQuery);

// aggregate middleware for soft delete by utils
bedSchema.pre('aggregate', excludeDeletedAggregation);

export const Bed = model<TBed>('Bed', bedSchema);
