import { HttpError } from '../../errors/HttpError';
import { Test } from '../Test/test.model';
import { TTestBooking } from './testBooking.interface';
import { TestBooking } from './testBooking.model';

const createTestBooking = async (payload: TTestBooking) => {
  const test = await Test.findOne({ _id: payload.test });

  if (!test) {
    throw new HttpError(404, 'The requested test does not exist.');
  }

  if (!test?.testAvailability) {
    throw new HttpError(
      400,
      'The requested test is currently unavailable. Please choose a different test or try again later.',
    );
  }

  // TODO: automatic set userId

  // TODO: auto generate id

  // TODO: payment related validation

  const createdTestBooking = await TestBooking.create(payload);

  return createdTestBooking;
};

const getAllTestBookings = async () => {
  const testBookings = await TestBooking.find()
    .populate('userId')
    .populate({ path: 'test', populate: { path: 'createdBy' } });

  if (testBookings.length === 0) {
    throw new HttpError(404, 'No test bookings were found in the database');
  }

  return testBookings;
};

const getTestBookingById = async (id: string) => {
  const testBooking = await TestBooking.findById(id)
    .populate('userId')
    .populate({ path: 'test', populate: { path: 'createdBy' } });

  if (!testBooking) {
    throw new HttpError(404, `No test booking found with ID: ${id}`);
  }

  return testBooking;
};

const updateTestBookingStatusById = async (id: string, status: string) => {
  const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];

  if (!validStatuses.includes(status)) {
    throw new HttpError(400, `Invalid status: ${status}`);
  }

  // TODO: payment related validation and set status confirmed

  const updatedTestBookingStatus = await TestBooking.findOneAndUpdate(
    { _id: id },
    { status },
    { new: true, runValidators: true },
  );

  if (!updatedTestBookingStatus) {
    throw new HttpError(404, `Test booking with ID: ${id} not found`);
  }

  return updatedTestBookingStatus;
};

export const TestBookingServices = {
  createTestBooking,
  getAllTestBookings,
  getTestBookingById,
  updateTestBookingStatusById,
};
