import { HttpError } from "../../errors/HttpError";
import { Doctor } from "../Doctor/doctor.model";
import { TDepartment } from "./department.interface";

const createDepartment = async (payload: TDepartment) => {
    const createdDepartment = await Doctor.create(payload);
    return createdDepartment;
}

const getAllDepartments = async () => {
    const departments = await Doctor.find();

    if (departments.length === 0) {
        throw new HttpError(404, "No department were found in the database")
    }
}

export const DepartmentServices = {
    createDepartment,
    getAllDepartments,
}