import { HttpError } from '../../errors/HttpError';
import { Specialization } from '../Specialization/specialization.model';
import { TDepartment } from './department.interface';
import { Department } from './department.model';

const createDepartment = async (payload: TDepartment) => {
  // check if specialization is exist
  const specialization = await Specialization.findOne({
    _id: payload.specialization,
  }).select('_id');

  if (!specialization) {
    throw new HttpError(404, 'No specialization found the provided ID');
  }

  // check if department is already exist the same specialization
  const existingDepartment = await Department.findOne({
    specialization: payload.specialization,
  });

  if (existingDepartment) {
    throw new HttpError(
      400,
      'A department with the same specialization already exists.',
    );
  }

  const createdDepartment = await Department.create(payload);
  return createdDepartment;
};

const getAllDepartments = async () => {
  const departments = await Department.find()
    .populate({
      path: 'specialization',
      select: 'name',
      populate: { path: 'createdBy', select: 'firstName lastName email role' },
    })
    .populate({ path: 'createdBy', select: 'firstName lastName email role' });

  if (departments.length === 0) {
    throw new HttpError(404, 'No department were found in the database');
  }

  return departments;
};

const getDepartmentById = async (id: string) => {
  const department = await Department.findById(id)
    .populate({
      path: 'specialization',
      select: 'name',
      populate: { path: 'createdBy', select: 'firstName lastName email role' },
    })
    .populate({ path: 'createdBy', select: 'firstName lastName email role' });

  if (!department) {
    throw new HttpError(404, `No department found with ID: ${id}`);
  }

  return department;
};


const deleteDepartmentById = async (id: string) => {
  const deletedDepartment = await Department.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true },
  );

  if (!deletedDepartment) {
    throw new HttpError(404, `No department found with ID: ${id}`);
  }

  return deletedDepartment;
};

export const DepartmentServices = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  deleteDepartmentById,
};
