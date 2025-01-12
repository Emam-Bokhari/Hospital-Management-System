import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { SpecializationServices } from "./Specialization.service";

const createSpecializationController = asyncHandler(async (req, res) => {
    const specializationPayload = req.body;
    const createdSpecialization = await SpecializationServices.createSpecialization(specializationPayload);

    sendResponse(res, {
        success: true,
        message: "Specialization created successfully",
        statusCode: 201,
        data: createdSpecialization,
    })
})

export const SpecializationControllers = {
    createSpecializationController,
}