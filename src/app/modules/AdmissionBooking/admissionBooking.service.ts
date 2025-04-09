/* eslint-disable @typescript-eslint/no-explicit-any */
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

  // admission date
  payload.admissionDate = new Date();

  // number of day stayed
  let numberOfDayStayed = 1;
  const admissionTime = payload.admissionDate.getTime();
  const dischargeTime = new Date(payload.dischargeDate).getTime();
  numberOfDayStayed = Math.ceil(
    (dischargeTime - admissionTime) / (1000 * 60 * 60 * 24),
  );
  numberOfDayStayed = Math.max(1, numberOfDayStayed);

  const totalCost = bed.price * numberOfDayStayed;

  payload.totalCost = totalCost;

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

  const updatedFields: any = { status };

  if (status === 'discharged') {
    const dischargeDate = new Date();

    // admission details and populate the bed field
    const admissionBooking = await AdmissionBooking.findById(id)
      .populate('bed')
      .lean();

    if (!admissionBooking) {
      throw new HttpError(404, `Admission booking with ID: ${id} not found`);
    }

    const admissionDate = new Date(admissionBooking.admissionDate);
    if (isNaN(admissionDate.getTime())) {
      throw new HttpError(400, 'Invalid admission date');
    }

    const stayedDays = Math.ceil(
      (dischargeDate.getTime() - admissionDate.getTime()) / (1000 * 3600 * 24),
    );

    const bed = admissionBooking.bed as any;

    if (!bed || !bed.price) {
      throw new HttpError(400, 'Price not available for the assigned bed');
    }

    // calculate the total cost based on stayedDays and bed price
    const totalCost = stayedDays * bed.price;

    updatedFields.dischargeDate = dischargeDate;
    updatedFields.totalCost = totalCost;
  }

  const updatedAdmissionBookingStatus = await AdmissionBooking.findOneAndUpdate(
    { _id: id },
    updatedFields,
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
