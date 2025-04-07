import { Document, Model } from "mongoose";

export interface TUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?:
  | 'user'
  | 'doctor'
  | 'accounts-specialist'
  | 'finance-manager'
  | 'admin'
  | 'super-admin';
  status?: 'active' | 'suspend';
  isDeleted?: boolean;
};

// statics methods
export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser> | null;
}