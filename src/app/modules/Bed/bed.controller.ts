import { asyncHandler } from "../../utils/global/asyncHandler";
import { sendResponse } from "../../utils/global/sendResponse";
import { BedServices } from "./bed.service";

const createBedController = asyncHandler(async (req, res) => {
    const bedPayload = req.body;
    const createdBed = await BedServices.createBed(bedPayload);

    sendResponse(res, {
        success: true,
        message: "Bed created successfully",
        statusCode: 201,
        data: createdBed,
    })
})

const getAllBedsController = asyncHandler(async (req, res) => {
    const beds = await BedServices.getAllBeds();

    sendResponse(res, {
        success: true,
        message: "Beds retrieved successfully",
        statusCode: 200,
        data: beds,
    })
})

const getBedController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const bed = await BedServices.getBedById(id);
    sendResponse(res, {
        success: true,
        message: "Bed retrieved successfully",
        statusCode: 200,
        data: bed,
    })
})

export const BedControllers = {
    createBedController,
    getAllBedsController,
    getBedController,
}