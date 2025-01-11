import { Doctor } from "../Doctor/doctor.model";
import { TDepartment } from "./department.interface";

const createDepartment = async (payload: TDepartment) => {
    const createdDepartment = await Doctor.create(payload);
    return createdDepartment;
}

export const DepartmentServices = {
    createDepartment,
}