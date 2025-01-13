import { model, Schema } from "mongoose"
import { TStaffRole } from "./staffRole.interface"

const staffRoleSchema = new Schema<TStaffRole>({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
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
export const StaffRole = model("StaffRole", staffRoleSchema)