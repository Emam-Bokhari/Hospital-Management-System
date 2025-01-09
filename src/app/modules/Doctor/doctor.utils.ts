import { HttpError } from "../../errors/HttpError"

export const validateDateRange = (startDate: Date, endDate: Date, errorMessage: string) => {
    if (startDate && endDate && startDate > endDate) {
        throw new HttpError(400, errorMessage)
    }
}

export const validateTimeRange = (startTime: string, endTime: string, errorMessage: string) => {
    const start = new Date(`1970-01-01T${startTime}:00`);

    const end = new Date(`1970-01-01T${endTime}:00`);

    if (start >= end) {
        throw new HttpError(400, errorMessage)
    }
}

export const validateOffDays = (workingDays: string[], offDays: string[], errorMessage: string) => {
    const overlappingDays = workingDays.filter((day) =>
        offDays.includes(day)
    )

    if (overlappingDays.length > 0) {
        throw new HttpError(400, errorMessage)
    }
}