import { HttpError } from '../../errors/HttpError';
import { TSpecialization } from './specialization.interface';
import { Specialization } from './specialization.model';

const createSpecialization = async (payload: TSpecialization) => {
  // check if specialization name is already exists
  const existingSpecialization = await Specialization.findOne({
    name: { $regex: new RegExp(`^${payload.name.trim()},"i`) },
  })
    .select('name')
    .lean();

  if (existingSpecialization) {
    throw new HttpError(
      400,
      `Specialization with the name '${payload.name}' already exists. Please choose a different name.`,
    );
  }

  const createdSpecialization = await Specialization.create(payload);

  return createdSpecialization;
};

const getAllSpecializations = async () => {
  const specializations = await Specialization.find().populate({
    path: 'createdBy',
    select: 'firstName lastName email role',
  });

  if (specializations.length === 0) {
    throw new HttpError(404, 'No specialization were found in the database');
  }
  return specializations;
};

const getSpecializationById = async (id: string) => {
  const specialization = await Specialization.findById(id).populate({
    path: 'createdBy',
    select: 'firstName lastName email role',
  });

  if (!specialization) {
    throw new HttpError(404, `No specialization found with ID: ${id}`);
  }
  return specialization;
};

const updateSpecializationById = async (
  id: string,
  payload: TSpecialization,
) => {
  const existingSpecialization = await Specialization.findOne({
    _id: id,
    name: payload.name,
  });

  if (existingSpecialization) {
    throw new HttpError(
      400,
      `Specialization with the name '${payload.name}' already exists. Please choose a different name.`,
    );
  }

  const updatedSpecialization = await Specialization.findOneAndUpdate(
    { _id: id, isDeleted: false },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedSpecialization) {
    throw new HttpError(404, `No specialization found with ID: ${id}`);
  }

  return updatedSpecialization;
};

const deleteSpecializationById = async (id: string) => {
  const deletedSpecialization = await Specialization.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true },
  );

  if (!deletedSpecialization) {
    throw new HttpError(404, `No specialization found with ID: ${id}`);
  }

  return deletedSpecialization;
};

export const SpecializationServices = {
  createSpecialization,
  getAllSpecializations,
  getSpecializationById,
  updateSpecializationById,
  deleteSpecializationById,
};
