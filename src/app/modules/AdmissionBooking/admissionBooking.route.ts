import express from "express";
import { AdmissionBookingControllers } from "./admissionBooking.controller";

const router = express.Router();

router.post("/", AdmissionBookingControllers.createAdmissionBookingController);

router.get("/", AdmissionBookingControllers.getAllAdmissionBookingsController);

router.get("/:id", AdmissionBookingControllers.getAdmissionBookingByIdController);

router.patch("/:id/status", AdmissionBookingControllers.updateAdmissionBookingStatusByIdController)

export const AdmissionBookingRoutes = router;