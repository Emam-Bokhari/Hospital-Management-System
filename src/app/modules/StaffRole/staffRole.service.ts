import { HttpError } from '../../errors/HttpError';
import { TStaffRole } from './staffRole.interface';
import { StaffRole } from './staffRole.model';

const createStaffRole = async (payload: TStaffRole) => {
  // check if staff role name is already exists
  const existingStaffRole = await StaffRole.findOne({
    name: { $regex: new RegExp(`^${payload.name.trim()}$`, 'i') },
  });

  if (existingStaffRole) {
    throw new HttpError(
      400,
      'The staff role is already exist, Please choose different staff role name',
    );
  }

  const createdStaffRole = await StaffRole.create(payload);

  return createdStaffRole;
};

const getAllStaffRoles = async () => {
  const staffRoles = await StaffRole.find().populate({
    path: 'createdBy',
    select: 'firstName lastName email role',
  });

  if (staffRoles.length === 0) {
    throw new HttpError(404, 'No staff roles were found in the database');
  }

  return staffRoles;
};

const getStaffRoleById = async (id: string) => {
  const staff = await StaffRole.findById(id).populate({
    path: 'createdBy',
    select: 'firstName lastName email role',
  });

  if (!staff) {
    throw new HttpError(404, `No staff role  found with ID:${id}`);
  }

  return staff;
};

const updateStaffRoleById = async (
  id: string,
  payload: Partial<TStaffRole>,
) => {
  const updatedStaffRole = await StaffRole.findOneAndUpdate(
    { _id: id, isDeleted: false },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedStaffRole) {
    throw new HttpError(404, `No staff role found with ID:${id}`);
  }

  return updatedStaffRole;
};

const deleteStaffRoleById = async (id: string) => {
  const deletedStaffRole = await StaffRole.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true },
  );

  if (!deletedStaffRole) {
    throw new HttpError(404, `No staff role found with ID:${id}`);
  }
};

export const StaffRoleServices = {
  createStaffRole,
  getAllStaffRoles,
  getStaffRoleById,
  updateStaffRoleById,
  deleteStaffRoleById,
};
