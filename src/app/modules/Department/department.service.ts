import { HttpError } from "../../errors/HttpError";
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

export const DepartmentServices = {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
}