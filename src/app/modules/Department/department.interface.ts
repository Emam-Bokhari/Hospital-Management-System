import { Types } from 'mongoose';

export type TSymptomsAddressed = {
  _id: string;
  symptom: string;
  description: string;
};

export type TPossibleCauses = {
  _id: string;
  cause: string;
  description: string;
};

export type TDepartment = {
  specialization: Types.ObjectId;
  departmentName?: string;
  overview: string;
  description: string;
  symptomsAddressed: TSymptomsAddressed[];
  possibleCauses: TPossibleCauses[];
  status?: 'active' | 'inActive';
  createdBy?: Types.ObjectId;
  isDeleted?: boolean;
  action?: 'add' | 'remove' | 'update';
};
