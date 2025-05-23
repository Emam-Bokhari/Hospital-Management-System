import { asyncHandler } from '../../utils/global/asyncHandler';
import { sendResponse } from '../../utils/global/sendResponse';
import { DepartmentServices } from './department.service';

const createDepartmentController = asyncHandler(async (req, res) => {
  const departmentPayload = req.body;
  const createdDepartment =
    await DepartmentServices.createDepartment(departmentPayload);

  sendResponse(res, {
    success: true,
    message: 'Department created successfully',
    statusCode: 201,
    data: createdDepartment,
  });
});

const getAllDepartmentsController = asyncHandler(async (req, res) => {
  const departments = await DepartmentServices.getAllDepartments();

  sendResponse(res, {
    success: true,
    message: 'Departments retrieved successfully',
    statusCode: 200,
    data: departments,
  });
});

const getDepartmentController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const department = await DepartmentServices.getDepartmentById(id);

  sendResponse(res, {
    success: true,
    message: 'Department retrieved successfully',
    statusCode: 200,
    data: department,
  });
});

const deleteDepartmentController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await DepartmentServices.deleteDepartmentById(id);

  sendResponse(res, {
    success: true,
    message: 'Delete department successfully',
    statusCode: 200,
    data: {},
  });
});

export const DepartmentControllers = {
  createDepartmentController,
  getAllDepartmentsController,
  getDepartmentController,
  deleteDepartmentController,
};
