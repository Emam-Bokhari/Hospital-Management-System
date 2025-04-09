import { Types } from 'mongoose';

export type TSpecialization = {
  name: string;
  createdBy?: Types.ObjectId;
  isDeleted?: boolean;
};
