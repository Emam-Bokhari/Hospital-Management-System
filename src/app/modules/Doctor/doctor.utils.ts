import { HttpError } from "../../errors/HttpError"

export const validateDateRange = (startDate: Date, endDate: Date, errorMessage: string) => {
    if (startDate && endDate && startDate > endDate) {
        throw new HttpError(400, errorMessage)
    }
}