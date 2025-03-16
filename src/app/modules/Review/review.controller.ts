import { asyncHandler } from "../../utils/global/asyncHandler";
import { sendResponse } from "../../utils/global/sendResponse";
import { ReviewServices } from "./review.service";

const createReviewController = asyncHandler(async (req, res) => {
    const reviewPayload = req.body;
    const createdReview = await ReviewServices.createReview(reviewPayload);

    sendResponse(res, {
        success: true,
        message: 'Review created successfully',
        statusCode: 201,
        data: createdReview,
    });
});

export const getAllReviewsController = asyncHandler(async (req, res) => {
    const reviews = await ReviewServices.getAllReviews();
    sendResponse(res, {
        success: true,
        message: 'Review retrieved successfully',
        statusCode: 200,
        data: reviews,
    });
});

export const ReviewControllers = {
    createReviewController,
    getAllReviewsController,
}