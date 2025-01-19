import { HttpError } from '../../errors/HttpError';
import { flattenAndUpdate } from '../../utils/modelSpecific/flattenAndUpdate';
import { StaffRole } from '../StaffRole/staffRole.model';
import { TStaff } from './staff.interface';
import { Staff } from './staff.model';

const createStaff = async (payload: TStaff) => {
  // check if staff role is exists
  const staffRole = await StaffRole.findOne({ _id: payload.staffRole })
    .select('_id')
    .lean();

  if (!staffRole) {
    throw new HttpError(404, 'No Staff role found the provided ID');
  }

  const createdStaff = await Staff.create(payload);
  return createdStaff;
};

const getAllStaffs = async () => {
  const staffs = await Staff.find()
    .populate([
      {
        path: 'staffRole', select: "name",
        populate: { path: "createdBy", select: "firstName lastName email" }
      }
    ])
    .populate({ path: 'createdBy', select: "firstName lastName email" });

  if (staffs.length === 0) {
    throw new HttpError(404, 'No staffs were found in the database');
  }

  return staffs;
};

const getStaffById = async (id: string) => {

  const staff = await Staff.findById(id)
    .populate([
      {
        path: 'staffRole', select: "name",
        populate: { path: "createdBy", select: "firstName lastName email" }
      }
    ])
    .populate({ path: 'createdBy', select: "firstName lastName email" });

  if (!staff) {
    throw new HttpError(404, `No staff  found with ID:${id}`);
  }

  return staff;
};

const updateStaffById = async (id: string, payload: Partial<TStaff>) => {
  const {
    contactInformation,
    emergencyContact,
    birthCertificate,
    workSchedule,
    payrollInformation,
    educationDetails,
    experience,
    ...remainingStaffData
  } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStaffData,
  };

  // Utility function to flatten nested fields,  update object fields
  if (contactInformation) {
    flattenAndUpdate(
      'contactInformation',
      contactInformation,
      modifiedUpdatedData,
    );
  }

  if (emergencyContact) {
    flattenAndUpdate('emergencyContact', emergencyContact, modifiedUpdatedData);
  }

  if (birthCertificate) {
    flattenAndUpdate('birthCertificate', birthCertificate, modifiedUpdatedData);
  }

  if (workSchedule) {
    flattenAndUpdate('workSchedule', workSchedule, modifiedUpdatedData);
  }

  if (payrollInformation) {
    flattenAndUpdate(
      'payrollInformation',
      payrollInformation,
      modifiedUpdatedData,
    );
  }

  if (educationDetails) {
    flattenAndUpdate('educationDetails', educationDetails, modifiedUpdatedData);
  }

  if (experience) {
    flattenAndUpdate('experience', experience, modifiedUpdatedData);
  }

  const updatedStaff = await Staff.findOneAndUpdate(
    { _id: id, isDeleted: false },
    modifiedUpdatedData,
    { new: true, runValidators: true },
  );

  if (!updatedStaff) {
    throw new HttpError(404, `No staff found with ID: ${id}`);
  }

  return updatedStaff;
};

const deleteStaffById = async (id: string) => {
  const deletedStaff = await Staff.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true },
  );

  if (!deletedStaff) {
    throw new HttpError(404, `No staff found with ID: ${id}`);
  }

  return deletedStaff;
};

export const StaffServices = {
  createStaff,
  getAllStaffs,
  getStaffById,
  updateStaffById,
  deleteStaffById,
};
