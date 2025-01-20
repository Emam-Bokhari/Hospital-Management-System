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

export const BirthRecordServices = {
    createBirthRecord,
}
