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

const getAllDoctorsController = asyncHandler(async (req, res) => {
    const doctors = await DoctorServices.getAllDoctors()

    sendResponse(res, {
        success: true,
        message: "Doctors retrieved successfully",
        statusCode: 200,
        data: doctors,
    })
})

export const DoctorControllers = {
    createDoctorController,
    getAllDoctorsController,
}