import express from "express";
import { ReviewControllers } from "./review.controller";

const router = express.Router();

router.post("/", ReviewControllers.createReviewController);

router.get("/", ReviewControllers.getAllReviewsController);

router.get("/:doctorId", ReviewControllers.getReviewsByDoctorIdController);

router.get("/:id", ReviewControllers.getReviewByIdController);

router.delete("/:id", ReviewControllers.deleteReviewByIdController);

export const ReviewRoutes = router;