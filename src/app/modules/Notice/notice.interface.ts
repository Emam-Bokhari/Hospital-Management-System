import { Types } from 'mongoose';

export type TNotice = {
  title: string;
  content: string;
  targetAudience:
    | 'public'
    | 'user'
    | 'doctor'
    | 'accounts-specialist'
    | 'finance-manager'
    | 'admin'
    | 'super-admin';
  category?: string;
  createdBy?: Types.ObjectId;
  isDeleted?: boolean;
};
