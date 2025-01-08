import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { DoctorServices } from "./doctor.service";

const createDoctorController = asyncHandler(async (req, res) => {
    const doctorPayload = req.body;
    const createdDoctor = await DoctorServices.createDoctor(doctorPayload);

    sendResponse(res, {
        success: true,
        message: "Doctor created successfully",
        statusCode: 201,
        data: createdDoctor,
    })
})

export const DoctorControllers = {
    createDoctorController,
}