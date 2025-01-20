import { HttpError } from "../../errors/HttpError";
import { TBed } from "./bed.interface";
import { Bed } from "./bed.model";

const createBed = async (payload: TBed) => {
    const createdBed = await Bed.create(payload);
    return createdBed;
};

const getAllBeds = async () => {
    const beds = await Bed.find();

    if (beds.length === 0) {
        throw new HttpError(404, "No bed were found in the database")
    }

    return beds;
}

export const BedServices = {
    createBed,
    getAllBeds,
}