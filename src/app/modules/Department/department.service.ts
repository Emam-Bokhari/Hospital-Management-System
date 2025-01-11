import { HttpError } from "../../errors/HttpError";
import { updateArrayField } from "../../utils/updateArrayField";
import { TDepartment } from "./department.interface";
import { Department } from "./department.model";

const createDepartment = async (payload: TDepartment) => {
    const createdDepartment = await Department.create(payload);
    return createdDepartment;
}

const getAllDepartments = async () => {
    const departments = await Department.find();

    if (departments.length === 0) {
        throw new HttpError(404, "No department were found in the database")
    }
}

const getDepartmentById = async (id: string) => {
    const department = await Department.findById(id);
    if (!department) {
        throw new HttpError(404, "No department found")
    }
    return department;
}

const updateDepartmentById = async (id: string, payload: Partial<TDepartment>) => {

    const department = await Department.findById(id);
    if (!department) {
        throw new HttpError(404, `No department found with ID: ${id}`)
    }

    const {
        symptomsAddressed,
        possibleCauses,
        associatedDoctors,
        ...remainingDepartmentData
    } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingDepartmentData,
    }

    // Utility function to flatten nested fields, update array of object fields
    if (symptomsAddressed && symptomsAddressed.length > 0) {
        updateArrayField("symptomsAddressed", symptomsAddressed, modifiedUpdatedData)
    }

    if (possibleCauses && possibleCauses.length > 0) {
        updateArrayField("possibleCauses", possibleCauses, modifiedUpdatedData)
    }

    // Utility function to flatten nested fields, update array fields
    if (associatedDoctors) {
        const currentAssociatedDoctors = department?.associatedDoctors || [];
        modifiedUpdatedData.associatedDoctors = [...new Set([...currentAssociatedDoctors, ...associatedDoctors])]
    }

    const updateDepartment = await Department.findByIdAndUpdate(id, modifiedUpdatedData, { new: true, runValidators: true })


    return updateDepartment;

}

export const DepartmentServices = {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartmentById,
}