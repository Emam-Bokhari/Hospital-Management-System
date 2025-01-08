import express from "express";
import { DoctorControllers } from "./doctor.controller";

const router = express.Router();

router.post("/", DoctorControllers.createDoctorController);

router.get("/", DoctorControllers.getAllDoctorsController);

router.get("/:id", DoctorControllers.getDoctorController);

router.patch("/:id", DoctorControllers.updateDoctorController);

export const DoctorRoutes = router;