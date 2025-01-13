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

const getStaffRoleById = async (id: string) => {
    const staff = await StaffRole.findById(id);

    if (!staff) {
        throw new HttpError(404, `No staff role  found with ID:${id}`)
    }

    return staff;
}

const updateStaffRoleById = async (id: string, payload: Partial<TStaffRole>) => {
    const updatedStaffRole = await StaffRole.findByIdAndUpdate(id, payload, { new: true, runValidators: true })

    if (!updatedStaffRole) {
        throw new HttpError(404, `No staff role found with ID:${id}`)
    }

    return updatedStaffRole;
}

const deleteStaffRoleById = async (id: string) => {
    const deletedStaffRole = await StaffRole.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true })

    if (!deletedStaffRole) {
        throw new HttpError(404, `No staff role found with ID:${id}`)
    }
}

export const StaffRoleServices = {
    createStaffRole,
    getAllStaffRoles,
    getStaffRoleById,
    updateStaffRoleById,
    deleteStaffRoleById,
}