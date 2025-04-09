import { ZodError } from 'zod';
import { TError, TGenericErrorResponse } from '../interface/error';

export const handleZodValidationError = (
  err: ZodError,
): TGenericErrorResponse => {
  const error: TError = err.issues.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation error',
    error,
  };
};
