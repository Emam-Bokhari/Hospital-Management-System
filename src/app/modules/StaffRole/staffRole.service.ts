import { TStaffRole } from "./staffRole.interface";
import { StaffRole } from "./staffRole.model";

const createStaffRole = async (payload: TStaffRole) => {
    const createdStaffRole = await StaffRole.create(payload);

    return createdStaffRole;
}

export const StaffRoleServices = {
    createStaffRole,
}