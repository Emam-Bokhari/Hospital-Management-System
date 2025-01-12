import express from "express";
import { SpecializationControllers } from "./specialization.controller";
import { validateRequestSchema } from "../../middlewares/validateRequestSchema";
import { SpecializationValidationSchema } from "./specialization.validation";

const router = express.Router();

router.post("/", validateRequestSchema(SpecializationValidationSchema), SpecializationControllers.createSpecializationController);

router.get("/", SpecializationControllers.getAllSpecializationsController);

router.get("/:id", SpecializationControllers.getSpecializationController);

router.patch("/:id", validateRequestSchema(SpecializationValidationSchema), SpecializationControllers.updateSpecializationController);

router.delete("/:id", SpecializationControllers.deleteSpecializationController)

export const SpecializationRoutes = router;