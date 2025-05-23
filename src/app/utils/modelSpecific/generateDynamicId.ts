/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment-timezone';
import { HttpError } from '../../errors/HttpError';

export const generateDynamicId = async (
  model: any,
  prefix: string,
  fieldName: string = 'id',
) => {
  try {
    const lastRecord = await model
      .findOne({})
      .select(fieldName)
      .sort({ createdAt: -1 })
      .lean();

    // XXX-YYYYMMDD-XXXX
    // extract the date part (YYYYMMDD) and unique number from the last id
    const lastDatePart = lastRecord?.[fieldName]?.slice(4, 12);
    const lastUniquePart = lastRecord?.[fieldName]?.slice(13);

    // get current date in YYYYMMDD format
    const today = moment.tz('Asia/Dhaka');
    const dateFormatted = today.format('YYYYMMDD');

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
