import { model, Schema } from 'mongoose';
import { TStaffRole } from './staffRole.interface';
import {
  excludeDeletedAggregation,
  excludeDeletedQuery,
} from '../../utils/modelSpecific/queryFilters';

const staffRoleSchema = new Schema<TStaffRole>(
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
staffRoleSchema.pre('find', excludeDeletedQuery);
staffRoleSchema.pre('findOne', excludeDeletedQuery);

// aggregate middleware for soft delete by utils
staffRoleSchema.pre('aggregate', excludeDeletedAggregation);

export const StaffRole = model('StaffRole', staffRoleSchema);
