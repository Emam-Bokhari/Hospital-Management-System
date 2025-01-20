import { model, Schema } from "mongoose";
import { TBed } from "./bed.interface";

const bedSchema = new Schema<TBed>({
    bedType: {
        type: String,
        enum: {
            values: ["men", "women", "general", "child", "private"],
            message: "{VALUE} is not a valid bed type",
        },
        required: true,
    },
    price: {
        type: Number,
        trim: true,
        required: true,
    },
    availabilityStatus: {
        type: String,
        enum: {
            values: ["available", "occupied", "maintenance"],
            message: "{VALUE} is not a valid availability status"
        },
        required: true,
    },
    facilities: {
        type: [String],
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    admissionNotes: {
        type: String,
        trim: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
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
);

export const Bed = model<TBed>("Bed", bedSchema);