import { model, Schema } from "mongoose";
import { TSpecialization } from "./specialization.interface";

export const specializationSchema = new Schema<TSpecialization>({
    name: {
        type: String,
        trim: true,
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

export const Specialization = model("Specialization", specializationSchema)