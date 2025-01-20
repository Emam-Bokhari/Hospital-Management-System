import { asyncHandler } from "../../utils/global/asyncHandler";
import { sendResponse } from "../../utils/global/sendResponse";
import { DeathRecordServices } from "./deathRecord.service";

const createDeathRecordController = asyncHandler(async (req, res) => {
    const deathRecordPayload = req.body;
    const createdDeathRecord = await DeathRecordServices.createDeathRecord(deathRecordPayload);

    sendResponse(res, {
        success: true,
        message: "Death record created successfully",
        statusCode: 201,
        data: createdDeathRecord,
    })
});

export const DeathRecordControllers = {
    createDeathRecordController,
}