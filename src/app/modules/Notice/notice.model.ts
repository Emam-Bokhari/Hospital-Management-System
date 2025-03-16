import { model, Schema } from 'mongoose';
import { TNotice } from './notice.interface';
import {
  excludeDeletedAggregation,
  excludeDeletedQuery,
} from '../../utils/modelSpecific/queryFilters';

const noticeSchema = new Schema<TNotice>(
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
      type: String,
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
noticeSchema.pre('find', excludeDeletedQuery);
noticeSchema.pre('findOne', excludeDeletedQuery);

// aggregate middleware for soft delete by utils
noticeSchema.pre('aggregate', excludeDeletedAggregation);

export const Notice = model<TNotice>('Notice', noticeSchema);
