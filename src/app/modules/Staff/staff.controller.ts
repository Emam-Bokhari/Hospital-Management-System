import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { StaffServices } from "./staff.service";

const createStaffController = asyncHandler(async (req, res) => {
    const staffPayload = req.body;
    const createdStaff = await StaffServices.createStaff(staffPayload);

    sendResponse(res, {
        success: true,
        message: "Staff created successfully",
        statusCode: 201,
        data: createdStaff,
    })
})

const getAllStaffsController = asyncHandler(async (req, res) => {
    const staffs = await StaffServices.getAllStaffs();

    sendResponse(res, {
        success: true,
        message: "Staffs retrieved successfully",
        statusCode: 200,
        data: staffs,
    })
})

const getStaffController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const staff = await StaffServices.getStaffById(id);

    sendResponse(res, {
        success: true,
        message: "Staff retrieved successfully",
        statusCode: 200,
        data: staff,
    })
})

const updateStaffController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const updatedPayload = req.body;
    const updatedStaff = await StaffServices.updateStaffById(id, updatedPayload);

    sendResponse(res, {
        success: true,
        message: "Staff updated successfully",
        statusCode: 200,
        data: updatedStaff,
    })
})

const deleteStaffController = asyncHandler(async (req, res) => {
    const id = req.params.id;
    await StaffServices.deleteStaffById(id);

    sendResponse(res, {
        success: true,
        message: "Staff deleted successfully",
        statusCode: 200,
        data: {}
    })
})

export const StaffControllers = {
    createStaffController,
    getAllStaffsController,
    getStaffController,
    updateStaffController,
    deleteStaffController,
}