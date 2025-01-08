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

const getDoctorById = async (id: string) => {
    const doctor = await Doctor.findById(id)
    return doctor;
}

const updateDoctorById = async (id: string, payload: Partial<TDoctor>) => {
    const updatedDoctor = await Doctor.findOneAndUpdate({ _id: id }, payload, { new: true, runValidators: true });

    return updatedDoctor;
}



export const DoctorServices = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctorById,
}