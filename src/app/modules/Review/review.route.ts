import express from "express";
import { ReviewControllers } from "./review.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = express.Router();

router.post("/", ReviewControllers.createReviewController);

router.get("/", ReviewControllers.getAllReviewsController);

router.get("/doctor/:doctorId", ReviewControllers.getReviewsByDoctorIdController);

router.get("/:id", ReviewControllers.getReviewByIdController);

router.delete("/:id", auth(USER_ROLE.admin, USER_ROLE.superAdmin), ReviewControllers.deleteReviewByIdController);

export const ReviewRoutes = router;