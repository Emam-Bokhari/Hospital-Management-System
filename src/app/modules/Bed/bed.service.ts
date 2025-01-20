import { TBed } from "./bed.interface";
import { Bed } from "./bed.model";

const createBed = async (payload: TBed) => {
    const createdBed = await Bed.create(payload);
    return createdBed;
};

export const BedServices = {
    createBed,
}