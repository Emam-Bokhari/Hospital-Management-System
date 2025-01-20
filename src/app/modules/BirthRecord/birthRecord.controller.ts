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

const getBirthRecordController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const birthRecord = await BirthRecordServices.getBirthRecordById(id);

    sendResponse(res, {
        success: true,
        message: "Birth record retrieved successfully",
        statusCode: 200,
        data: birthRecord,
    })
})

const updateBirthRecordController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const updatedPayload = req.body;
    const updatedBirthRecord = await BirthRecordServices.updateBirthRecordById(id, updatedPayload);

    sendResponse(res, {
        success: true,
        message: "Birth record updated successfully",
        statusCode: 200,
        data: updatedBirthRecord,
    })
})

const deleteBirthRecordController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deletedBirthRecord = await BirthRecordServices.deleteBirthRecordById(id);

    sendResponse(res, {
        success: true,
        message: "Birth record deleted successfully",
        statusCode: 200,
        data: deletedBirthRecord,
    })
})

export const BirthRecordControllers = {
    createBirthRecordController,
    getAllBirthRecordsController,
    getBirthRecordController,
    updateBirthRecordController,
    deleteBirthRecordController,
}