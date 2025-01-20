import express from "express";
import { BirthRecordControllers } from "./birthRecord.controller";

const router = express.Router();

router.post("/", BirthRecordControllers.createBirthRecordController);

router.get("/", BirthRecordControllers.getAllBirthRecordsController);

router.get("/:id", BirthRecordControllers.getBirthRecordController);

router.patch("/:id", BirthRecordControllers.updateBirthRecordController);

router.delete("/:id", BirthRecordControllers.deleteBirthRecordController);

export const BirthRecordRoutes = router;