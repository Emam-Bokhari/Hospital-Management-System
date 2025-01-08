import { flattenAndUpdate } from "../../utils/flattenAndUpdate";
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
    const {
        contactInformation,
        emergencyContact,
        medicalPracticeInformation,
        educationDetails,
        awards,
        professionalInformation,
        ...remainingDoctorData
    } = payload;

    const modifiedUpdatedData: Record<string, unknown> = { ...remainingDoctorData };

    // Flatten and update object fields
    flattenAndUpdate("contactInformation", contactInformation, modifiedUpdatedData);
    flattenAndUpdate("emergencyContact", emergencyContact, modifiedUpdatedData);
    flattenAndUpdate("medicalPracticeInformation", medicalPracticeInformation, modifiedUpdatedData);

    if (educationDetails && educationDetails.length > 0) {
        educationDetails.forEach((education, index) => {
            flattenAndUpdate(`educationDetails.${index}`, education, modifiedUpdatedData)
        })
    }

    if (awards && awards.length > 0) {
        awards.forEach((award, index) => {
            flattenAndUpdate(`awards.${index}`, award, modifiedUpdatedData)
        })
    }

    // Perform the update operation
    const updatedDoctor = await Doctor.findOneAndUpdate(
        { _id: id },
        modifiedUpdatedData,
        { new: true }
    );

    return updatedDoctor;
};
export const DoctorServices = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctorById,
}
