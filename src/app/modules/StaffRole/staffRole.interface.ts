import { Types } from "mongoose";

export type TStaffRole = {
    name: string;
    createdBy?: Types.ObjectId;
    isDeleted?: boolean;
}