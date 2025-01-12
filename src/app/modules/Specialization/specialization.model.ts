import { model, Schema } from "mongoose";
import { TSpecialization } from "./specialization.interface";
import { excludeDeletedAggregation, excludeDeletedQuery } from "../../utils/queryFilters";

export const specializationSchema = new Schema<TSpecialization>({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)
// query middleware by utils
specializationSchema.pre("find", excludeDeletedQuery);
specializationSchema.pre("findOne", excludeDeletedQuery)

// aggregate middleware by utils
specializationSchema.pre("aggregate", excludeDeletedAggregation)

export const Specialization = model("Specialization", specializationSchema)