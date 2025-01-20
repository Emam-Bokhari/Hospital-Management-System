import { HttpError } from "../../errors/HttpError";
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

export const DeathRecordServices = {
    createDeathRecord,
}