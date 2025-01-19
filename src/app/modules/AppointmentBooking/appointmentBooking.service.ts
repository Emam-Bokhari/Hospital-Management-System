/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpError } from '../../errors/HttpError';
import { Doctor } from '../Doctor/doctor.model';
import { TAppointmentBooking } from './appointmentBooking.interface';
import { AppointmentBooking } from './appointmentBooking.model';
import {
  convertDateToDay,
  convertTimeToMinutes,
  generateAppointmentBookingId,
} from './appointmentBooking.utils';

const createAppointmentBooking = async (payload: TAppointmentBooking) => {
  // check if doctor is exist
  const doctor = await Doctor.findOne({ _id: payload.doctor });

  if (!doctor) {
    throw new HttpError(404, 'Doctor not found');
  }

  // check if appointment is within working hours
  const isWithinWorkingHours = (
    startTime: string,
    endTime: string,
    timeSlot: string,
  ): boolean => {
    const startMinutes = convertTimeToMinutes(startTime);
    const endMinutes = convertTimeToMinutes(endTime);
    const slotMinutes = convertTimeToMinutes(timeSlot);
    return slotMinutes >= startMinutes && slotMinutes <= endMinutes;
  };

  // validate doctor working hours and the selected time slot
  const validateDoctorAvailability = (
    doctor: any,
    appointmentDay: string,
    timeSlot: string,
  ) => {
    // Check if doctor is available on the selected day
    if (!doctor.workingDays.includes(appointmentDay)) {
      throw new HttpError(
        400,
        `Doctor is not available on ${appointmentDay}. Available days are: ${doctor.workingDays}`,
      );
    }

    // Ensure doctor has working hours
    if (!doctor.workingHours || doctor.workingHours.length === 0) {
      throw new HttpError(400, 'Doctor does not have working hours');
    }

    // Loop through all working hours and check for any matching time slot
    let isAvailable = false;
    for (const workingHour of doctor.workingHours) {
      const { startTime, endTime } = workingHour;

      // Check if the selected time slot is within the working hours
      if (isWithinWorkingHours(startTime, endTime, timeSlot)) {
        isAvailable = true;
        break;
      }
    }

    if (!isAvailable) {
      throw new HttpError(
        400,
        `Time slot ${timeSlot} is not within any of the doctor working hours`,
      );
    }
  };

  // get the appointment day
  const appointmentDay = convertDateToDay(payload.appointmentDate);

  // validate doctor availability for the appointment day and time slot
  validateDoctorAvailability(doctor, appointmentDay, payload.timeSlot);

  // check if existing appointment are the same time
  const existingAppointment = await AppointmentBooking.findOne({
    doctor: doctor._id,
    appointmentDate: payload.appointmentDate,
    timeSlot: payload.timeSlot,
  });

  if (existingAppointment) {
    throw new HttpError(400, 'This time slot is already booked for the doctor');
  }

  // TODO: check if payment is exist

  // generate and add  appointment booking ID
  const appointmentBookingId = await generateAppointmentBookingId();

  payload.id = appointmentBookingId;

  const createdAppointmentBooking = await AppointmentBooking.create(payload);

  return createdAppointmentBooking;
};

const getAllAppointmentBookings = async () => {
  const appointmentBookings = await AppointmentBooking.find()
    .populate({ path: "userId" })
    .populate({ path: "doctor", select: "firstName lastName", populate: ({ path: "specialization", select: "name" }) });

  if (appointmentBookings.length === 0) {
    throw new HttpError(
      404,
      'No appointment bookings were found in the database',
    );
  }

  return appointmentBookings;
};

const getAppointmentBookingById = async (id: string) => {
  const appointmentBooking = await AppointmentBooking.findById(id).populate({ path: "userId" })
    .populate({ path: "doctor", select: "firstName lastName", populate: ({ path: "specialization", select: "name" }) });;

  if (!appointmentBooking) {
    throw new HttpError(404, `No appointment booking found with ID: ${id}`);
  }

  return appointmentBooking;
};

const updateAppointmentBookingStatusById = async (
  id: string,
  status: string,
) => {
  // validating the status
  const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];

  if (!validStatuses.includes(status)) {
    throw new HttpError(400, `Invalid status: ${status}`);
  }

  // check if appointment booking is exist
  const appointmentBooking =
    await AppointmentBooking.findById(id).select('_id doctor');

  if (!appointmentBooking) {
    throw new HttpError(404, `Appointment booking with ID: ${id} not found`);
  }

  // check if the doctor is authenticate
  // if (appointmentBooking.doctor.toString() !== userId) {
  //     throw new HttpError(403, "You are not authorized to update this appointment")
  // };

  // if the status is confirmed
  // if (status === "confirmed") {
  //     if (!appointmentBooking.payment) {
  //         throw new HttpError(400, "Payment ID is missing for this appointment")
  //     }

  //     // check the payment status
  //     const payment = await Payment.findById(appointmentBooking.payment);

  //     if (!payment) {
  //         throw new HttpError(404, "Payment not found")
  //     };

  //     if (payment.status !== "confirmed") {
  //         throw new HttpError(400, "Payment has not been confirmed.")
  //     }
  // }

  const updatedAppointmentBookingStatus =
    await AppointmentBooking.findByIdAndUpdate(id, { status }, { new: true });

  return updatedAppointmentBookingStatus;
};

export const AppointmentBookingServices = {
  createAppointmentBooking,
  getAllAppointmentBookings,
  getAppointmentBookingById,
  updateAppointmentBookingStatusById,
};
