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

const getDoctorController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const doctor = await DoctorServices.getDoctorById(id);

    sendResponse(res, {
        success: true,
        message: "Doctor retrieved successfully",
        statusCode: 200,
        data: doctor,
    })
})

export const DoctorControllers = {
    createDoctorController,
    getAllDoctorsController,
    getDoctorController,
}