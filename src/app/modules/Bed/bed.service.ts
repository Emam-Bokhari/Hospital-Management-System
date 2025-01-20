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

const getBedById = async (id: string) => {
    const bed = await Bed.findById(id);

    if (!bed) {
        throw new HttpError(404, `No bed found with ID: ${id}`)
    };

    return bed;
}

const updateBedById = async (id: string, payload: Partial<TBed>) => {

    const { facilities, ...remainingBedData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingBedData,
    }

    //  update array fields
    if (facilities) {
        modifiedUpdatedData.facilities = { $each: facilities };
    }

    const updatedBed = await Bed.updateOne({ _id: id, isDeleted: false }, { $set: modifiedUpdatedData }, { new: true, runValidators: true })

    if (!updatedBed) {
        throw new HttpError(404, `No bed found with ID: ${id}`)
    };

    return updatedBed;


}

const deleteBedById = async (id: string) => {
    const deletedBed = await Bed.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true })
    if (!deletedBed) {
        throw new HttpError(404, `No bed found with ID: ${id}`)
    }
    return deletedBed;
}

export const BedServices = {
    createBed,
    getAllBeds,
    getBedById,
    updateBedById,
    deleteBedById,
}