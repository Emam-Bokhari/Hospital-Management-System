import { asyncHandler } from '../../utils/global/asyncHandler';
import { sendResponse } from '../../utils/global/sendResponse';
import { AdmissionBookingServices } from './admissionBooking.service';

const createAdmissionBookingController = asyncHandler(async (req, res) => {
  const admissionBookingPayload = req.body;
  const createdAdmissionBooking =
    await AdmissionBookingServices.createAdmissionBooking(
      admissionBookingPayload,
    );

  sendResponse(res, {
    success: true,
    message: 'Admission booking created successfully',
    statusCode: 201,
    data: createdAdmissionBooking,
  });
});

const getAllAdmissionBookingsController = asyncHandler(async (req, res) => {
  const admissionBookings =
    await AdmissionBookingServices.getAllAdmissionBookings();

  sendResponse(res, {
    success: true,
    message: 'Admission booking retrieved successfully',
    statusCode: 200,
    data: admissionBookings,
  });
});

const getAdmissionBookingByIdController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const admissionBooking =
    await AdmissionBookingServices.getAdmissionBookingById(id);

  sendResponse(res, {
    success: true,
    message: 'Admission booking retrieved successfully',
    statusCode: 200,
    data: admissionBooking,
  });
});

const updateAdmissionBookingStatusByIdController = asyncHandler(
  async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    const updatedAdmissionBookingStatus =
      await AdmissionBookingServices.updateAdmissionBookingStatusById(
        id,
        status,
      );

    sendResponse(res, {
      success: true,
      message: 'Admission booking status updated',
      statusCode: 200,
      data: updatedAdmissionBookingStatus,
    });
  },
);

export const AdmissionBookingControllers = {
  createAdmissionBookingController,
  getAllAdmissionBookingsController,
  getAdmissionBookingByIdController,
  updateAdmissionBookingStatusByIdController,
};
