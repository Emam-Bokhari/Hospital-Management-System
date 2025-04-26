"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.post("/", review_controller_1.ReviewControllers.createReviewController);
router.get("/", review_controller_1.ReviewControllers.getAllReviewsController);
router.get("/doctor/:doctorId", review_controller_1.ReviewControllers.getReviewsByDoctorIdController);
router.get("/:id", review_controller_1.ReviewControllers.getReviewByIdController);
router.delete("/:id", review_controller_1.ReviewControllers.deleteReviewByIdController);
exports.ReviewRoutes = router;
