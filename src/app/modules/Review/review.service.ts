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

const getAllReviews = async () => {
    const reviews = await Review.find()

    if (reviews.length === 0) {
        throw new HttpError(404, 'No review were found in the database');
    }

    return reviews;
};

const getReviewsByDoctorId = async (doctorId: string) => {
    const reviews = await Review.find({ doctorId: doctorId });

    if (reviews.length === 0) {
        throw new HttpError(404, `No review were found with ID ${doctorId}`);
    }

    return reviews;
};

const getReviewById = async (id: string) => {
    const review = await Review.findById(id)

    if (!review) {
        throw new HttpError(404, `No review found with ID ${id}`);
    }

    return review;
};

const deleteReviewById = async (id: string) => {
    const deletedReview = await Review.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true },
    );
    if (!deletedReview) {
        throw new HttpError(404, `No review found with ID: ${id}`);
    }
    return deletedReview;
};

export const ReviewServices = {
    createReview,
    getAllReviews,
    getReviewById,
    getReviewsByDoctorId,
    deleteReviewById,
}