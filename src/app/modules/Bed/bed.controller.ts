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

const updateBedController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const updatedPayload = req.body;
    const updatedBed = await BedServices.updateBedById(id, updatedPayload);

    sendResponse(res, {
        success: true,
        message: "Bed updated successfully",
        statusCode: 200,
        data: updatedBed
    })
})

const updateBedAvailabilityStatusController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { availabilityStatus } = req.body;
    const updatedBedAvailabilityStatus = await BedServices.updateBedAvailabilityStatusById(id, availabilityStatus);

    sendResponse(res, {
        success: true,
        message: "Bed availability status updated successfully",
        statusCode: 200,
        data: updatedBedAvailabilityStatus,
    })
})

const deleteBedController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deletedBed = await BedServices.deleteBedById(id);

    sendResponse(res, {
        success: true,
        message: "Bed deleted successfully",
        statusCode: 200,
        data: deletedBed
    })
})

export const BedControllers = {
    createBedController,
    getAllBedsController,
    getBedController,
    updateBedController,
    updateBedAvailabilityStatusController,
    deleteBedController,
}