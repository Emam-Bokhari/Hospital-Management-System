import { TDoctor } from "./doctor.interface";
import { Doctor } from "./doctor.model";

const createDoctor = async (payload: TDoctor) => {
    const createdDoctor = await Doctor.create(payload);

    return createdDoctor;
}

const getAllDoctors = async () => {
    const doctors = await Doctor.find();
    return doctors;
}

export const DoctorServices = {
    createDoctor,
    getAllDoctors,
}