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

export const BirthRecordControllers = {
    createBirthRecordController,
}