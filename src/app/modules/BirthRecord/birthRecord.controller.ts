import { asyncHandler } from "../../utils/global/asyncHandler";
import { sendResponse } from "../../utils/global/sendResponse";
import { BirthRecordServices } from "./birthRecord.service";

const createBirthRecordController = asyncHandler(async (req, res) => {
    const birthRecordPayload = req.body;
    const createdBirthRecord = await BirthRecordServices.createBirthRecord(birthRecordPayload);

    sendResponse(res, {
        success: true,
        message: "Birth record created successfully",
        statusCode: 201,
        data: createdBirthRecord,
    })
});

const getAllBirthRecordsController = asyncHandler(async (req, res) => {
    const birthRecords = await BirthRecordServices.getAllBirthRecords();

    sendResponse(res, {
        success: true,
        message: "Birth records retrieved successfully",
        statusCode: 200,
        data: birthRecords,
    })
})

export const BirthRecordControllers = {
    createBirthRecordController,
    getAllBirthRecordsController,
}