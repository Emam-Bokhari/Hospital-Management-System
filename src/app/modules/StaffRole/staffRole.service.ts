import { HttpError } from "../../errors/HttpError";
import { TStaffRole } from "./staffRole.interface";
import { StaffRole } from "./staffRole.model";

const createStaffRole = async (payload: TStaffRole) => {
    const createdStaffRole = await StaffRole.create(payload);

    return createdStaffRole;
}

const getAllStaffRoles = async () => {
    const staffs = await StaffRole.find();

    if (staffs.length === 0) {
        throw new HttpError(404, 'No staff roles were found in the database')
    }

    return staffs;
}

export const StaffRoleServices = {
    createStaffRole,
    getAllStaffRoles,
}