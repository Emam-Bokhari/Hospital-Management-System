import { HttpError } from '../../errors/HttpError';
import { Bed } from '../Bed/bed.model';
import { TAdmissionBooking } from './admissionBooking.interface';
import { AdmissionBooking } from './admissionBooking.model';
import { generateAdmissionBookingId } from './admissionBooking.utils';

const createAdmissionBooking = async (payload: TAdmissionBooking) => {
  const bed = await Bed.findById(payload?.bed);
  // check if bed is exists
  if (!bed) {
    throw new HttpError(404, 'The specified bed could not be found.');
  }

  // check if bed is available
  if (
    bed.availabilityStatus &&
    ['occupied', 'maintenance'].includes(bed.availabilityStatus)
  ) {
    const statusMessage =
      bed.availabilityStatus === 'occupied'
        ? 'The selected bed is currently occupied.'
        : 'The selected bed is under maintenance.';
    throw new HttpError(400, statusMessage);
  }

  // generate admission booking id
  const admissionBookingId = await generateAdmissionBookingId();
  payload.id = admissionBookingId;

  const createdAdmissionBooking = await AdmissionBooking.create(payload);

  return createdAdmissionBooking;
};

const getAllAdmissionBookings = async () => {
  const admissionBookings = await AdmissionBooking.find();
  if (admissionBookings.length === 0) {
    throw new HttpError(404, 'No admission booking were found in the database');
  }
  return admissionBookings;
};

const getAdmissionBookingById = async (id: string) => {
  const admissionBooking = await AdmissionBooking.findById(id);

  if (!admissionBooking) {
    throw new HttpError(404, `No admission booking found with ID: ${id}`);
  }

  return admissionBooking;
};

const updateAdmissionBookingStatusById = async (id: string, status: string) => {
  const validStatuses = ['pending', 'admitted', 'discharged', 'cancelled'];
  if (!validStatuses.includes(status)) {
    throw new HttpError(400, `Invalid status: ${status}`);
  }

  const updatedAdmissionBookingStatus = await AdmissionBooking.findOneAndUpdate(
    { _id: id },
    { status: status },
    { new: true, runValidators: true },
  );

  if (!updatedAdmissionBookingStatus) {
    throw new HttpError(404, `Admission booking with ID: ${id} not found`);
  }

  return updatedAdmissionBookingStatus;
};

export const AdmissionBookingServices = {
  createAdmissionBooking,
  getAllAdmissionBookings,
  getAdmissionBookingById,
  updateAdmissionBookingStatusById,
};
