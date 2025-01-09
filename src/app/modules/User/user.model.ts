import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import { Doctor } from '../Doctor/doctor.model';

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

// document middleware
userSchema.pre("save", async function (next) {
  if (this.isModified("isDeleted") && this.isDeleted) {
    await Doctor.updateMany({ userId: this._id }, { isHidden: true })
  }
  next()
})

// query middleware
userSchema.pre('find', async function (next) {
  this.where({ isDeleted: false });
  next();
});

userSchema.pre('findOne', async function (next) {
  this.where({ isDeleted: false });
  next();
});

// aggregate middleware
userSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

userSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $project: { isDeleted: 0 } });
  next();
});

export const User = model<TUser>('User', userSchema);
