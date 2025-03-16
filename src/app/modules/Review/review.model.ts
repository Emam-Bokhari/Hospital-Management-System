import { model, Schema } from "mongoose";
import { TReview } from "./review.interface";
import { excludeDeletedAggregation, excludeDeletedQuery } from "../../utils/modelSpecific/queryFilters";

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

},
    {
        timestamps: true,
        versionKey: false,
    }
)

// query middleware for soft delete by utils
reviewSchema.pre('find', excludeDeletedQuery);
reviewSchema.pre('findOne', excludeDeletedQuery);

// aggregate middleware for soft delete by utils
reviewSchema.pre('aggregate', excludeDeletedAggregation);

export const Review = model<TReview>("Review", reviewSchema)