import { model, Schema } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>({
    reviewerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: "Doctor"
    },
    reviewText: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }

})

export const Review = model<TReview>("Review", reviewSchema)