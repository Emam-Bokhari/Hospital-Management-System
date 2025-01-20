import { HttpError } from "../../errors/HttpError";
import { flattenAndUpdate } from "../../utils/modelSpecific/flattenAndUpdate";
import { Doctor } from "../Doctor/doctor.model";
import { TDeathRecord } from "./deathRecord.interface";
import { DeathRecord } from "./deathRecord.model";

const createDeathRecord = async (payload: TDeathRecord) => {

    // check if doctor is exists
    const doctor = await Doctor.findOne({ _id: payload.doctor });

    if (!doctor) {
        throw new HttpError(404, "No doctor found");
    }

    const createdDeathRecord = await DeathRecord.create(payload);

    return createdDeathRecord;
}

const getAllDeathRecords = async () => {

    const deathRecords = await DeathRecord.find();

    if (deathRecords.length === 0) {
        throw new HttpError(404, "No death record were found in the database")
    }

    return deathRecords;
}

const getDeathRecordById = async (id: string) => {
    const deathRecord = await DeathRecord.findById(id);
    if (!deathRecord) {
        throw new HttpError(404, `No death record found with ID: ${id}`);
    }

    return deathRecord;
}

const updateDeathRecordById = async (id: string, payload: Partial<TDeathRecord>) => {

    const { guardian, address, ...remainingBirthRecordData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingBirthRecordData,
    }

    // utility function for update nested fields, update object fields
    if (guardian) {
        flattenAndUpdate("guardian", guardian, modifiedUpdatedData)
    }

    if (address) {
        flattenAndUpdate("address", address, modifiedUpdatedData)
    }

    const updatedDeathRecord = await DeathRecord.findOneAndUpdate({ _id: id, isDeleted: false }, modifiedUpdatedData, { new: true, runValidators: true })

    if (!updatedDeathRecord) {
        throw new HttpError(404, `No death record found with ID: ${id}`);
    }

    return updatedDeathRecord;
}

const deleteDeathRecordById = async (id: string) => {
    const deletedDeathRecord = await DeathRecord.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true });

    if (!deletedDeathRecord) {
        throw new HttpError(404, `No death record found with ID: ${id}`);
    }

    return deletedDeathRecord;
}

export const DeathRecordServices = {
    createDeathRecord,
    getAllDeathRecords,
    getDeathRecordById,
    updateDeathRecordById,
    deleteDeathRecordById,
}