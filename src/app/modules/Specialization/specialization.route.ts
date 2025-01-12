import express from "express";
import { SpecializationControllers } from "./specialization.controller";

const router = express.Router();

router.post("/", SpecializationControllers.createSpecializationController);

router.get("/", SpecializationControllers.getAllSpecializationsController);

router.get("/:id", SpecializationControllers.getSpecializationController);

router.patch("/:id", SpecializationControllers.updateSpecializationController);

router.delete("/:id", SpecializationControllers.deleteSpecializationController)

export const SpecializationRoutes = router;