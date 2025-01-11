import { Types } from "mongoose";

type TSymptomsAddressed = {
    symptom: string;
    description: string;
}

type TPossibleCauses = {
    cause: string;
    description: string;
}

export type TDepartment = {
    specialization: Types.ObjectId;
    departmentName: string;
    overview: string;
    description: string;
    symptomsAddressed: TSymptomsAddressed[];
    possibleCauses: TPossibleCauses[];
    associatedDoctors: Types.ObjectId[];
    status: "active" | "inActive";
    createdBy: Types.ObjectId;
}