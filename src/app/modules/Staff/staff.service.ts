import { TStaff } from "./staff.interface";
import { Staff } from "./staff.model";

const createStaff = async (payload: TStaff) => {
    const createdStaff = await Staff.create(payload);
    return createdStaff;
};

export const StaffServices = {
    createStaff,
}