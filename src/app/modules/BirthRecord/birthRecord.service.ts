import { HttpError } from "../../errors/HttpError";
import { flattenAndUpdate } from "../../utils/modelSpecific/flattenAndUpdate";
import { Doctor } from "../Doctor/doctor.model";
import { TBirthRecord } from "./birthRecord.interface";
import { BirthRecord } from "./birthRecord.model";

const createBirthRecord = async (payload: TBirthRecord) => {
    const createdBirthRecord = await BirthRecord.create(payload);

    // check if doctor is exists
    const doctor = await Doctor.findOne({ _id: payload.doctor }).select("_id").lean()

    if (!doctor) {
        throw new HttpError(404, "Doctor not found")
    }

    return createdBirthRecord;
}

const getAllBirthRecords = async () => {
    const birthRecords = await BirthRecord.find().populate({ path: "createdBy", select: "firstName lastName email role" });

    if (birthRecords.length === 0) {
        throw new HttpError(404, "No birth record were found in the database'")
    }

    return birthRecords;
}

const getBirthRecordById = async (id: string) => {
    const birthRecord = await BirthRecord.findById(id).populate({ path: "createdBy", select: "firstName lastName email role" });;

    if (!birthRecord) {
        throw new HttpError(404, `No department found with ID: ${id}`)
    }

    return birthRecord;
}

const updateBirthRecordById = async (id: string, payload: Partial<TBirthRecord>) => {

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

    const updatedBirthRecord = await BirthRecord.findOneAndUpdate({ _id: id, isDeleted: false }, modifiedUpdatedData, { new: true, runValidators: true, })

    if (!updatedBirthRecord) {
        throw new HttpError(404, `No birth record found with ID: ${id}`)
    }

    return updatedBirthRecord;

}

const deleteBirthRecordById = async (id: string) => {

    const deletedBirthRecord = await BirthRecord.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true })

    if (!deletedBirthRecord) {
        throw new HttpError(404, `No birth record found with ID: ${id}`)
    }

    return deletedBirthRecord;
}

export const BirthRecordServices = {
    createBirthRecord,
    getAllBirthRecords,
    getBirthRecordById,
    updateBirthRecordById,
    deleteBirthRecordById,
}
