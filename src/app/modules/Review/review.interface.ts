import { Types } from "mongoose";

export type TReview = {
    reviewerId: Types.ObjectId;
    doctorId: Types.ObjectId;
    reviewText: string;
    isDeleted: boolean;
}