import { model, Schema } from "mongoose";
import { TDepartment, TPossibleCauses, TSymptomsAddressed } from "./department.interface";

const symptomsAddressedSchema = new Schema<TSymptomsAddressed>({
    symptom: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    }
})

const possibleCausesSchema = new Schema<TPossibleCauses>({
    cause: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    }
})

export const departmentSchema = new Schema<TDepartment>({
    specialization: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Specialization"
    },
    departmentName: {
        type: String,
        required: true,
    },
    overview: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    symptomsAddressed: {
        type: [symptomsAddressedSchema],
        required: true
    },
    possibleCauses: {
        type: [possibleCausesSchema],
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inActive"],
        default: "active"
    },
    createdBy: {
        type: Schema.Types.ObjectId,
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

export const Department = model<TDepartment>("Department", departmentSchema)