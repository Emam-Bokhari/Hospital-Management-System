/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpError } from '../errors/HttpError';
import moment from 'moment-timezone';

export const generateDynamicId = async (model: any, prefix: string) => {
  try {
    const lastRecord = await model
      .findOne({})
      .select("id")
      .sort({ createdAt: -1 })
      .lean();

    // XXX-YYYYMMDD-XXXX
    // extract the date part (YYYYMMDD) and unique number from the last id
    const lastDatePart = lastRecord?.id?.slice(4, 12);
    const lastUniquePart = lastRecord?.id?.slice(13);

    // get current date in YYYYMMDD format
    const today = moment.tz("Asia/Dhaka");
    const dateFormatted = today.format("YYYYMMDD");

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
