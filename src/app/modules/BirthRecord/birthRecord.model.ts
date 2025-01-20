import { model, Schema } from "mongoose";
import { TAddress, TBirthRecord, TGuardian } from "./birthRecord.interface";
import { excludeDeletedAggregation, excludeDeletedQuery } from "../../utils/modelSpecific/queryFilters";

const guardianSchema = new Schema<TGuardian>({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    relationship: {
        type: String,
        trim: true,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
    },
    nidNumber: {
        type: String,
        trim: true,
    },
    nidScannedCopy: {
        type: String,
    }
})

const addressSchema = new Schema<TAddress>({
    division: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    subDistrict: {
        type: String,
        required: true,
    },
    village: {
        type: String,
        trim: true,
    },
    postalCode: {
        type: String,
        trim: true,
    }
})

export const birthRecordSchema = new Schema<TBirthRecord>({
    guardian: {
        type: guardianSchema,
        required: true,
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female"],
            message: "{VALUE} is not a valid"
        }
    },
    birthDate: {
        type: Date,
        required: true,
    },
    placeOfBirth: {
        type: String,
        trim: true,
        required: true,
    },
    birthTime: {
        type: String,
    },
    birthWeight: {
        type: Number,
        trim: true,
        required: true,
    },
    birthLength: {
        type: Number,
        trim: true,
    },
    address: {
        type: addressSchema,
        required: true,
    },
    nationality: {
        type: String,
        trim: true,
        required: true,
    },
    religion: {
        type: String,
        trim: true,
        required: true,
    },
    doctor: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Doctor",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
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
birthRecordSchema.pre("find", excludeDeletedQuery);
birthRecordSchema.pre("findOne", excludeDeletedQuery);

// aggregate middleware for soft delete by utils
birthRecordSchema.pre("aggregate", excludeDeletedAggregation)

export const BirthRecord = model<TBirthRecord>("BirthRecord", birthRecordSchema)