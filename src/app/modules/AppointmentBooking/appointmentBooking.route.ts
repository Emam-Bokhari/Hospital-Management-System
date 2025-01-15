import express from "express";
import { AppointmentBookingControllers } from "./appointmentBooking.controller";

const router = express.Router();

router.post("/", AppointmentBookingControllers.createAppointmentBookingController);

router.get("/", AppointmentBookingControllers.getAllAppointmentBookingsController);

router.get("/:id", AppointmentBookingControllers.getAppointmentBookingController);

router.patch("/:id/status", AppointmentBookingControllers.updateAppointmentBookingStatusController)

export const AppointmentBookingRoutes = router;