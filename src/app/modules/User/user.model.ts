import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import {
  excludeDeletedAggregation,
  excludeDeletedQuery,
} from '../../utils/queryFilters';

const userSchema = new Schema<TUser>(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: Schema.Types.String,
      enum: [
        'user',
        'doctor',
        'accounts-specialist',
        'finance-manager',
        'admin',
        'super-admin',
      ],
      default: 'user',
    },
    status: {
      type: Schema.Types.String,
      enum: ['active', 'suspend'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false, // disables the '__v' field
  },
);

// query middleware for soft delete by utils
userSchema.pre('find', excludeDeletedQuery);
userSchema.pre('findOne', excludeDeletedQuery);

// aggregate middleware for soft delete by utils
userSchema.pre('aggregate', excludeDeletedAggregation);

export const User = model<TUser>('User', userSchema);
