import { Document, Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?:
    | 'user'
    | 'doctor'
    | 'receptionist'
    | 'financeManager'
    | 'admin'
    | 'superAdmin';
  status?: 'active' | 'suspend';
  isDeleted?: boolean;
}

export type TUserRole = keyof typeof USER_ROLE;

// statics methods
export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser> | null;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
