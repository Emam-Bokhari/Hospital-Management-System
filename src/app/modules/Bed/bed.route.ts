import express from "express";
import { BedControllers } from "./bed.controller";

const router = express.Router();

router.post("/", BedControllers.createBedController);

router.get("/", BedControllers.getAllBedsController);

router.get("/:id", BedControllers.getBedController);

router.patch("/:id", BedControllers.updateBedController);

router.delete("/:id", BedControllers.deleteBedController);

export const BedRoutes = router;