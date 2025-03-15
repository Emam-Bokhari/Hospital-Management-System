import { model, Schema } from "mongoose";
import { TNotice } from "./notice.interface";

const noticeSchema = new Schema<TNotice>({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    targetAudience: {
        type: String,
        enum: ["public",
            'user', 'doctor', 'accounts-specialist', 'finance-manager', 'admin', 'super-admin'],
        default: "public"
    },
    category: {
        type: String,
    },
    createdBy: {
        type: String,
        ref: "User"
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

export const Notice = model<TNotice>("Notice", noticeSchema)