/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpError } from '../errors/HttpError';

export const generateDynamicId = async (model: any, prefix: string) => {
  try {
    const lastRecord = await model
      .findOne({}, { id: 1, _id: 0 })
      .sort({ createdAt: -1 })
      .lean();

    // XXX-YYYYMMDD-XXXX
    // extract the date part (YYYYMMDD) and unique number from the last id
    const lastDatePart = lastRecord?.id?.slice(4, 12);
    const lastUniquePart = lastRecord?.id?.slice(13);

    // get current date in YYYYMMDD format
    const today = new Date();
    const dateFormatted = today.toISOString()?.split('T')[0].replace(/-/g, '');

    if (lastDatePart === dateFormatted) {
      const nextUniquePart = (parseInt(lastUniquePart, 10) + 1)
        .toString()
        .padStart(4, '0');
      return `${prefix}-${dateFormatted}-${nextUniquePart}`;
    }
    return `${prefix}-${dateFormatted}-0001`;
  } catch (err: any) {
    throw new HttpError(400, err.message);
  }
};
