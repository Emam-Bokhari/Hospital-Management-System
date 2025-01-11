import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/sendResponse";
import { DepartmentServices } from "./department.service";

const createDepartmentController = asyncHandler(async (req, res) => {
    const departmentPayload = req.body;
    const createdDepartment = await DepartmentServices.createDepartment(departmentPayload)

    sendResponse(res, {
        success: true,
        message: "Department created successfully",
        statusCode: 201,
        data: createdDepartment,
    })
})

const getAllDepartmentsController = asyncHandler(async (req, res) => {
    const departments = await DepartmentServices.getAllDepartments();

    sendResponse(res, {
        success: true,
        message: "Departments retrieved successfully",
        statusCode: 200,
        data: departments,
    })
})

export const DepartmentControllers = {
    createDepartmentController,
    getAllDepartmentsController,
}