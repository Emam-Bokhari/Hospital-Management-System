import { HttpError } from '../../errors/HttpError';

export const validateTimeRange = (
  startTime: string,
  endTime: string,
  errorMessage: string,
) => {
  const start = new Date(`1970-01-01T${startTime}:00`);

  const end = new Date(`1970-01-01T${endTime}:00`);

  if (start >= end) {
    throw new HttpError(400, errorMessage);
  }
};
