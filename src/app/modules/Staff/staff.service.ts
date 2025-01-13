import { HttpError } from "../../errors/HttpError";
import { TStaff } from "./staff.interface";
import { Staff } from "./staff.model";

const createStaff = async (payload: TStaff) => {
    const createdStaff = await Staff.create(payload);
    return createdStaff;
};

const getAllStaffs = async () => {
    const staffs = await Staff.find();

    if (staffs.length === 0) {
        throw new HttpError(404, 'No staffs were found in the database')
    }

    return staffs;
}

export const StaffServices = {
    createStaff,
    getAllStaffs,
}