import { HttpError } from "../../errors/HttpError";
import { flattenAndUpdate } from "../../utils/flattenAndUpdate";
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

const getStaffById = async (id: string) => {
    const staff = await Staff.findById(id);
    if (!staff) {
        throw new HttpError(404, `No staff  found with ID:${id}`)
    }
    return staff;
}

const updateStaffById = async (id: string, payload: Partial<TStaff>) => {
    const { contactInformation, emergencyContact, birthCertificate, workSchedule, payrollInformation, educationDetails, experience, ...remainingStaffData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingStaffData,
    };

    // Utility function to flatten nested fields,  update object fields
    if (contactInformation) {
        flattenAndUpdate("contactInformation", contactInformation, modifiedUpdatedData);
    }

    if (emergencyContact) {
        flattenAndUpdate("emergencyContact", emergencyContact, modifiedUpdatedData)
    };

    if (birthCertificate) {
        flattenAndUpdate("birthCertificate", birthCertificate, modifiedUpdatedData)
    }

    if (workSchedule) {
        flattenAndUpdate("workSchedule", workSchedule, modifiedUpdatedData)
    }

    if (payrollInformation) {
        flattenAndUpdate("payrollInformation", payrollInformation, modifiedUpdatedData)
    }

    if (educationDetails) {
        flattenAndUpdate("educationDetails", educationDetails, modifiedUpdatedData)
    }

    if (experience) {
        flattenAndUpdate("experience", experience, modifiedUpdatedData)
    }

    const updatedStaff = await Staff.findByIdAndUpdate(id, modifiedUpdatedData, { new: true, runValidators: true });

    return updatedStaff;
}

const deleteStaffById = async (id: string) => {
    const deletedStaff = await Staff.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });

    if (!deletedStaff) {
        throw new HttpError(404, `No staff found with ID: ${id}`)
    }
}

export const StaffServices = {
    createStaff,
    getAllStaffs,
    getStaffById,
    updateStaffById,
    deleteStaffById,
}