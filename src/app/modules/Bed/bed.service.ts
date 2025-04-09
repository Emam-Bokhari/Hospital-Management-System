import { HttpError } from '../../errors/HttpError';
import { TBed } from './bed.interface';
import { Bed } from './bed.model';

const createBed = async (payload: TBed) => {
  const createdBed = await Bed.create(payload);
  return createdBed;
};

const getAllBeds = async () => {
  const beds = await Bed.find().populate({
    path: 'createdBy',
    select: 'firstName lastName email role',
  });

  if (beds.length === 0) {
    throw new HttpError(404, 'No bed were found in the database');
  }

  return beds;
};

const getBedById = async (id: string) => {
  const bed = await Bed.findById(id).populate({
    path: 'createdBy',
    select: 'firstName lastName email role',
  });

  if (!bed) {
    throw new HttpError(404, `No bed found with ID: ${id}`);
  }

  return bed;
};

const updateBedById = async (id: string, payload: Partial<TBed>) => {
  const bed = await Bed.findById(id);

  if (!bed) {
    throw new HttpError(404, `No bed found with ID: ${id}`);
  }

  const { action, facilities, ...remainingBedData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingBedData,
  };

  //  update array fields
  if (action && facilities) {
    if (action === 'add') {
      modifiedUpdatedData.$addToSet = { facilities: facilities };
    } else if (action === 'remove') {
      modifiedUpdatedData.$pull = { facilities: facilities };
    }
  }

  const updatedBed = await Bed.findOneAndUpdate(
    { _id: id, isDeleted: false },
    modifiedUpdatedData,
    { new: true, runValidators: true },
  );

  return updatedBed;
};

const updateBedAvailabilityStatusById = async (
  id: string,
  availabilityStatus: string,
) => {
  const validateAvailabilityStatuses = ['available', 'occupied', 'maintenance'];

  if (!validateAvailabilityStatuses.includes(availabilityStatus)) {
    throw new HttpError(400, `Invalid status: ${availabilityStatus}`);
  }

  const updatedBedAvailabilityStatus = await Bed.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { availabilityStatus },
    { new: true, runValidators: true },
  );

  if (!updatedBedAvailabilityStatus) {
    throw new HttpError(404, `No bed found with Id: ${id}`);
  }

  return updatedBedAvailabilityStatus;
};

const deleteBedById = async (id: string) => {
  const deletedBed = await Bed.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true },
  );
  if (!deletedBed) {
    throw new HttpError(404, `No bed found with ID: ${id}`);
  }
  return deletedBed;
};

export const BedServices = {
  createBed,
  getAllBeds,
  getBedById,
  updateBedById,
  updateBedAvailabilityStatusById,
  deleteBedById,
};
