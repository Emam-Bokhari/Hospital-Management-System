import { Types } from "mongoose";

export type TSymptomsAddressed = {
    symptom: string;
    description: string;
}

export type TPossibleCauses = {
    cause: string;
    description: string;
}

export type TDepartment = {
    specialization: Types.ObjectId;
    departmentName?: string;
    overview: string;
    description: string;
    symptomsAddressed: TSymptomsAddressed[];
    possibleCauses: TPossibleCauses[];
    status: "active" | "inActive";
    createdBy?: Types.ObjectId;
    isDeleted?: boolean;
}