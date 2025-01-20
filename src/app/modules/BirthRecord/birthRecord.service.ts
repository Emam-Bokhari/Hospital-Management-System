import { HttpError } from "../../errors/HttpError";
import { Doctor } from "../Doctor/doctor.model";
import { TBirthRecord } from "./birthRecord.interface";
import { BirthRecord } from "./birthRecord.model";

const createBirthRecord = async (payload: TBirthRecord) => {
    const createdBirthRecord = await BirthRecord.create(payload);

    // check if doctor is exists
    const doctor = await Doctor.findOne({ _id: payload.doctor })

    if (!doctor) {
        throw new HttpError(404, "Doctor not found")
    }

    return createdBirthRecord;
}

const getAllBirthRecords = async () => {
    const birthRecords = await BirthRecord.find();

    if (birthRecords.length === 0) {
        throw new HttpError(404, "No birth record were found in the database'")
    }

    return birthRecords;
}

const getBirthRecordById = async (id: string) => {
    const birthRecord = await BirthRecord.findById(id);

    if (!birthRecord) {
        throw new HttpError(404, `No department found with ID: ${id}`)
    }

    return birthRecord;
}

export const BirthRecordServices = {
    createBirthRecord,
    getAllBirthRecords,
    getBirthRecordById,
}
