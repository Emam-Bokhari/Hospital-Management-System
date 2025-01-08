import { TDoctor } from "./doctor.interface";
import { Doctor } from "./doctor.model";

const createDoctor = async (payload: TDoctor) => {
    const createdDoctor = await Doctor.create(payload);

    return createdDoctor;
}

export const DoctorServices = {
    createDoctor,
}