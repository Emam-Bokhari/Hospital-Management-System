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

const getAllDeathRecordsController = asyncHandler(async (req, res) => {
    const deathRecords = await DeathRecordServices.getAllDeathRecords();

    sendResponse(res, {
        success: true,
        message: "Death records retrieved successfully",
        statusCode: 200,
        data: deathRecords,
    })
})

const getDeathRecordController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deathRecord = await DeathRecordServices.getDeathRecordById(id);
    sendResponse(res, {
        success: true,
        message: "Death record retrieved successfully",
        statusCode: 200,
        data: deathRecord,
    })
})

const updateDeathRecordController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const updatedPayload = req.body;
    const updatedDeathRecord = await DeathRecordServices.updateDeathRecordById(id, updatedPayload);

    sendResponse(res, {
        success: true,
        message: "Death record updated successfully",
        statusCode: 200,
        data: updatedDeathRecord
    })
})

export const DeathRecordControllers = {
    createDeathRecordController,
    getAllDeathRecordsController,
    getDeathRecordController,
    updateDeathRecordController,
}