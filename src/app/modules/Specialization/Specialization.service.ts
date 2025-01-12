import { TSpecialization } from "./specialization.interface";
import { Specialization } from "./specialization.model";

const createSpecialization = async (payload: TSpecialization) => {
    const createdSpecialization = await Specialization.create(payload)

    return createdSpecialization;
}

export const SpecializationServices = {
    createSpecialization,
}