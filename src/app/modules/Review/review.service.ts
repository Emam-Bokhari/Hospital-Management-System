import { HttpError } from "../../errors/HttpError";
import { filterBadWords } from "../../utils/modelSpecific/textFilter";
import { TReview } from "./review.interface";
import { Review } from "./review.model";

const createReview = async (payload: TReview) => {

    if (filterBadWords(payload.reviewText)) {
        throw new HttpError(400, "Your review contains inappropriate language. Please remove it.");
    }

    const createdReview = await Review.create(payload);

    return createdReview;
};

export const getAllReviews = async () => {
    const reviews = await Review.find()

    if (reviews.length === 0) {
        throw new HttpError(404, 'No review were found in the database');
    }

    return reviews;
};

export const ReviewServices = {
    createReview,
    getAllReviews,
}