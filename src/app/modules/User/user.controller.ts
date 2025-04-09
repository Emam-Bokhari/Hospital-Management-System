import { UserServices } from './user.service';
import { sendResponse } from '../../utils/global/sendResponse';
import { asyncHandler } from '../../utils/global/asyncHandler';

const getAllUsersController = asyncHandler(async (req, res) => {
  const users = await UserServices.getAllUsers();

  sendResponse(res, {
    success: true,
    message: 'Users retrieved successfully',
    statusCode: 200,
    data: users,
  });
});

const getUserController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await UserServices.getUserById(id);

  sendResponse(res, {
    success: true,
    message: 'User retrieved successfully',
    statusCode: 200,
    data: user,
  });
});

const updateUserController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updatedPayload = req.body;
  const updatedUser = await UserServices.updateUserById(id, updatedPayload);

  sendResponse(res, {
    success: true,
    message: 'User updated successfully',
    statusCode: 200,
    data: updatedUser,
  });
});

const deleteUserController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await UserServices.deleteUserById(id);

  sendResponse(res, {
    success: true,
    message: 'User deleted successfully',
    statusCode: 200,
    data: {},
  });
});

export const UserControllers = {
  getAllUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
};
