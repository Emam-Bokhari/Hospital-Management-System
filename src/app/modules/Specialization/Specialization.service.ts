import { HttpError } from "../../errors/HttpError";
import { TSpecialization } from "./specialization.interface";
import { Specialization } from "./specialization.model";

const createSpecialization = async (payload: TSpecialization) => {
    const createdSpecialization = await Specialization.create(payload)

    return createdSpecialization;
}

const getAllSpecializations = async () => {
    const specializations = await Specialization.find();
    if (!specializations) {
        throw new HttpError(404, "No specialization were found in the database")
    }
    return specializations;
}

export const SpecializationServices = {
    createSpecialization,
    getAllSpecializations,
}