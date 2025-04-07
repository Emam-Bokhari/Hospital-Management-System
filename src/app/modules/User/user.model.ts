import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import {
  excludeDeletedAggregation,
  excludeDeletedQuery,
} from '../../utils/modelSpecific/queryFilters';
import bcrypt from "bcrypt"
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
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

// hashed password by bcrypt
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

// password field is empty
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next()
})

// statics method for check if user is exists
userSchema.statics.isUserExists = async (email: string) => {
  return await User.findOne({ email: email }).select("+password")
}

// statics method for password matched
userSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

// query middleware for soft delete by utils
userSchema.pre('find', excludeDeletedQuery);
userSchema.pre('findOne', excludeDeletedQuery);

// aggregate middleware for soft delete by utils
userSchema.pre('aggregate', excludeDeletedAggregation);

export const User = model<TUser, UserModel>('User', userSchema);
