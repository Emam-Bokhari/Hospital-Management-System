import { HttpError } from '../../errors/HttpError';

export const validateDateRange = (
  startDate: Date,
  endDate: Date,
  errorMessage: string,
) => {
  if (startDate && endDate && startDate > endDate) {
    throw new HttpError(400, errorMessage);
  }
};

export const validateOffDays = (
  workingDays: string[],
  offDays: string[],
  errorMessage: string,
) => {
  const overlappingDays = workingDays.filter((day) => offDays.includes(day));

  if (overlappingDays.length > 0) {
    throw new HttpError(400, errorMessage);
  }
};
